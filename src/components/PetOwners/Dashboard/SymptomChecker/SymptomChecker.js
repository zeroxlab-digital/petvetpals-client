"use client"

import { useState } from "react"
import {
  AlertTriangle,
  ArrowRight,
  Calendar1,
  ChevronDown,
  Clock,
  FileText,
  HeartPulse,
  HelpCircle,
  Info,
  MessageSquare,
  ThumbsUp,
} from "lucide-react"
import Image from "next/image"
import useFetchPets from "../../../../../hooks/useFetchPets"

export default function SymptomChecker() {
  const [selectedPet, setSelectedPet] = useState(null)
  const [showPetMenu, setShowPetMenu] = useState(false)
  const [selectedBodyPart, setSelectedBodyPart] = useState(null)
  const [symptoms, setSymptoms] = useState([])
  const [showResults, setShowResults] = useState(false)

  // Expanded Data Structure
  const bodyParts = [
    { id: "head", name: "Head & Neck", icon: "🦮" },
    { id: "chest", name: "Chest & Lungs", icon: "💓" },
    { id: "stomach", name: "Stomach & Digestion", icon: "🦴" },
    { id: "legs", name: "Legs & Joints", icon: "🦿" },
    { id: "skin", name: "Skin & Coat", icon: "🐾" },
    { id: "behavior", name: "Behavior & Mood", icon: "🧠" },
  ]

  const commonSymptoms = {
    head: [
      { id: "sneezing", name: "Sneezing", severity: "low" },
      { id: "coughing", name: "Coughing", severity: "medium" },
      { id: "difficulty_breathing", name: "Difficulty breathing", severity: "high" },
      { id: "eye_discharge", name: "Eye discharge", severity: "medium" },
      { id: "ear_infection", name: "Ear infection", severity: "high" },
    ],
    chest: [
      { id: "heavy_breathing", name: "Heavy breathing", severity: "high" },
      { id: "coughing", name: "Coughing", severity: "medium" },
      { id: "wheezing", name: "Wheezing", severity: "high" },
      { id: "loss_of_appetite", name: "Loss of appetite", severity: "medium" },
    ],
    stomach: [
      { id: "vomiting", name: "Vomiting", severity: "high" },
      { id: "diarrhea", name: "Diarrhea", severity: "high" },
      { id: "loss_of_appetite", name: "Loss of appetite", severity: "medium" },
      { id: "bloating", name: "Bloating", severity: "medium" },
    ],
    legs: [
      { id: "limping", name: "Limping", severity: "medium" },
      { id: "joint_swelling", name: "Joint swelling", severity: "high" },
      { id: "difficulty_walking", name: "Difficulty walking", severity: "high" },
      { id: "pain_when_touched", name: "Pain when touched", severity: "medium" },
    ],
    skin: [
      { id: "itching", name: "Itching", severity: "low" },
      { id: "rash", name: "Rash", severity: "medium" },
      { id: "hair_loss", name: "Hair loss", severity: "medium" },
      { id: "hot_spots", name: "Hot spots", severity: "high" },
      { id: "dry_skin", name: "Dry skin", severity: "low" },
    ],
    behavior: [
      { id: "lethargy", name: "Lethargy", severity: "medium" },
      { id: "aggression", name: "Aggression", severity: "high" },
      { id: "anxiety", name: "Anxiety", severity: "medium" },
      { id: "changes_in_appetite", name: "Changes in appetite", severity: "medium" },
    ],
  }

  const possibleConditions = {
    head: [
      {
        name: "Common Cold",
        symptoms: ["sneezing", "coughing"],
        severity: "low",
        description: "Mild respiratory infection causing sneezing and coughing.",
      },
      {
        name: "Ear Infection",
        symptoms: ["ear_infection", "difficulty_breathing"],
        severity: "high",
        description: "Bacterial or fungal infection in the ear canal.",
      },
    ],
    chest: [
      {
        name: "Bronchitis",
        symptoms: ["coughing", "wheezing"],
        severity: "medium",
        description: "Inflammation of the bronchial tubes.",
      },
      {
        name: "Pneumonia",
        symptoms: ["heavy_breathing", "loss_of_appetite"],
        severity: "high",
        description: "Severe lung infection requiring immediate care.",
      },
    ],
    stomach: [
      {
        name: "Gastroenteritis",
        symptoms: ["vomiting", "diarrhea"],
        severity: "high",
        description: "Inflammation of the stomach and intestines.",
      },
      {
        name: "Food Allergy",
        symptoms: ["bloating", "loss_of_appetite"],
        severity: "medium",
        description: "Adverse reaction to certain foods.",
      },
    ],
    legs: [
      {
        name: "Arthritis",
        symptoms: ["joint_swelling", "pain_when_touched"],
        severity: "medium",
        description: "Inflammation of the joints causing pain and swelling.",
      },
      {
        name: "Sprain",
        symptoms: ["limping", "difficulty_walking"],
        severity: "high",
        description: "Injury to ligaments causing pain and mobility issues.",
      },
    ],
    skin: [
      {
        name: "Allergic Dermatitis",
        symptoms: ["itching", "rash"],
        severity: "medium",
        description: "Skin inflammation due to allergies.",
      },
      {
        name: "Fungal Infection",
        symptoms: ["hot_spots", "hair_loss"],
        severity: "high",
        description: "Fungal overgrowth causing skin irritation.",
      },
    ],
    behavior: [
      {
        name: "Stress",
        symptoms: ["anxiety", "changes_in_appetite"],
        severity: "low",
        description: "Behavioral changes due to environmental stress.",
      },
      {
        name: "Pain-Induced Aggression",
        symptoms: ["aggression", "lethargy"],
        severity: "high",
        description: "Aggressive behavior due to underlying pain.",
      },
    ],
  }

  const { pets } = useFetchPets()

  // Dynamic Condition Matching
  const getMatchingConditions = () => {
    if (!selectedBodyPart || symptoms.length === 0) return []

    return possibleConditions[selectedBodyPart].filter((condition) =>
      condition.symptoms.some((symptom) => symptoms.includes(symptom))
    )
  }

  // Dynamic Recommendations
  const getRecommendations = (conditions) => {
    if (conditions.some((condition) => condition.severity === "high")) {
      return "Seek immediate veterinary care. Your pet may have a serious condition."
    } else if (conditions.some((condition) => condition.severity === "medium")) {
      return "Consult a veterinarian within 24 hours. Your pet may need medical attention."
    } else {
      return "Monitor your pet closely. If symptoms persist, consult a veterinarian."
    }
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto ">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pet Symptom Checker <span className="bg-primary px-3 py-1 text-sm rounded-md text-white ml-2">BETA</span></h1>
          <p className="text-sm text-gray-500">Check your pet&apos;s symptoms and get instant recommendations</p>
        </div>

        {/* Emergency Warning */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Emergency Warning</h3>
              <p className="text-sm text-red-700 mt-1">
                If your pet is experiencing any of these symptoms, seek immediate veterinary care:
              </p>
              <ul className="list-disc list-inside text-sm text-red-700 mt-1">
                <li>Difficulty breathing</li>
                <li>Severe bleeding</li>
                <li>Collapse or inability to stand</li>
                <li>Seizures</li>
                <li>Severe pain</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Selection Area */}
          <div className="md:col-span-2 space-y-6">
            {/* Pet Selector */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Select Your Pet</h2>
              <div className="relative">
                <button
                  onClick={() => setShowPetMenu(!showPetMenu)}
                  className="w-full flex items-center justify-between gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {selectedPet ? (
                    <div className="flex items-center gap-3">
                      <Image src="/images/cute-dog.jpg" alt={selectedPet.name} width={28} height={28} className="w-10 h-10 object-cover rounded-full" />
                      <p className="font-semibold">{selectedPet.name} <span className="text-gray-500 text-sm font-normal">({selectedPet.breed})</span></p>
                    </div>
                  ) : (
                    <span className="text-gray-500">Choose a pet</span>
                  )}
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
                {showPetMenu && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-lg border p-1 z-10">
                    {pets.map((pet) => (
                      <button
                        key={pet._id}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md"
                        onClick={() => {
                          setSelectedPet(pet)
                          setShowPetMenu(false)
                        }}
                      >
                        <Image src="/images/cute-dog.jpg" alt="pet-image" width={28} height={28} className="w-10 h-10 rounded-full object-cover" />
                        <p className="font-semibold">{pet.name} <span className="text-gray-500 text-sm font-normal">({pet.breed})</span></p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Body Part Selection */}
            {selectedPet && (
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Select Affected Area</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {bodyParts.map((part) => (
                    <button
                      key={part.id}
                      onClick={() => setSelectedBodyPart(part.id)}
                      className={`p-4 rounded-lg border text-left transition-colors hover:bg-blue-50 hover:border-blue-200 ${selectedBodyPart === part.id ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
                        }`}
                    >
                      <span className="text-2xl mb-2 block">{part.icon}</span>
                      <span className="font-medium block">{part.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Symptom Selection */}
            {selectedBodyPart && (
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Select Symptoms</h2>
                <div className="space-y-3">
                  {commonSymptoms[selectedBodyPart].map((symptom) => (
                    <label
                      key={symptom.id}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                        checked={symptoms.includes(symptom.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSymptoms([...symptoms, symptom.id])
                          } else {
                            setSymptoms(symptoms.filter((s) => s !== symptom.id))
                          }
                        }}
                      />
                      <span>{symptom.name}</span>
                    </label>
                  ))}
                </div>

                {symptoms.length > 0 && (
                  <button
                    onClick={() => setShowResults(true)}
                    className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Check Symptoms
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Results Area */}
          <div className="space-y-6">
            {showResults && symptoms.length > 0 && (
              <>
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Possible Conditions</h2>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-yellow-900">Recommendation</h3>
                          <p className="text-sm text-yellow-800 mt-1">
                            {getRecommendations(getMatchingConditions())}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {getMatchingConditions().map((condition) => (
                        <div key={condition.name} className="p-4 rounded-lg border">
                          <h3 className="font-medium">{condition.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{condition.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Recommended Actions</h2>
                  <div className="space-y-4">
                    <button className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-blue-50 hover:border-blue-200 transition-colors">
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Chat with a Vet Now</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-blue-50 hover:border-blue-200 transition-colors">
                      <Calendar1 className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Book an Appointment</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-blue-50 hover:border-blue-200 transition-colors">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">View Care Instructions</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Need Help?</h2>
                  <div className="space-y-4">
                    <button className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                      <HelpCircle className="h-5 w-5 text-gray-500" />
                      <span>FAQs</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                      <HeartPulse className="h-5 w-5 text-gray-500" />
                      <span>Emergency Services</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <span>Symptom Timeline</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            {!showResults && (
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ThumbsUp className="h-5 w-5 text-blue-500" />
                  <h2 className="text-lg font-semibold">Tips for Best Results</h2>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Be specific about symptoms
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Note when symptoms started
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Include any recent changes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Track symptom frequency
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}