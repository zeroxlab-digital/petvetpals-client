"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {AlertTriangle, ArrowRight, Brain, Calendar, Check, ChevronDown, Heart, Loader2, MessageSquare, PawPrintIcon as Paw, Search, Stethoscope, StickerIcon as Stomach, ThumbsUp, Download, Sparkles, Activity, Eye, Zap, Clock, FileText, Palette,} from "lucide-react"
import Image from "next/image"
import {
  useGetSymptomHistoryQuery,
  useGetGptRecommendationMutation,
  useSaveSymptomReportMutation,
} from "@/redux/services/symptomApi"
import { petSymptomDatabase } from "./pet-symptom-database"
import html2pdf from "html2pdf.js"
import { useGetPetsQuery } from "@/redux/services/petApi"

// Custom utility function to conditionally join class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

// Custom Button component with enhanced styling
const Button = ({
  children,
  variant = "default",
  className = "",
  disabled = false,
  size = "default",
  onClick,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95"

  const variants = {
    default:
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-gray-200 bg-white hover:border-blue-300 text-gray-700 hover:text-blue-600 hover:bg-blue-50 shadow-sm hover:shadow-md",
    ghost: "hover:bg-gray-100 text-gray-700 hover:text-blue-600",
    success:
      "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl",
  }

  const sizes = {
    default: "h-12 px-3 py-2 text-sm",
    sm: "h-10 px-2 py-1 text-xs",
    lg: "h-14 px-4 py-3 text-base",
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

// Enhanced Card components
const Card = ({ className, children, hover = true, ...props }) => {
  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm",
        hover && "hover:shadow-xl hover:border-blue-200 transition-all duration-300",
        className,
      )}
      whileHover={hover ? { y: -2 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  )
}

const CardHeader = ({ className, children, gradient = false, ...props }) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 p-5",
        gradient && "bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl border-b border-gray-100",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const CardTitle = ({ className, children, ...props }) => {
  return (
    <h3 className={cn("text-lg font-bold leading-none tracking-tight text-gray-800", className)} {...props}>
      {children}
    </h3>
  )
}

const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={cn("p-5 pt-0", className)} {...props}>
      {children}
    </div>
  )
}

