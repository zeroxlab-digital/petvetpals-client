"use client"

import { useState } from "react"
import TreatmentHistoryHeader from "./components/TreatmentHistoryHeader"
import TreatmentSearch from "./components/TreatmentSearch"
import TreatmentList from "./components/TreatmentList"
import TreatmentDetailsModal from "./components/TreatmentDetailsModal"

export default function TreatmentHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTreatment, setSelectedTreatment] = useState(null)
  const [showFullRecordModal, setShowFullRecordModal] = useState(false)

  // Enhanced treatment data with comprehensive information
  const treatments = [
    {
      id: 1,
      date: "2024-12-08",
      time: "10:30 AM",
      petName: "Buddy",
      owner: "Sarah Johnson",
      treatment: "Annual Wellness Exam",
      diagnosis: "Healthy - No concerns",
      medications: ["Heartgard Plus", "NexGard"],
      followUp: "6 months",
      status: "completed",
      notes: "Patient showed excellent health markers. Continue current preventive care routine.",
      avatar: "/placeholder.svg?height=40&width=40",
      detailedRecord: {
        petInfo: {
          breed: "Golden Retriever",
          age: "3 years",
          weight: "65 lbs",
          microchip: "GR123456789",
        },
        vitals: {
          temperature: "101.5°F",
          heartRate: "90 bpm",
          respiratoryRate: "20 breaths/min",
          bloodPressure: "Normal",
        },
        examination: {
          eyes: "Clear, no discharge",
          ears: "Clean, no infection",
          teeth: "Good condition, minimal tartar",
          heart: "Regular rhythm, no murmurs",
          lungs: "Clear bilaterally",
          abdomen: "Soft, non-painful",
          skin: "Healthy, no lesions",
          musculoskeletal: "Normal gait, full range of motion",
        },
        labResults: [
          { test: "Complete Blood Count", result: "Normal", date: "2024-12-08" },
          { test: "Chemistry Panel", result: "All values within range", date: "2024-12-08" },
          { test: "Heartworm Test", result: "Negative", date: "2024-12-08" },
        ],
        recommendations: [
          "Continue current diet and exercise routine",
          "Maintain monthly heartworm and flea prevention",
          "Schedule next wellness exam in 6 months",
          "Consider dental cleaning in next 12 months",
        ],
      },
    },
    {
      id: 2,
      date: "2024-12-05",
      time: "2:15 PM",
      petName: "Whiskers",
      owner: "Mike Chen",
      treatment: "Post-Surgery Follow-up",
      diagnosis: "Healing well from spay surgery",
      medications: ["Metacam 0.5ml daily", "Clavamox 62.5mg twice daily"],
      followUp: "2 weeks",
      status: "monitoring",
      notes: "Incision site healing properly. Owner advised to continue restricted activity.",
      avatar: "/placeholder.svg?height=40&width=40",
      detailedRecord: {
        petInfo: {
          breed: "Maine Coon",
          age: "7 years",
          weight: "14 lbs",
          microchip: "MC987654321",
        },
        vitals: {
          temperature: "101.8°F",
          heartRate: "180 bpm",
          respiratoryRate: "25 breaths/min",
          bloodPressure: "Normal",
        },
        examination: {
          incisionSite: "Clean, no discharge, sutures intact",
          abdomen: "Soft, mild tenderness around incision",
          appetite: "Good - eating well",
          activity: "Restricted as advised, no jumping observed",
          litterBox: "Normal usage reported by owner",
        },
        postOpInstructions: [
          "Continue pain medication as prescribed",
          "Keep incision clean and dry",
          "Restrict jumping and climbing for 10-14 days",
          "Monitor for signs of infection",
          "Return for suture removal in 10-14 days",
        ],
      },
    },
    {
      id: 3,
      date: "2024-12-01",
      time: "11:00 AM",
      petName: "Luna",
      owner: "Emma Davis",
      treatment: "ACL Injury Assessment",
      diagnosis: "Partial ACL tear - Grade 2",
      medications: ["Carprofen 75mg twice daily", "Gabapentin 100mg three times daily"],
      followUp: "2 weeks",
      status: "ongoing",
      notes: "Discussed surgical vs conservative treatment options. Owner opted for conservative management initially.",
      avatar: "/placeholder.svg?height=40&width=40",
      detailedRecord: {
        petInfo: {
          breed: "Border Collie",
          age: "5 years",
          weight: "45 lbs",
          microchip: "BC456789123",
        },
        vitals: {
          temperature: "101.3°F",
          heartRate: "95 bpm",
          respiratoryRate: "22 breaths/min",
          bloodPressure: "Normal",
        },
        examination: {
          leftKnee: "Swelling present, positive drawer sign",
          gait: "Mild lameness on left hind limb",
          palpation: "Pain on manipulation of left stifle",
          rangeOfMotion: "Slightly decreased in left knee",
        },
        imaging: [{ type: "X-ray", result: "Mild joint effusion, no fractures", date: "2024-12-01" }],
        treatmentPlan: [
          "Conservative management with NSAIDs and gabapentin",
          "Strict exercise restriction for 6-8 weeks",
          "Physical therapy exercises to be started in 2 weeks",
          "Recheck in 2 weeks to assess progress",
          "Surgical consultation if no improvement in 6-8 weeks",
        ],
      },
    },
    {
      id: 4,
      date: "2024-11-28",
      time: "9:45 AM",
      petName: "Charlie",
      owner: "Robert Wilson",
      treatment: "Senior Wellness Panel",
      diagnosis: "Age-related joint stiffness",
      medications: ["Cosequin DS daily", "Fish oil supplement"],
      followUp: "3 months",
      status: "completed",
      notes: "Blood work normal for age. Recommended joint supplements and weight management.",
      avatar: "/placeholder.svg?height=40&width=40",
      detailedRecord: {
        petInfo: {
          breed: "Labrador Retriever",
          age: "9 years",
          weight: "78 lbs",
          microchip: "LR789123456",
        },
        vitals: {
          temperature: "101.1°F",
          heartRate: "88 bpm",
          respiratoryRate: "18 breaths/min",
          bloodPressure: "Slightly elevated",
        },
        examination: {
          joints: "Mild stiffness in hips and elbows",
          heart: "Grade 1/6 systolic murmur",
          eyes: "Early nuclear sclerosis",
          teeth: "Moderate tartar buildup",
        },
        labResults: [
          { test: "Senior Blood Panel", result: "All values normal for age", date: "2024-11-28" },
          { test: "Thyroid Function", result: "Normal", date: "2024-11-28" },
          { test: "Urinalysis", result: "Normal", date: "2024-11-28" },
        ],
        recommendations: [
          "Start joint supplements for mobility support",
          "Weight management - reduce daily calories by 10%",
          "Monitor heart murmur - recheck in 6 months",
          "Consider dental cleaning under anesthesia",
          "Continue regular exercise but avoid high impact activities",
        ],
      },
    },
    {
      id: 5,
      date: "2024-11-25",
      time: "3:30 PM",
      petName: "Max",
      owner: "Jennifer Lee",
      treatment: "Vaccination Update",
      diagnosis: "Routine vaccination",
      medications: ["DHPP vaccine", "Rabies vaccine"],
      followUp: "1 year",
      status: "completed",
      notes: "All vaccinations up to date. No adverse reactions observed.",
      avatar: "/placeholder.svg?height=40&width=40",
      detailedRecord: {
        petInfo: {
          breed: "German Shepherd",
          age: "2 years",
          weight: "75 lbs",
          microchip: "GS456789123",
        },
        vitals: {
          temperature: "101.2°F",
          heartRate: "85 bpm",
          respiratoryRate: "18 breaths/min",
          bloodPressure: "Normal",
        },
        vaccinations: [
          { vaccine: "DHPP", date: "2024-11-25", nextDue: "2025-11-25" },
          { vaccine: "Rabies", date: "2024-11-25", nextDue: "2027-11-25" },
          { vaccine: "Bordetella", date: "2024-11-25", nextDue: "2025-11-25" },
        ],
        examination: {
          overall: "Excellent body condition",
          temperament: "Alert and friendly",
          coat: "Shiny and healthy",
          musculature: "Well-developed, appropriate for breed",
        },
      },
    },
  ]

  const handleViewFullRecord = (treatment) => {
    // TODO: API call - getTreatmentFullRecord(treatment.id) using RTK Query
    setSelectedTreatment(treatment)
    setShowFullRecordModal(true)
  }

  const handleScheduleFollowUp = (treatmentId) => {
    // TODO: API call - scheduleFollowUpAppointment(treatmentId) using RTK Query
    // TODO: Navigate to appointment scheduling with pre-filled data
    window.location.href = `/veterinarian/appointments/new?followUpFor=${treatmentId}`
  }

  const handleExportRecords = () => {
    // TODO: API call - exportTreatmentRecords(filteredTreatments) using RTK Query
    alert("Exporting treatment records to PDF...")
  }

  const handleAddTreatment = () => {
    // TODO: Navigate to new treatment entry form using Next.js router
    window.location.href = "/veterinarian/treatments/new"
  }

  const filteredTreatments = treatments.filter((treatment) =>
    treatment.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    treatment.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    treatment.treatment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    treatment.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8 space-y-6">
      <TreatmentHistoryHeader onExportRecords={handleExportRecords} onAddTreatment={handleAddTreatment} />
      <TreatmentSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TreatmentList
        treatments={filteredTreatments}
        onViewFullRecord={handleViewFullRecord}
        onScheduleFollowUp={handleScheduleFollowUp} />
      <TreatmentDetailsModal
        treatment={selectedTreatment}
        isOpen={showFullRecordModal}
        onClose={() => setShowFullRecordModal(false)} />
    </div>
  );
}
