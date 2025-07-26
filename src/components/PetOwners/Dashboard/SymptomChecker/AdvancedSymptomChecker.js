// === OVERVIEW ===
// This includes:
// - Multi-body-part symptom selection
// - GPT-based recommendations via backend API
// - Symptom history saving and fetching
// - Export options (via PDF)
// - Uses RTK Query for backend communication

// --- COMPONENT: AdvancedSymptomChecker.jsx ---

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useLazyGetGptRecommendationQuery, useSaveSymptomReportMutation, useGetSymptomHistoryQuery } from '@/redux/services/symptomApi';
import { petSymptomDatabase } from './pet-symptom-database';
import html2pdf from 'html2pdf.js';

// Fallback components since user doesn't have shared Common UI
const Button = ({ children, className = '', ...props }) => (
  <button className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition ${className}`} {...props}>{children}</button>
);

const Card = ({ children, className = '' }) => (
  <div className={`border border-gray-200 rounded shadow bg-white ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => (
  <div className="border-b p-4 font-semibold text-gray-800">{children}</div>
);

const CardTitle = ({ children }) => <h3 className="text-lg font-medium">{children}</h3>;

const CardContent = ({ children }) => <div className="p-4">{children}</div>;

const Badge = ({ children }) => <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-800">{children}</span>;

const Checkbox = ({ checked, onCheckedChange }) => (
  <input type="checkbox" checked={checked} onChange={() => onCheckedChange(!checked)} className="h-4 w-4 text-blue-600" />
);

const Skeleton = ({ className = '' }) => <div className={`bg-gray-200 animate-pulse rounded ${className}`} />;

const Tooltip = ({ children, content }) => <div title={content}>{children}</div>;

export default function AdvancedSymptomChecker({ selectedPet }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]); // [{ bodyPart, symptoms: [] }]
  const [matchedConditions, setMatchedConditions] = useState([]);
  const [gptResponse, setGptResponse] = useState('');
  const [showResults, setShowResults] = useState(false);

  const [triggerGpt] = useLazyGetGptRecommendationQuery();
  const [saveReport] = useSaveSymptomReportMutation();
  const { data: history = [] } = useGetSymptomHistoryQuery(selectedPet?._id);

  const toggleSymptom = (bodyPart, symptomId) => {
    setSelectedSymptoms((prev) => {
      const updated = [...prev];
      const part = updated.find((p) => p.bodyPart === bodyPart);
      if (part) {
        part.symptoms.includes(symptomId)
          ? (part.symptoms = part.symptoms.filter((s) => s !== symptomId))
          : part.symptoms.push(symptomId);
      } else {
        updated.push({ bodyPart, symptoms: [symptomId] });
      }
      return [...updated];
    });
  };

  const getMatchedConditions = () => {
    const allMatches = [];
    selectedSymptoms.forEach(({ bodyPart, symptoms }) => {
      const conditions = petSymptomDatabase.conditions[bodyPart] || [];
      conditions.forEach((condition) => {
        const matchCount = condition.symptoms.filter((s) => symptoms.includes(s)).length;
        if (matchCount > 0) {
          allMatches.push({
            ...condition,
            bodyPart,
            matchPercentage: Math.round((matchCount / condition.symptoms.length) * 100),
          });
        }
      });
    });
    return allMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);
  };

  const analyzeSymptoms = async () => {
    const matched = getMatchedConditions();
    setMatchedConditions(matched);
    setShowResults(true);
    const { data } = await triggerGpt({
      pet: selectedPet,
      symptoms: selectedSymptoms,
      conditions: matched,
    });
    setGptResponse(data?.recommendation || '');
    saveReport({ petId: selectedPet._id, symptoms: selectedSymptoms, conditions: matched });
  };

  const exportReport = () => {
    const element = document.getElementById('symptom-report');
    html2pdf().set({ margin: 0.5, filename: 'pet_report.pdf' }).from(element).save();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Advanced Symptom Checker</h2>

      {/* BODY PART + SYMPTOMS */}
      {Object.entries(petSymptomDatabase.symptoms).map(([partId, symptoms]) => (
        <Card key={partId} className="mb-4">
          <CardHeader><CardTitle>{partId}</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {symptoms.map((symptom) => (
                <label key={symptom.id} className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedSymptoms.find((p) => p.bodyPart === partId)?.symptoms.includes(symptom.id) || false}
                    onCheckedChange={() => toggleSymptom(partId, symptom.id)}
                  />
                  <span>{symptom.name}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={analyzeSymptoms} className="my-4">Analyze Symptoms</Button>

      {/* RESULTS */}
      {showResults && (
        <div id="symptom-report">
          <Card className="mb-4">
            <CardHeader><CardTitle>GPT Recommendation</CardTitle></CardHeader>
            <CardContent>
              {gptResponse ? <p>{gptResponse}</p> : <Skeleton className="h-4 w-full" />}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Matched Conditions</CardTitle></CardHeader>
            <CardContent>
              {matchedConditions.map((c, i) => (
                <div key={i} className="mb-2 p-2 border rounded">
                  <p className="font-bold">{c.name}</p>
                  <p>{c.description}</p>
                  <Badge>{c.matchPercentage}% match</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button onClick={exportReport} className="mt-4">Export Report</Button>
        </div>
      )}

      {/* HISTORY */}
      <Card className="mt-6">
        <CardHeader><CardTitle>Symptom History</CardTitle></CardHeader>
        <CardContent>
          {history.map((report, i) => (
            <div key={i} className="mb-3 p-2 border rounded">
              <p className="text-sm text-gray-600">{new Date(report.createdAt).toLocaleString()}</p>
              <p className="text-xs">Body Parts: {report.symptoms.map(p => p.bodyPart).join(', ')}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