// Enhanced Checkbox component
const Checkbox = ({ checked, onCheckedChange, className, ...props }) => {
  return (
    <motion.div className="flex items-center" whileTap={{ scale: 0.95 }}>
      <div
        className={cn(
          "h-5 w-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 cursor-pointer",
          checked
            ? "bg-gradient-to-r from-blue-500 to-purple-500 border-blue-500 shadow-lg"
            : "bg-white border-gray-300 hover:border-blue-400 shadow-sm",
          className,
        )}
        onClick={() => onCheckedChange(!checked)}
        {...props}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Check className="h-3 w-3 text-white font-bold" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// Enhanced Badge component
const Badge = ({ children, variant = "default", className, ...props }) => {
  const variants = {
    default: "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md",
    outline: "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300",
    success: "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md",
    warning: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md",
    emergency: "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

// Enhanced Skeleton component
const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200", className)}
      {...props}
    />
  )
}

// Step Indicator Component
const StepIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, title: "Select Pet", icon: <Heart className="h-4 w-4" /> },
    { number: 2, title: "Choose Area", icon: <Search className="h-4 w-4" /> },
    { number: 3, title: "Pick Symptoms", icon: <Activity className="h-4 w-4" /> },
    { number: 4, title: "Get Results", icon: <Sparkles className="h-4 w-4" /> },
  ]

  return (
    <div className="flex items-center justify-center mb-8 max-sm:hidden">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <motion.div
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300",
                currentStep >= step.number
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 border-blue-500 text-white shadow-lg"
                  : currentStep === step.number - 1
                    ? "border-blue-300 bg-blue-50 text-blue-600"
                    : "border-gray-200 bg-gray-50 text-gray-400",
              )}
              whileHover={{ scale: 1.1 }}
              animate={currentStep === step.number ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: currentStep === step.number ? 2 : 0 }}
            >
              {currentStep > step.number ? <Check className="h-5 w-5" /> : step.icon}
            </motion.div>
            <div className="ml-2 hidden sm:block">
              <p className={cn("text-sm font-medium", currentStep >= step.number ? "text-blue-600" : "text-gray-500")}>
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-8 h-0.5 mx-4 transition-all duration-300",
                  currentStep > step.number ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gray-200",
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdvancedSymptomChecker() {
  const [selectedPet, setSelectedPet] = useState(null)
  const [showPetMenu, setShowPetMenu] = useState(false)
  const [selectedBodyPart, setSelectedBodyPart] = useState(null)
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [matchedConditions, setMatchedConditions] = useState([])
  const [gptResponse, setGptResponse] = useState("")
  const [showResults, setShowResults] = useState(false)

  // RTK Query hooks
  const {
    data: { pets } = {},
    isLoading: petsLoading,
  } = useGetPetsQuery()
  const [getGptRecommendation, { isLoading: isGptLoading }] = useGetGptRecommendationMutation()
  const [saveReport] = useSaveSymptomReportMutation()
  const { data: history = [] } = useGetSymptomHistoryQuery(selectedPet?._id)

  // Body parts with enhanced styling - Updated to match your requirements
  const bodyParts = [
    {
      id: "head",
      name: "Head & Neck",
      icon: <Search className="h-8 w-8" />,
      gradient: "from-pink-500 to-rose-500",
      description: "Eyes, ears, nose, mouth, throat",
    },
    {
      id: "chest",
      name: "Chest & Lungs",
      icon: <Heart className="h-8 w-8" />,
      gradient: "from-red-500 to-pink-500",
      description: "Breathing, heart, chest area",
    },
    {
      id: "stomach",
      name: "Stomach & Digestion",
      icon: <Stomach className="h-8 w-8" />,
      gradient: "from-green-500 to-emerald-500",
      description: "Eating, drinking, digestion",
    },
    {
      id: "legs",
      name: "Legs & Joints",
      icon: <Paw className="h-8 w-8" />,
      gradient: "from-blue-500 to-cyan-500",
      description: "Walking, movement, joints",
    },
    {
      id: "skin",
      name: "Skin & Coat",
      icon: <Palette className="h-8 w-8" />,
      gradient: "from-purple-500 to-indigo-500",
      description: "Skin, fur, coat condition",
    },
    {
      id: "behavior",
      name: "Behavior & Mood",
      icon: <Brain className="h-8 w-8" />,
      gradient: "from-orange-500 to-yellow-500",
      description: "Mood, behavior, mental state",
    },
  ]

  const getCurrentStep = () => {
    if (!selectedPet) return 1
    if (!selectedBodyPart) return 2
    if (selectedSymptoms.length === 0) return 3
    return 4
  }

  const toggleSymptom = (symptomId) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId) ? prev.filter((s) => s !== symptomId) : [...prev, symptomId],
    )
    setShowResults(false)
  }

  const getMatchedConditions = () => {
    if (!selectedBodyPart || selectedSymptoms.length === 0) return []

    const conditions = petSymptomDatabase.conditions[selectedBodyPart] || []
    return conditions
      .filter((condition) => condition.symptoms.some((symptom) => selectedSymptoms.includes(symptom)))
      .map((condition) => {
        const matchCount = condition.symptoms.filter((s) => selectedSymptoms.includes(s)).length
        const matchPercentage = Math.round((matchCount / condition.symptoms.length) * 100)
        return {
          ...condition,
          matchPercentage: Math.min(matchPercentage, 100),
        }
      })
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
  }

  const analyzeSymptoms = async () => {
    if (!selectedPet || selectedSymptoms.length === 0) {
      alert("Please select a pet and at least one symptom.")
      return
    }

    const matched = getMatchedConditions()
    setMatchedConditions(matched)
    setShowResults(true)

    try {
      const symptomsFormatted = [
        {
          bodyPart: selectedBodyPart,
          symptoms: selectedSymptoms,
        },
      ]

      const { data } = await getGptRecommendation({
        pet: selectedPet,
        symptoms: symptomsFormatted,
        conditions: matched,
      })
      setGptResponse(data?.recommendation || "No recommendation returned.")
      await saveReport({
        petId: selectedPet._id,
        symptoms: symptomsFormatted,
        conditions: matched,
      })
    } catch (err) {
      console.error("Error during analysis:", err)
      alert("Something went wrong during analysis.")
    }
  }

  const exportReport = () => {
    const element = document.getElementById("symptom-report")
    if (!element) {
      alert("Nothing to export.")
      return
    }
    html2pdf().set({ margin: 0.5, filename: "pet_report.pdf" }).from(element).save()
  }

  const getSeverityBadgeVariant = (severity) => {
    switch (severity) {
      case "emergency":
        return "emergency"
      case "high":
        return "warning"
      case "medium":
        return "default"
      case "low":
        return "success"
      default:
        return "outline"
    }
  }

  // Reset when pet changes
  useEffect(() => {
    setSelectedBodyPart(null)
    setSelectedSymptoms([])
    setShowResults(false)
  }, [selectedPet])

  // Reset symptoms when body part changes
  useEffect(() => {
    setSelectedSymptoms([])
    setShowResults(false)
  }, [selectedBodyPart])

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className=" mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='mb-5'>
            <h2 className='font-bold text-2xl mb-2 flex items-center gap-3'><span className="bg-primary rounded-md w-10 h-10 flex items-center justify-center text-white"><Stethoscope /></span>Vet GPT</h2>
            <p className='text-gray-500'>Advanced AI-powered symptom analysis for your beloved pets</p>
          </div>
        </motion.div>

        {/* Step Indicator */}
        <StepIndicator currentStep={getCurrentStep()} totalSteps={4} />

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Selection Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Pet Selector */}
            <Card hover>
              <CardHeader gradient>
                <CardTitle className="flex items-center">
                  {/* <Heart className="mr-3 h-6 w-6 text-blue-600" /> */}
                  Step 1: Select Your Pet
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="relative">
                  <Button
                    variant="outline"
                    onClick={() => setShowPetMenu(!showPetMenu)}
                    className="w-full flex items-center justify-between gap-3 h-auto py-4"
                    size="lg"
                  >
                    {petsLoading ? (
                      <div className="flex items-center gap-4">
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div>
                          <Skeleton className="h-4 w-32 mb-2" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </div>
                    ) : selectedPet ? (
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-3 border-blue-200 shadow-lg">
                          <Image
                            src={selectedPet.image || "/placeholder.svg?height=48&width=48"}
                            alt={selectedPet.name}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-gray-800">{selectedPet.name}</p>
                          <p className="text-gray-500 text-sm max-sm:font-normal">{selectedPet.breed} • {selectedPet.age} Years Old</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                          <Heart className="h-6 w-6 text-blue-600" />
                        </div>
                        <span className="text-gray-500 font-medium">Choose your beloved pet</span>
                      </div>
                    )}
                    <motion.div animate={{ rotate: showPetMenu ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </motion.div>
                  </Button>

                  <AnimatePresence>
                    {showPetMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 max-h-80 overflow-y-auto"
                      >
                        {petsLoading ? (
                          Array(3)
                            .fill(0)
                            .map((_, i) => (
                              <div key={i} className="flex items-center gap-4 px-4 py-3">
                                <Skeleton className="w-12 h-12 rounded-full" />
                                <div>
                                  <Skeleton className="h-4 w-24 mb-2" />
                                  <Skeleton className="h-3 w-16" />
                                </div>
                              </div>
                            ))
                        ) : pets && pets.length > 0 ? (
                          pets.map((pet) => (
                            <motion.button
                              key={pet._id}
                              className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-200"
                              onClick={() => {
                                setSelectedPet(pet)
                                setShowPetMenu(false)
                              }}
                              whileHover={{ x: 4 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100 shadow-md">
                                <Image
                                  src={pet.image || "/placeholder.svg?height=48&width=48"}
                                  alt={pet.name}
                                  width={48}
                                  height={48}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div className="text-left">
                                <p className="font-bold text-gray-800">{pet.name}</p>
                                <p className="text-gray-500 text-sm">{pet.breed}</p>
                              </div>
                            </motion.button>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center text-gray-500">
                            <Heart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                            <p className="font-medium">No pets found</p>
                            <p className="text-sm">Add a pet to get started</p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Body Part Selection */}
            <AnimatePresence mode="wait">
              {selectedPet && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card hover>
                    <CardHeader gradient>
                      <CardTitle className="flex items-center">
                        {/* <Search className="mr-3 h-6 w-6 text-purple-600" /> */}
                        Step 2: Select Affected Area
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {bodyParts.map((part) => (
                          <motion.button
                            key={part.id}
                            onClick={() => setSelectedBodyPart(part.id)}
                            className={cn(
                              "p-5 rounded-2xl border-2 text-left transition-all duration-300 group",
                              selectedBodyPart === part.id
                                ? "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300 shadow-xl scale-105"
                                : "bg-white border-gray-200 hover:border-blue-200 hover:shadow-lg hover:scale-102",
                            )}
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-4">
                              <motion.div
                                className={cn(
                                  "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300",
                                  selectedBodyPart === part.id
                                    ? `bg-gradient-to-r ${part.gradient} text-white shadow-lg`
                                    : "bg-gray-100 text-gray-600 group-hover:bg-gradient-to-r group-hover:from-blue-100 group-hover:to-purple-100",
                                )}
                                whileHover={{ rotate: 10 }}
                              >
                                {part.icon}
                              </motion.div>
                              <div>
                                <h3 className="font-semibold text-base text-gray-800">{part.name}</h3>
                                <p className="text-sm text-gray-500">{part.description}</p>
                              </div>
                            </div>
                            {/* {selectedBodyPart === part.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center justify-center"
                              >
                                <Badge variant="success">
                                  <Check className="h-3 w-3 mr-1" />
                                  Selected
                                </Badge>
                              </motion.div>
                            )} */}
                          </motion.button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Symptom Selection */}
            <AnimatePresence mode="wait">
              {selectedBodyPart && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card hover>
                    <CardHeader gradient>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          {/* <Activity className="mr-3 h-6 w-6 text-green-600" /> */}
                          Step 3: Select Symptoms
                        </CardTitle>
                        <Badge variant="outline" className="bg-white">
                          {selectedSymptoms.length} selected
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {petSymptomDatabase.symptoms[selectedBodyPart]?.map((symptom) => (
                          <motion.label
                            key={symptom.id}
                            className={cn(
                              "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group",
                              selectedSymptoms.includes(symptom.id)
                                ? "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300 shadow-md"
                                : "bg-white border-gray-200 hover:border-blue-200 hover:bg-blue-50",
                            )}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Checkbox
                              checked={selectedSymptoms.includes(symptom.id)}
                              onCheckedChange={() => toggleSymptom(symptom.id)}
                            />
                            <div className="flex-1">
                              <span
                                className={cn(
                                  "font-medium transition-colors",
                                  selectedSymptoms.includes(symptom.id) ? "text-blue-700" : "text-gray-700",
                                )}
                              >
                                {symptom.name}
                              </span>
                              {symptom.severity && (
                                <Badge variant={getSeverityBadgeVariant(symptom.severity)} className="ml-2 px-2 !py-[2px] font-medium text-xs">
                                  {symptom.severity}
                                </Badge>
                              )}
                            </div>
                            {selectedSymptoms.includes(symptom.id) && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-blue-500">
                                <Zap className="h-4 w-4" />
                              </motion.div>
                            )}
                          </motion.label>
                        ))}
                      </div>

                      {selectedSymptoms.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-8 text-center"
                        >
                          <Button onClick={analyzeSymptoms} disabled={isGptLoading} size="lg" className="px-14 text-base">
                            {isGptLoading ? (
                              <>
                                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                                Analyzing Symptoms...
                              </>
                            ) : (
                              <>
                                {/* <Sparkles className="mr-3 h-5 w-5" /> */}
                                Analyze {selectedSymptoms.length} Symptoms
                                <ArrowRight className="ml-3 h-5 w-5" />
                              </>
                            )}
                          </Button>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>

                  {/* AI Recommendation */}
                  {showResults && !isGptLoading && selectedSymptoms.length > 0 && (
                    <Card className={"mt-7"}>
                      <CardHeader gradient>
                        <CardTitle className="flex items-center gap-4">
                          {/* <Brain className="mr-3 h-6 w-6 text-purple-600" /> */}
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <Sparkles className="h-6 w-6 text-blue-600 mt-1" />
                          </motion.div>
                          AI-Powered Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-5">
                        <div className="">
                          <div className="flex items-start gap-4">
                            {/* <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <Sparkles className="h-6 w-6 text-blue-600 mt-1" />
                            </motion.div> */}
                            <div>
                              {/* <h3 className="font-bold text-blue-800 mb-2">Professional Recommendation</h3> */}
                              <p className="text-gray-700 leading-relaxed">
                                {gptResponse || "Analyzing your pet's symptoms..."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Sidebar */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {isGptLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader gradient>
                      <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
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
              {showResults && !isGptLoading && selectedSymptoms.length > 0 && (
                <motion.div
                  id="symptom-report"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >

                  {/* Matched Conditions */}
                  <Card>
                    <CardHeader gradient>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Stethoscope className="mr-3 h-6 w-6 text-green-600" />
                          Possible Conditions
                        </div>
                        <Badge variant="outline" className="bg-white">
                          {matchedConditions.length} matches
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {matchedConditions.length > 0 ? (
                        <div className="space-y-4">
                          {matchedConditions.map((condition, index) => (
                            <motion.div
                              key={condition.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-4 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200"
                            >
                              <div className="flex justify-between items-start mb-3">
                                <h3 className="font-semibold text-gray-800">{condition.name}</h3>
                                <Badge
                                  variant={condition.matchPercentage > 70 ? "warning" : "default"}
                                  className="ml-2 font-medium px-2 py-[2px]"
                                >
                                  {condition.matchPercentage}% match
                                </Badge>
                              </div>
                              <p className="text-gray-500 text-sm mb-4 leading-relaxed">{condition.description}</p>

                              <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-500">
                                  <span>Confidence Level</span>
                                  <span>{condition.matchPercentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                  <motion.div
                                    className={cn(
                                      "h-3 rounded-full",
                                      condition.matchPercentage > 75
                                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                        : condition.matchPercentage > 50
                                          ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                                          : condition.matchPercentage > 25
                                            ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                                            : "bg-gradient-to-r from-red-500 to-pink-500",
                                    )}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${condition.matchPercentage}%` }}
                                    transition={{ duration: 1, delay: index * 0.2 }}
                                  />
                                </div>
                              </div>

                              {condition.severity && (
                                <div className="mt-3">
                                  <Badge variant={getSeverityBadgeVariant(condition.severity)}>
                                    {condition.severity} severity
                                  </Badge>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center text-gray-500">
                          <Eye className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                          <p className="font-medium">No specific conditions identified</p>
                          <p className="text-sm">Please consult with a veterinarian</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <Card>
                    <CardHeader gradient>
                      <CardTitle className="flex items-center">
                        <Calendar className="mr-3 h-6 w-6 text-blue-600" />
                        Next Steps
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-3">
                      <Button variant="outline" className="w-full justify-start h-auto py-4 bg-transparent">
                        <MessageSquare className="h-5 w-5 text-blue-500 mr-3" />
                        <div className="text-left">
                          <div className="font-bold">Chat with a Vet</div>
                          <div className="text-xs text-gray-500">Get instant professional advice</div>
                        </div>
                      </Button>

                      <Button variant="outline" className="w-full justify-start h-auto py-4 bg-transparent">
                        <Calendar className="h-5 w-5 text-green-500 mr-3" />
                        <div className="text-left">
                          <div className="font-bold">Book Appointment</div>
                          <div className="text-xs text-gray-500">Schedule a visit with your vet</div>
                        </div>
                      </Button>

                      <Button
                        onClick={exportReport}
                        variant="outline"
                        className="w-full justify-start h-auto py-4 bg-transparent"
                      >
                        <Download className="h-5 w-5 text-purple-500 mr-3" />
                        <div className="text-left">
                          <div className="font-bold">Export Report</div>
                          <div className="text-xs text-gray-500">Download PDF for your records</div>
                        </div>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* History Card - Added back */}
            {selectedPet && (
              <Card>
                <CardHeader gradient>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-3 h-6 w-6 text-primary" />
                    History for {selectedPet.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {history.length > 0 ? (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {history.map((report, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-600">
                              {new Date(report.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                            <FileText className="h-4 w-4 text-gray-400" />
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {report.symptoms?.map((symptomGroup, i) => (
                              <Badge key={i} variant="outline" className="text-xs bg-white">
                                {symptomGroup.bodyPart}
                              </Badge>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p className="font-medium">No history found</p>
                      <p className="text-sm">Start analyzing symptoms to build history</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Tips Card */}
            {!showResults && !isGptLoading && (
              <Card>
                <CardHeader gradient>
                  <CardTitle className="flex items-center">
                    <ThumbsUp className="mr-3 h-6 w-6 text-green-600" />
                    Pro Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4 text-sm">
                    {[
                      "Be specific about when symptoms started",
                      "Note any changes in behavior or appetite",
                      "Consider recent environmental changes",
                      "Track symptom frequency and patterns",
                      "This tool supplements, not replaces, vet care",
                    ].map((tip, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-600 flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-gray-600 leading-relaxed">{tip}</span>
                      </motion.li>
                    ))}
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
