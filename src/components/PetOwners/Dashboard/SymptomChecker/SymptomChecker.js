/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, ArrowRight, Brain, Calendar, Check, ChevronDown, FileText, Heart, Info, Loader2, MessageSquare, PawPrintIcon as Paw, Search, Stethoscope, StickerIcon as Stomach, ThumbsUp, X } from 'lucide-react'
import Image from "next/image"
// import useFetchPets from "@/hooks/useFetchPets"
import { petSymptomDatabase } from "./pet-symptom-database"
import useFetchPets from "../../../../../hooks/useFetchPets"
import { useGetPetsQuery } from "@/redux/services/petApi"

// Custom utility function to conditionally join class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

// Custom Button component
const Button = ({
  children,
  variant = "default",
  className = "",
  disabled = false,
  size = "default",
  onClick,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600 shadow",
    outline: "border border-gray-200 bg-white hover:bg-gray-50 text-gray-900",
    ghost: "hover:bg-gray-100 text-gray-900",
  }

  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-6 text-base",
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

// Custom Card components
const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn("rounded-lg border border-gray-200 bg-white shadow-sm", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const CardHeader = ({ className, children, ...props }) => {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const CardTitle = ({ className, children, ...props }) => {
  return (
    <h3
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  )
}

const CardContent = ({ className, children, ...props }) => {
  return (
    <div
      className={cn("p-6 pt-0", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Custom Checkbox component
const Checkbox = ({ checked, onCheckedChange, className, ...props }) => {
  return (
    <div className="flex items-center">
      <div
        className={cn(
          "h-4 w-4 rounded border border-gray-300 flex items-center justify-center transition-colors",
          checked ? "bg-blue-500 border-blue-500" : "bg-white",
          className
        )}
        onClick={() => onCheckedChange(!checked)}
        {...props}
      >
        {checked && <Check className="h-3 w-3 text-white" />}
      </div>
    </div>
  )
}

// Custom Badge component
const Badge = ({ children, variant = "default", className, ...props }) => {
  const variants = {
    default: "bg-blue-500 text-white",
    outline: "bg-transparent border border-gray-200 text-gray-900",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

// Custom Skeleton component
const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  )
}

// Custom Tooltip component
const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipRef = useRef(null)

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-md shadow-sm -top-9 left-1/2 transform -translate-x-1/2"
          >
            {content}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function SymptomChecker() {
  const [selectedPet, setSelectedPet] = useState(null)
  const [showPetMenu, setShowPetMenu] = useState(false)
  const [selectedBodyPart, setSelectedBodyPart] = useState(null)
  const [symptoms, setSymptoms] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [matchedConditions, setMatchedConditions] = useState([])
  const [recommendation, setRecommendation] = useState("")

  // const { pets, isLoading: petsLoading } = useFetchPets()
  // console.log(pets);
  const { data: { pets } = {}, isLoading: petsLoading, isError } = useGetPetsQuery();
  console.log(pets);


  // Body parts with improved icons
  const bodyParts = [
    { id: "head", name: "Head & Neck", icon: <Search className="h-6 w-6" /> },
    { id: "chest", name: "Chest & Lungs", icon: <Heart className="h-6 w-6" /> },
    { id: "stomach", name: "Stomach & Digestion", icon: <Stomach className="h-6 w-6" /> },
    { id: "legs", name: "Legs & Joints", icon: <Paw className="h-6 w-6" /> },
    { id: "skin", name: "Skin & Coat", icon: <Paw className="h-6 w-6 rotate-45" /> },
    { id: "behavior", name: "Behavior & Mood", icon: <Brain className="h-6 w-6" /> },
  ]

  // Process results with simulated loading for better UX
  const processResults = async () => {
    setIsLoading(true)

    // Simulate API call for analysis
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const conditions = getMatchingConditions()
    setMatchedConditions(conditions)
    setRecommendation(getRecommendations(conditions))
    setIsLoading(false)
    setShowResults(true)
  }

  // Reset selections when pet changes
  useEffect(() => {
    setSelectedBodyPart(null)
    setSymptoms([])
    setShowResults(false)
  }, [selectedPet])

  // Reset symptoms when body part changes
  useEffect(() => {
    setSymptoms([])
    setShowResults(false)
  }, [selectedBodyPart])

  // Dynamic Condition Matching with expanded database
  const getMatchingConditions = () => {
    if (!selectedBodyPart || symptoms.length === 0) return []

    return (
      petSymptomDatabase.conditions[selectedBodyPart]
        .filter((condition) =>
          // Match if any symptom matches
          condition.symptoms.some((symptom) => symptoms.includes(symptom)),
        )
        // Sort by match count (most matching symptoms first)
        .sort((a, b) => {
          const aMatches = a.symptoms.filter((s) => symptoms.includes(s)).length
          const bMatches = b.symptoms.filter((s) => symptoms.includes(s)).length
          return bMatches - aMatches
        })
        // Add match percentage
        .map((condition) => {
          const matchCount = condition.symptoms.filter((s) => symptoms.includes(s)).length
          const matchPercentage = Math.round((matchCount / condition.symptoms.length) * 100)
          return {
            ...condition,
            matchPercentage: Math.min(matchPercentage, 100),
          }
        })
    )
  }

  // Dynamic Recommendations based on severity
  const getRecommendations = (conditions) => {
    if (conditions.length === 0) {
      return "Based on the symptoms provided, we couldn't identify a specific condition. Please consult with a veterinarian for a proper diagnosis."
    }

    if (conditions.some((condition) => condition.severity === "emergency")) {
      return "EMERGENCY: Seek immediate veterinary care. Your pet may have a life-threatening condition."
    } else if (conditions.some((condition) => condition.severity === "high")) {
      return "URGENT: Consult a veterinarian as soon as possible. Your pet may have a serious condition."
    } else if (conditions.some((condition) => condition.severity === "medium")) {
      return "ATTENTION NEEDED: Schedule a veterinary appointment within 24-48 hours. Your pet may need medical attention."
    } else {
      return "MONITOR: Keep an eye on your pet. If symptoms persist for more than 48 hours or worsen, consult a veterinarian."
    }
  }

  // Get severity color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "emergency":
        return "text-red-600 bg-red-50 border-red-200"
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "medium":
        return "text-amber-600 bg-amber-50 border-amber-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-blue-600 bg-blue-50 border-blue-200"
    }
  }

  // Get severity label
  const getSeverityLabel = (severity) => {
    switch (severity) {
      case "emergency":
        return "Emergency"
      case "high":
        return "Urgent"
      case "medium":
        return "Moderate"
      case "low":
        return "Mild"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
            Pet Symptom Checker
            <Badge className="ml-3 bg-primary">
              BETA
            </Badge>
          </h1>
          <p className="text-gray-500">Check your pet&apos;s symptoms and get instant recommendations</p>
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
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Select Your Pet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Button
                    variant="outline"
                    onClick={() => setShowPetMenu(!showPetMenu)}
                    className="w-full flex items-center justify-between gap-2 h-auto py-3"
                  >
                    {petsLoading ? (
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ) : selectedPet ? (
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100">
                          <Image
                            src={selectedPet.image}
                            alt={selectedPet.name}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <p className="font-medium">
                          {selectedPet.name}{" "}
                          <span className="text-gray-500 text-sm font-normal">({selectedPet.breed})</span>
                        </p>
                      </div>
                    ) : (
                      <span className="text-gray-500">Choose a pet</span>
                    )}
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>

                  <AnimatePresence>
                    {showPetMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-lg border p-1 z-10"
                      >
                        {petsLoading ? (
                          Array(3)
                            .fill(0)
                            .map((_, i) => (
                              <div key={i} className="flex items-center gap-3 px-3 py-2">
                                <Skeleton className="w-10 h-10 rounded-full" />
                                <div>
                                  <Skeleton className="h-4 w-24 mb-1" />
                                  <Skeleton className="h-3 w-16" />
                                </div>
                              </div>
                            ))
                        ) : pets && pets.length > 0 ? (
                          pets.map((pet) => (
                            <button
                              key={pet._id}
                              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md transition-colors"
                              onClick={() => {
                                setSelectedPet(pet)
                                setShowPetMenu(false)
                              }}
                            >
                              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100">
                                <Image
                                  src={pet.image || ""}
                                  alt={pet.name}
                                  width={40}
                                  height={40}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div className="text-left">
                                <p className="font-medium">{pet.name}</p>
                                <p className="text-gray-500 text-sm">{pet.breed}</p>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-gray-500 text-sm">No pets found</div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>

            {/* Body Part Selection */}
            <AnimatePresence mode="wait">
              {selectedPet && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Select Affected Area</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {bodyParts.map((part) => (
                          <button
                            key={part.id}
                            onClick={() => setSelectedBodyPart(part.id)}
                            className={cn(
                              "p-4 rounded-lg border text-left transition-all hover:shadow-md",
                              selectedBodyPart === part.id
                                ? "bg-blue-50 border-blue-200 shadow-sm"
                                : "bg-white border-gray-200 hover:border-blue-200",
                            )}
                          >
                            <div
                              className={cn(
                                "w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors",
                                selectedBodyPart === part.id
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-gray-100 text-gray-600",
                              )}
                            >
                              {part.icon}
                            </div>
                            <span className="font-medium block">{part.name}</span>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Symptom Selection */}
            <AnimatePresence mode="wait">
              {selectedBodyPart && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Select Symptoms</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {petSymptomDatabase.symptoms[selectedBodyPart].map((symptom) => (
                          <label
                            key={symptom.id}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                              symptoms.includes(symptom.id) ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50",
                            )}
                          >
                            <Checkbox
                              checked={symptoms.includes(symptom.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSymptoms([...symptoms, symptom.id])
                                } else {
                                  setSymptoms(symptoms.filter((s) => s !== symptom.id))
                                }
                                setShowResults(false)
                              }}
                            />
                            <div>
                              <span>{symptom.name}</span>
                              {symptom.severity === "high" && (
                                <Badge className="ml-2 text-red-500 border-red-200 bg-red-50" variant="outline">
                                  Serious
                                </Badge>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>

                      {symptoms.length > 0 && (
                        <Button onClick={processResults} disabled={isLoading} className="mt-6 w-full" size="lg">
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Analyzing Symptoms...
                            </>
                          ) : (
                            <>
                              Check Symptoms
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Area */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader className="pb-3">
                      <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Skeleton className="h-24 w-full" />
                      <div className="space-y-3">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {showResults && !isLoading && symptoms.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center">
                        <Stethoscope className="mr-2 h-5 w-5" />
                        Possible Conditions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div
                        className={cn(
                          "p-4 rounded-lg border",
                          recommendation.includes("EMERGENCY")
                            ? "bg-red-50 border-red-200"
                            : recommendation.includes("URGENT")
                              ? "bg-orange-50 border-orange-200"
                              : recommendation.includes("ATTENTION")
                                ? "bg-amber-50 border-amber-200"
                                : "bg-blue-50 border-blue-200",
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <Info
                            className={cn(
                              "h-5 w-5 mt-0.5",
                              recommendation.includes("EMERGENCY")
                                ? "text-red-600"
                                : recommendation.includes("URGENT")
                                  ? "text-orange-600"
                                  : recommendation.includes("ATTENTION")
                                    ? "text-amber-600"
                                    : "text-blue-600",
                            )}
                          />
                          <div>
                            <h3 className="font-medium">Recommendation</h3>
                            <p className="text-sm mt-1">{recommendation}</p>
                          </div>
                        </div>
                      </div>

                      {matchedConditions.length > 0 ? (
                        <div className="space-y-3">
                          {matchedConditions.map((condition, index) => (
                            <div
                              key={condition.name}
                              className={cn("p-4 rounded-lg border transition-all", index === 0 ? "bg-gray-50" : "")}
                            >
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium">{condition.name}</h3>
                                <Badge className={cn("ml-2", getSeverityColor(condition.severity))}>
                                  {getSeverityLabel(condition.severity)}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{condition.description}</p>

                              <div className="mt-3">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                  <span>Match confidence</span>
                                  <span>{condition.matchPercentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className={cn(
                                      "h-2 rounded-full",
                                      condition.matchPercentage > 75
                                        ? "bg-green-500"
                                        : condition.matchPercentage > 50
                                          ? "bg-blue-500"
                                          : condition.matchPercentage > 25
                                            ? "bg-amber-500"
                                            : "bg-red-500",
                                    )}
                                    style={{ width: `${condition.matchPercentage}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div className="mt-3">
                                <p className="text-xs text-gray-500 mb-1">Common symptoms:</p>
                                <div className="flex flex-wrap gap-2">
                                  {condition.symptoms.map((symptomId) => {
                                    const symptomObj = petSymptomDatabase.symptoms[selectedBodyPart].find(
                                      (s) => s.id === symptomId,
                                    )
                                    return (
                                      <Badge
                                        key={symptomId}
                                        variant={symptoms.includes(symptomId) ? "default" : "outline"}
                                        className={symptoms.includes(symptomId) ? "bg-blue-500" : "text-gray-500"}
                                      >
                                        {symptoms.includes(symptomId) && <Check className="mr-1 h-3 w-3" />}
                                        {symptomObj?.name || symptomId}
                                      </Badge>
                                    )
                                  })}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 rounded-lg border bg-gray-50">
                          <p className="text-center text-gray-500">
                            No specific conditions matched your pet's symptoms. Please consult with a veterinarian for a
                            proper diagnosis.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5" />
                        Recommended Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Tooltip content="Connect with a licensed veterinarian">
                        <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
                          <MessageSquare className="h-5 w-5 text-blue-500 mr-3" />
                          <span className="font-medium">Chat with a Vet Now</span>
                        </Button>
                      </Tooltip>

                      <Tooltip content="Schedule a visit with your veterinarian">
                        <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
                          <Calendar className="h-5 w-5 text-blue-500 mr-3" />
                          <span className="font-medium">Book an Appointment</span>
                        </Button>
                      </Tooltip>

                      <Tooltip content="Get detailed care instructions for your pet's condition">
                        <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
                          <FileText className="h-5 w-5 text-blue-500 mr-3" />
                          <span className="font-medium">View Care Instructions</span>
                        </Button>
                      </Tooltip>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {!showResults && !isLoading && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <ThumbsUp className="mr-2 h-5 w-5" />
                    Tips for Best Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>Be specific about symptoms and their duration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>Note when symptoms started and if they're getting worse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>Include any recent changes in diet, environment, or routine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>Track symptom frequency and patterns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>Remember this tool is not a substitute for professional veterinary care</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
