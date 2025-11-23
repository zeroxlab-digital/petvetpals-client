"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, ArrowRight, Calendar, Check, ChevronDown, Heart, Loader2, MessageSquare, ThumbsUp, Download, Sparkles, Activity, Clock, Shield, Target, TrendingUp, Zap, Eye, Droplets, Wind, Sun, Leaf, Home, AlertCircle, Bell, BarChart3, MapPin, Thermometer, SprayCanIcon as Spray, Settings, Smartphone, Database, Brain, Cpu, Wifi, Monitor, Plus, Minus, PawPrint, ShoppingCart, BookOpen, Info, Video, } from "lucide-react"
import Image from "next/image"
import html2pdf from "html2pdf.js"
import TagInput from "@/components/Common/TagInput/TagInput"
import { useGetAllergiesConditionsQuery, useGetMedicationsQuery, useGetPetsQuery } from "@/redux/services/petApi"
import { useGetAllergyCoachResponseMutation, useGetAllergyItchReportHistoryQuery, useSaveAllergyReportMutation } from "@/redux/services/allergyCoachApi"
import { HiOutlineFaceFrown } from "react-icons/hi2"
import { useRouter } from "next/navigation"

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
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95"

  const variants = {
    default:
      "bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:from-pink-700 hover:to-rose-700 shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-gray-200 bg-white hover:border-pink-300 text-gray-700 hover:text-pink-600 hover:bg-pink-50 shadow-sm hover:shadow-md",
    ghost: "hover:bg-gray-100 text-gray-700 hover:text-pink-600",
    success:
      "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl",
    warning:
      "bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600 shadow-lg hover:shadow-xl",
    danger:
      "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl",
  }

  const sizes = {
    default: "h-12 px-6 py-3 text-sm",
    sm: "h-10 px-4 py-2 text-xs",
    lg: "h-14 px-8 py-4 text-base",
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

// Card components
const Card = ({ className, children, hover = true, ...props }) => {
  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm",
        hover && "hover:shadow-xl hover:border-pink-200 transition-all duration-300",
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
        "flex flex-col space-y-1.5 p-6",
        gradient && "bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-2xl border-b border-gray-100",
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
    <h3 className={cn("text-xl font-bold leading-none tracking-tight text-gray-800", className)} {...props}>
      {children}
    </h3>
  )
}

const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  )
}

// Badge component
const Badge = ({ children, variant = "default", className, ...props }) => {
  const variants = {
    default: "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md",
    outline: "bg-white border-2 border-gray-200 text-gray-700 hover:border-pink-300",
    success: "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md",
    warning: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md",
    danger: "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md",
    info: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md",
    severe: "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md animate-pulse",
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

// Skeleton component
const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200", className)}
      {...props}
    />
  )
}

// Input component
const Input = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "flex h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:border-pink-300 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

// Slider component for severity rating
const Slider = ({ value, onValueChange, min = 0, max = 10, className, ...props }) => {
  return (
    <div className="relative w-full">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onValueChange(Number.parseInt(e.target.value))}
        className={cn("w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider", className)}
        {...props}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>No Itch</span>
        <span>Mild</span>
        <span>Moderate</span>
        <span>Severe</span>
        <span>Extreme</span>
      </div>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ec4899, #f43f5e);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ec4899, #f43f5e);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  )
}

// Step Indicator Component
const StepIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, title: "Pet Info", icon: <Heart className="h-4 w-4" /> },
    { number: 2, title: "Current Episode", icon: <AlertCircle className="h-4 w-4" /> },
    { number: 3, title: "Environment", icon: <Wind className="h-4 w-4" /> },
    { number: 4, title: "Care Plan", icon: <Sparkles className="h-4 w-4" /> },
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
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 border-pink-500 text-white shadow-lg"
                  : currentStep === step.number - 1
                    ? "border-pink-300 bg-pink-50 text-pink-600"
                    : "border-gray-200 bg-gray-50 text-gray-400",
              )}
              whileHover={{ scale: 1.1 }}
              animate={currentStep === step.number ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: currentStep === step.number ? 2 : 0 }}
            >
              {currentStep > step.number ? <Check className="h-5 w-5" /> : step.icon}
            </motion.div>
            <div className="ml-2 hidden sm:block">
              <p className={cn("text-sm font-medium", currentStep >= step.number ? "text-pink-600" : "text-gray-500")}>
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-8 h-0.5 mx-4 transition-all duration-300",
                  currentStep > step.number ? "bg-gradient-to-r from-pink-500 to-rose-500" : "bg-gray-200",
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AllergyItchCoach() {

  const router = useRouter();

  const { data: { pets } = {}, isLoading: petsLoading } = useGetPetsQuery();
  const [selectedPet, setSelectedPet] = useState(null)
  const { data: { allergiesConditions } = {}, isLoading: allergyConditionLoading } = useGetAllergiesConditionsQuery({ petId: selectedPet?._id }, { skip: !selectedPet?._id });
  const allergies = allergiesConditions?.filter(i => i.type == 'allergy').map(i => i.name);
  const { data: medications = {}, isLoading: medicationsLoading } = useGetMedicationsQuery({ petId: selectedPet?._id }, { skip: !selectedPet?._id });
  const currentMedications = medications?.medications?.filter((med) => med.is_ongoing === true).map(med => ({ name: med.medication, dosage: med.dosage })).map(i => i.name) || [];
  const [getAllergyCoachResponse, { isLoading: allergyCoachResLoading }] = useGetAllergyCoachResponseMutation();
  const [saveAllergyReport, { isLoading: saveReportLoading }] = useSaveAllergyReportMutation();
  const { data: history = {}, isLoading: historyLoading } = useGetAllergyItchReportHistoryQuery(selectedPet?._id, { skip: !selectedPet?._id });
  // console.log("history:", history);

  const [showPetMenu, setShowPetMenu] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [carePlan, setCarePlan] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Form data
  const [formData, setFormData] = useState({
    // Current Episode
    startDate: "",
    affectedAreas: [],
    severity: 5,
    visibleSigns: [],
    // Environment
    currentSeason: "",
    recentChanges: [],
    livingEnvironment: "",
    // Additional info
    currentMedications: [],
    knownAllergies: [],
    previousTreatments: "",
  })
  useEffect(() => {
    setFormData({
      // Current Episode
      startDate: "",
      affectedAreas: [],
      severity: 5,
      visibleSigns: [],
      // Environment
      currentSeason: "",
      recentChanges: [],
      livingEnvironment: "",
      // Additional info
      currentMedications: currentMedications.map(i => i),
      knownAllergies: allergies,
      previousTreatments: "",
    })
  }, [selectedPet, allergiesConditions, medications.medications])

  const mockProgressData = [
    { date: "2024-01-01", severity: 8, areas: 3, treatments: 2, notes: "Started new treatment plan" },
    { date: "2024-01-03", severity: 7, areas: 3, treatments: 2, notes: "Slight improvement in paw area" },
    { date: "2024-01-05", severity: 6, areas: 2, treatments: 2, notes: "Ears looking better" },
    { date: "2024-01-07", severity: 5, areas: 2, treatments: 2, notes: "Reduced scratching at night" },
    { date: "2024-01-10", severity: 4, areas: 2, treatments: 1, notes: "Significant improvement" },
    { date: "2024-01-12", severity: 3, areas: 1, treatments: 1, notes: "Almost back to normal" },
    { date: "2024-01-15", severity: 2, areas: 1, treatments: 1, notes: "Maintenance phase" },
  ]

  const progressDataFiltered = selectedPet ? mockProgressData : []

  // Body areas for itch episodes
  const bodyAreas = [
    { id: "ears", name: "Ears", icon: <Eye className="h-5 w-5" /> },
    { id: "paws", name: "Paws", icon: <Target className="h-5 w-5" /> },
    { id: "abdomen", name: "Abdomen", icon: <Heart className="h-5 w-5" /> },
    { id: "back", name: "Back", icon: <Shield className="h-5 w-5" /> },
    { id: "face", name: "Face", icon: <Eye className="h-5 w-5" /> },
    { id: "legs", name: "Legs", icon: <Activity className="h-5 w-5" /> },
    { id: "tail", name: "Tail", icon: <Zap className="h-5 w-5" /> },
    { id: "chest", name: "Chest", icon: <Heart className="h-5 w-5" /> },
  ]

  // Visible signs
  const visibleSigns = [
    { id: "redness", name: "Redness", severity: "moderate" },
    { id: "hair_loss", name: "Hair Loss", severity: "high" },
    { id: "scabs", name: "Scabs", severity: "high" },
    { id: "odor", name: "Bad Odor", severity: "moderate" },
    { id: "dandruff", name: "Dandruff", severity: "low" },
    { id: "fleas", name: "Fleas Seen", severity: "high" },
    { id: "swelling", name: "Swelling", severity: "high" },
    { id: "discharge", name: "Discharge", severity: "moderate" },
    { id: "hot_spots", name: "Hot Spots", severity: "high" },
    { id: "excessive_licking", name: "Excessive Licking", severity: "moderate" },
  ]

  // Seasons
  const seasons = [
    { id: "spring", name: "Spring", icon: <Leaf className="h-5 w-5" /> },
    { id: "summer", name: "Summer", icon: <Sun className="h-5 w-5" /> },
    { id: "fall", name: "Fall", icon: <Wind className="h-5 w-5" /> },
    { id: "winter", name: "Winter", icon: <Thermometer className="h-5 w-5" /> },
  ]

  // Recent changes
  const recentChanges = [
    // Diet
    { id: "new_food", name: "New Food/Treats", category: "diet" },
    { id: "new_treat", name: "New Treats/Supplements", category: "diet" },
    { id: "new_water_source", name: "New Water Source", category: "diet" },
    { id: "new_supplement", name: "New Vitamin/Supplement", category: "diet" },

    // Grooming
    { id: "new_shampoo", name: "New Shampoo", category: "grooming" },
    { id: "new_conditioner", name: "New Conditioner", category: "grooming" },
    { id: "flea_treatment", name: "Flea/Tick Treatment", category: "grooming" },
    { id: "grooming_frequency", name: "Change in Grooming Frequency", category: "grooming" },

    // Environment
    { id: "new_detergent", name: "New Detergent", category: "environment" },
    { id: "new_carpet", name: "New Carpet/Furniture", category: "environment" },
    { id: "construction", name: "Construction/Dust Exposure", category: "environment" },
    { id: "seasonal_change", name: "Seasonal Change / Humidity Shift", category: "environment" },

    // Medical
    { id: "new_medication", name: "New Medication", category: "medical" },
    { id: "new_vaccine", name: "Recent Vaccination", category: "medical" },
    { id: "parasite_prevention", name: "Flea/Tick/Worming Medication", category: "medical" },

    // Behavioral
    { id: "stress", name: "Stressful Event", category: "behavioral" },
    { id: "move", name: "Change in Living Situation", category: "behavioral" },
    { id: "new_person_in_home", name: "New Person or Pet in Household", category: "behavioral" },
    { id: "vet_visit", name: "Stressful Vet Visit", category: "behavioral" },
  ];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleArrayItem = (field, item) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item) ? prev[field].filter((i) => i !== item) : [...prev[field], item],
    }))
  }

  const getSeverityColor = (severity) => {
    if (severity <= 2) return "text-green-600 bg-green-100"
    if (severity <= 4) return "text-yellow-600 bg-yellow-100"
    if (severity <= 6) return "text-orange-600 bg-orange-100"
    if (severity <= 8) return "text-red-600 bg-red-100"
    return "text-red-700 bg-red-200"
  }

  const getSeverityLabel = (severity) => {
    if (severity <= 2) return "Mild"
    if (severity <= 4) return "Moderate"
    if (severity <= 6) return "Concerning"
    if (severity <= 8) return "Severe"
    return "Critical"
  }

  const getSignSeverityVariant = (severity) => {
    switch (severity) {
      case "high":
        return "danger"
      case "moderate":
        return "warning"
      case "low":
        return "info"
      default:
        return "outline"
    }
  }

  const calculateTrends = (data) => {
    if (data.length < 2) return { severity: 0, improvement: 0 }

    const recent = data.slice(-3)
    const older = data.slice(0, 3)

    const recentAvg = recent.reduce((sum, entry) => sum + entry.severity, 0) / recent.length
    const olderAvg = older.reduce((sum, entry) => sum + entry.severity, 0) / older.length

    return {
      severity: (((recentAvg - olderAvg) / olderAvg) * 100).toFixed(1),
      improvement: recentAvg < olderAvg ? "improving" : recentAvg > olderAvg ? "worsening" : "stable",
    }
  }

  const generateCarePlan = async () => {
    if (!selectedPet) {
      alert("Please select a pet first.")
      return
    }

    setIsGenerating(true)
    try {

      const pet = { type: selectedPet.type, name: selectedPet.name, breed: selectedPet.breed, gender: selectedPet.gender, age: selectedPet.age }
      const { data } = await getAllergyCoachResponse({
        pet,
        ...formData
      })
      setCarePlan(data?.coach_response)
      setCurrentStep(4)
      if (data?.success && data?.coach_response) {
        await saveAllergyReport({
          pet: selectedPet._id,
          episode: {
            length: (new Date() - new Date(formData.startDate)) / (1000 * 60 * 60 * 24),
            affected_areas: formData.affectedAreas,
            severity: formData.severity,
            visible_signs: formData.visibleSigns,
          }
        })
      }
    } catch (err) {
      console.error("Error generating care plan:", err)
      alert("Something went wrong while generating the care plan.")
    } finally {
      setIsGenerating(false)
    }
  }

  const exportPlan = () => {
    const element = document.getElementById("allergy-care-plan")
    if (!element) {
      alert("Nothing to export.")
      return
    }
    html2pdf().set({ margin: 0.5, filename: "allergy_care_plan.pdf" }).from(element).save()
  }

  const canProceedToStep = (step) => {
    switch (step) {
      case 2:
        return selectedPet
      case 3:
        return selectedPet && formData.startDate && formData.affectedAreas.length > 0
      case 4:
        return selectedPet && formData.startDate && formData.affectedAreas.length > 0 && formData.currentSeason
      default:
        return true
    }
  }

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="p-4 bg-gradient-to-r from-pink-600 to-rose-600 rounded-3xl shadow-xl max-md:hidden"
              // whileHover={{ rotate: 360 }}
              // transition={{ duration: 0.6 }}
            >
              <Shield className="h-10 w-10 text-white" />
            </motion.div>
            <div>
              <h1 className="text-5xl max-md:text-3xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 bg-clip-text text-transparent">
                Allergy & Itch Coach
              </h1>
              <Badge className="mt-2">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered Relief
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={4} />

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Pet Selection */}
            <Card hover>
              <CardHeader gradient>
                <CardTitle className="flex items-center">
                  <Heart className="mr-3 h-6 w-6 text-pink-600" />
                  Step 1: Select Your Pet
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="relative">
                  <Button
                    variant="outline"
                    onClick={() => setShowPetMenu(!showPetMenu)}
                    className="w-full flex items-center justify-between gap-3 h-auto py-4 max-md:py-3 max-md:px-3"
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
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-3 border-pink-200 shadow-lg">
                          <Image
                            src={selectedPet.image || "/images/paw-heart.webp"}
                            alt={selectedPet.name}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-gray-800">{selectedPet.name}</p>
                          <p className="text-gray-500 text-sm font-medium">{selectedPet.breed}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 flex items-center justify-center">
                          <PawPrint className="h-5 w-5 md:w-6 md:h-6 text-pink-600" />
                        </div>
                        <div className="text-start">
                          <p className="font-semibold text-gray-800">Select Pet</p>
                          <span className="text-[13px] sm:text-sm font-normal text-gray-600">Get instant allergy assesment</span>
                        </div>
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
                        className="w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 max-h-80 overflow-y-auto"
                      >
                        {pets.map((pet) => (
                          <motion.button
                            key={pet._id}
                            className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 rounded-xl transition-all duration-200"
                            onClick={() => {
                              setSelectedPet(pet)
                              setShowPetMenu(false)
                            }}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-pink-100 shadow-md">
                              <Image
                                src={pet.image || "/images/paw-heart.webp"}
                                alt={pet.name}
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-gray-800">{pet.name}</p>
                              <p className="text-gray-500 text-sm font-medium">{pet.breed}</p>
                            </div>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {selectedPet && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-center"
                  >
                    <Button
                      onClick={() => setCurrentStep(2)}
                      disabled={!canProceedToStep(2)}
                      size="lg"
                      className="px-8"
                    >
                      Continue to Episode
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Step 2: Current Itch Episode */}
            <AnimatePresence mode="wait">
              {currentStep >= 2 && selectedPet && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card hover>
                    <CardHeader gradient>
                      <CardTitle className="flex items-center">
                        <AlertCircle className="mr-3 h-6 w-6 text-rose-600" />
                        Step 2: Current Itch Episode
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      {/* Start Date */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          When did this episode start?
                        </label>
                        <Input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => updateFormData("startDate", e.target.value)}
                          className={'w-full'}
                        />
                      </div>

                      {/* Affected Body Areas */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-4">
                          Which body areas are affected? (select all that apply)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {bodyAreas.map((area) => (
                            <motion.button
                              key={area.id}
                              onClick={() => toggleArrayItem("affectedAreas", area.id)}
                              className={cn(
                                "p-4 rounded-xl border-2 text-center transition-all duration-200",
                                formData.affectedAreas.includes(area.id)
                                  ? "bg-gradient-to-r from-pink-50 to-rose-50 border-pink-300 text-pink-700"
                                  : "bg-white border-gray-200 text-gray-700 hover:border-pink-200",
                              )}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex flex-col items-center gap-2">
                                <div
                                  className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center",
                                    formData.affectedAreas.includes(area.id)
                                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                                      : "bg-gray-100 text-gray-600",
                                  )}
                                >
                                  {area.icon}
                                </div>
                                <span className="text-sm font-medium">{area.name}</span>
                                {/* {formData.affectedAreas.includes(area.id) && (
                                  <Check className="h-4 w-4 text-pink-600" />
                                )} */}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Severity Scale */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-4">
                          Itch Severity (0 = No itch, 10 = Extreme)
                        </label>
                        <div className="space-y-4">
                          <Slider
                            value={formData.severity}
                            onValueChange={(value) => updateFormData("severity", value)}
                            min={0}
                            max={10}
                          />
                          <div className="flex items-center justify-center">
                            <div
                              className={cn(
                                "px-6 py-3 rounded-xl font-bold text-lg",
                                getSeverityColor(formData.severity),
                              )}
                            >
                              {formData.severity}/10 - {getSeverityLabel(formData.severity)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Visible Signs */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-4">
                          Visible Signs (select all that you observe)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {visibleSigns.map((sign) => (
                            <motion.button
                              key={sign.id}
                              onClick={() => toggleArrayItem("visibleSigns", sign.id)}
                              className={cn(
                                "p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 flex items-center justify-between",
                                formData.visibleSigns.includes(sign.id)
                                  ? "bg-gradient-to-r from-pink-50 to-rose-50 border-pink-300 text-pink-700"
                                  : "bg-white border-gray-200 text-gray-700 hover:border-pink-200",
                              )}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span>{sign.name}</span>
                              <div className="flex items-center gap-2">
                                <Badge variant={getSignSeverityVariant(sign.severity)} className="text-xs max-sm:font-normal max-sm:px-1 max-sm:py-0.5">
                                  {sign.severity}
                                </Badge>
                                {/* {formData.visibleSigns.includes(sign.id) && <Check className="h-4 w-4" />} */}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {canProceedToStep(3) && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center pt-4"
                        >
                          <Button onClick={() => setCurrentStep(3)} size="lg" className="px-8">
                            Continue to Environment
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Environment */}
            <AnimatePresence mode="wait">
              {currentStep >= 3 && canProceedToStep(3) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card hover>
                    <CardHeader gradient>
                      <CardTitle className="flex items-center">
                        <Wind className="mr-3 h-6 w-6 text-orange-600" />
                        Step 3: Environment & Recent Changes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      {/* Current Season */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-4">Current Season</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {seasons.map((season) => (
                            <motion.button
                              key={season.id}
                              onClick={() => updateFormData("currentSeason", season.id)}
                              className={cn(
                                "p-4 rounded-xl border-2 text-center transition-all duration-300",
                                formData.currentSeason === season.id
                                  ? "bg-gradient-to-br from-pink-50 to-rose-50 border-pink-300 shadow-lg"
                                  : "bg-white border-gray-200 hover:border-pink-200 hover:shadow-md",
                              )}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex flex-col items-center gap-2">
                                <div
                                  className={cn(
                                    "w-12 h-12 rounded-lg flex items-center justify-center",
                                    formData.currentSeason === season.id
                                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                                      : "bg-gray-100 text-gray-600",
                                  )}
                                >
                                  {season.icon}
                                </div>
                                <span className="font-medium">{season.name}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Recent Changes */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-4">
                          Recent Changes (past 2-4 weeks)
                        </label>
                        <div className="space-y-3">
                          {Object.entries(
                            recentChanges.reduce((acc, change) => {
                              if (!acc[change.category]) acc[change.category] = []
                              acc[change.category].push(change)
                              return acc
                            }, {}),
                          ).map(([category, changes]) => (
                            <div key={category} className="space-y-2">
                              <h4 className="font-medium text-gray-800 capitalize">{category}</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {changes.map((change) => (
                                  <motion.button
                                    key={change.id}
                                    onClick={() => toggleArrayItem("recentChanges", change.id)}
                                    className={cn(
                                      "p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 text-left",
                                      formData.recentChanges.includes(change.id)
                                        ? "bg-gradient-to-r from-pink-50 to-rose-50 border-pink-300 text-pink-700"
                                        : "bg-white border-gray-200 text-gray-700 hover:border-pink-200",
                                    )}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span>{change.name}</span>
                                      {formData.recentChanges.includes(change.id) && (
                                        <Check className="h-4 w-4 text-pink-600" />
                                      )}
                                    </div>
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Additional Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TagInput
                          label="Current Medications"
                          placeholder="e.g., Apoquel, Benadryl"
                          value={formData.currentMedications}
                          onChange={(newArray) => updateFormData("currentMedications", newArray)}
                        />
                        <TagInput
                          label="Known Allergies"
                          placeholder="e.g., Chicken, Dust, Pollen"
                          value={formData.knownAllergies}
                          onChange={(newArray) => updateFormData("knownAllergies", newArray)}
                        />
                      </div>

                      {canProceedToStep(4) && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center pt-4"
                        >
                          <Button onClick={generateCarePlan} disabled={isGenerating} size="lg" className="px-12">
                            {isGenerating ? (
                              <>
                                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                                Generating Care Plan
                              </>
                            ) : (
                              <>
                                <Sparkles className="mr-3 h-5 w-5" />
                                Generate Care Plan
                                {/* <ArrowRight className="ml-3 h-5 w-5" /> */}
                              </>
                            )}
                          </Button>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 4: Care Plan Results */}
            {currentStep >= 4 && !carePlan &&
              <div className="flex flex-col items-center justify-center gap-4 text-center py-12 px-4 bg-red-50 border rounded-2xl animate-fadeIn">
                <div className="flex items-center justify-center w-20 h-20 bg-red-100 rounded-full shadow-inner animate-bounce">
                  <HiOutlineFaceFrown className="text-5xl text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Oops! Our stupid coach couldn&apos;t create your relief plan
                </h3>
                <p className="text-gray-600 text-sm max-w-md">
                  Our AI hit a hiccup while preparing your pet&apos;s allergy/itch relief plan. Please review your inputs and try again — we&apos;ll get it right next time!
                </p>
              </div>
            }
            <AnimatePresence mode="wait">
              {currentStep >= 4 && carePlan && (
                <motion.div
                  id="allergy-care-plan"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 max-w-max"
                >
                  {/* Urgency Assessment */}
                  <Card>
                    <CardHeader gradient>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Target className="mr-3 h-6 w-6 text-pink-600" />
                          Care Plan Assessment
                        </div>
                        <Badge
                          variant={
                            carePlan.urgencyLevel === "urgent"
                              ? "danger"
                              : carePlan.urgencyLevel === "moderate"
                                ? "warning"
                                : "success"
                          }
                        >
                          {carePlan.urgencyLevel.toUpperCase()} CARE
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {carePlan.vetConsultation && (
                        <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200 mb-6">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                            <div>
                              <h3 className="font-bold text-red-800">Veterinary Consultation Recommended</h3>
                              <p className="text-red-700 text-sm">
                                Based on the severity and symptoms, please schedule a vet visit within 24-48 hours.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl">
                          <div className="text-2xl font-bold text-pink-600">{formData.severity}/10</div>
                          <div className="text-sm text-gray-600">Severity Level</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                          <div className="text-2xl font-bold text-blue-600">{formData.affectedAreas.length}</div>
                          <div className="text-sm text-gray-600">Affected Areas</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                          <div className="text-2xl font-bold text-green-600">{formData.visibleSigns.length}</div>
                          <div className="text-sm text-gray-600">Visible Signs</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Immediate Actions */}
                  <Card>
                    <CardHeader gradient>
                      <CardTitle className="flex items-center">
                        <Zap className="mr-3 h-6 w-6 text-orange-600" />
                        Immediate Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        {carePlan.immediateActions.map((action, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200"
                          >
                            <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-gray-700 leading-relaxed">{action}</p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Home Care Tips */}
                  <Card>
                    <CardHeader gradient>
                      <CardTitle className="flex items-center">
                        <Home className="mr-3 h-6 w-6 text-green-600" />
                        Home Care Guidelines
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        {carePlan.homeCareTips.map((category, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white">
                                {category.icon}
                              </div>
                              <h3 className="font-bold text-gray-800">{category.category}</h3>
                            </div>
                            <ul className="space-y-2">
                              {category.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="flex items-start gap-2 text-sm text-gray-700">
                                  <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Product Recommendations */}
                  <Card>
                    <CardHeader gradient>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Spray className="mr-3 h-6 w-6 text-purple-600" />
                          Recommended Products
                        </div>
                        <Badge variant="info">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Affiliate Partners
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {carePlan.productRecommendations.map((product, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-bold text-gray-800">{product.name}</h3>
                                <Badge variant="outline" className="text-xs mt-1">
                                  {product.type}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <p className="text-xl font-bold text-green-600">{product.price}</p>
                                {/* {product.affiliate && (
                                  <Badge variant="info" className="text-xs">
                                    Affiliate
                                  </Badge>
                                )} */}
                              </div>
                            </div>
                            <p className="text-gray-600 mb-3">{product.reason}</p>
                            <Button variant="primary" className="w-full bg-primary text-white">
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              View Product & Buy Now
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Things to Avoid */}
                  <Card>
                    <CardHeader gradient>
                      <CardTitle className="flex items-center">
                        <AlertCircle className="mr-3 h-6 w-6 text-red-600" />
                        Things to Avoid
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                        <div className="flex flex-wrap gap-2">
                          {carePlan.avoidanceList.map((item, index) => (
                            <Badge key={index} variant="danger">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              {item}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-red-700 mt-3">
                          Avoiding these items can help prevent worsening of symptoms and promote faster healing.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Follow-up Schedule */}
                  <Card>
                    <CardHeader gradient>
                      <CardTitle className="flex items-center">
                        <Calendar className="mr-3 h-6 w-6 text-blue-600" />
                        Follow-up Schedule
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {carePlan.followUpSchedule.map((followUp, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200"
                          >
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                              <Clock className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-800">{followUp.timeframe}</p>
                              <p className="text-sm text-gray-600">{followUp.action}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Rationale */}
                  {carePlan.rationale && (
                    <Card>
                      <CardHeader gradient>
                        <CardTitle className="flex items-center">
                          <Info className="mr-3 h-6 w-6 text-teal-600" />
                          Rationale
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="text-gray-700 text-base">{carePlan.rationale}</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Educational Info */}
                  {carePlan.educationalInfo && carePlan.educationalInfo.length > 0 && (
                    <Card>
                      <CardHeader gradient>
                        <CardTitle className="flex items-center">
                          <BookOpen className="mr-3 h-6 w-6 text-indigo-600" />
                          Educational Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="text-gray-700 text-base space-y-2">
                          {carePlan.educationalInfo.map((info, index) => (
                            <span key={index} className="block mb-2">{info}</span>
                          ))}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Action Buttons */}
                  <Card>
                    <CardHeader gradient>
                      <CardTitle className="flex items-center">
                        <Bell className="mr-3 h-6 w-6 text-green-600" />
                        Next Steps
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-3">
                      <Button
                        onClick={exportPlan}
                        variant="outline"
                        className="w-full justify-start h-auto py-4 bg-transparent"
                      >
                        <Download className="h-5 w-5 text-purple-500 mr-3" />
                        <div className="text-left">
                          <div className="font-bold">Download Care Plan</div>
                          <div className="text-xs text-gray-500">Save PDF for your records</div>
                        </div>
                      </Button>

                      <Button onClick={() => router.push("/vet-appointment")} variant="outline" className="w-full justify-start h-auto py-4 bg-transparent">
                        <Video className="h-5 w-5 text-blue-500 mr-3" />
                        <div className="text-left">
                          <div className="font-bold">Consult a Vet</div>
                          <div className="text-xs text-gray-500">Get professional guidance</div>
                        </div>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-0 z-10 h-fit">
            {/* Real-time Monitoring */}
            {selectedPet && currentStep >= 2 && (
              <Card>
                <CardHeader gradient>
                  <CardTitle className="flex items-center">
                    <Monitor className="mr-3 h-6 w-6 text-blue-600" />
                    Real-time Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Current Severity</span>
                      <div className="flex items-center gap-2">
                        <div className={cn("w-3 h-3 rounded-full", getSeverityColor(formData.severity))} />
                        <Badge
                          variant={formData.severity >= 7 ? "danger" : formData.severity >= 4 ? "warning" : "success"}
                        >
                          {formData.severity}/10
                        </Badge>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Episode Duration</span>
                      <Badge variant="outline">
                        {formData.startDate
                          ? Math.ceil((new Date() - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) + " days"
                          : "Not set"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Allergy History */}
            {selectedPet && (
              <Card>
                <CardHeader gradient>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-3 h-6 w-6 text-orange-600" />
                    Allergy History
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {historyLoading ? (
                    <div>
                      <Skeleton className="h-28 w-full mb-4" />
                    </div>
                  )
                    :
                    <>
                      {history?.reports?.length > 0 ? (
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {history.reports.map((report, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="p-4 bg-gradient-to-r from-gray-50 to-pink-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-gray-600">
                                  {new Date(report.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                                <Badge
                                  variant={
                                    Number(report.episode.severity) >= 7
                                      ? "danger"
                                      : Number(report.episode.severity) >= 4
                                        ? "warning"
                                        : "success"
                                  }
                                  className="text-xs"
                                >
                                  {Number(report.episode.severity)}/10
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-gray-700 text-sm">Episode length</p>
                                <p className="text-gray-800 text-sm font-semibold">{report.episode.length.split(".").slice(0, 1)} days</p>
                              </div>
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-gray-700 text-sm">Affected areas</p>
                                <div className="flex gap-0.5 justify-end">
                                  {report.episode.affected_areas.map((area, i) => (
                                    <Badge key={i} variant="outline" className="font-semibold text-xs bg-white capitalize">
                                      {area}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {report.episode.visible_signs.map((sign, i) => (
                                  <Badge key={i} variant="info" className="font-semibold text-xs capitalize">
                                    {sign.replace(/_/g, " ")}
                                  </Badge>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <BarChart3 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                          <p className="font-medium">No allergy history</p>
                          <p className="text-sm">Start tracking episodes to identify patterns</p>
                        </div>
                      )}
                    </>
                  }
                </CardContent>
              </Card>
            )}

            {/* Quick Tips */}
            <Card>
              <CardHeader gradient>
                <CardTitle className="flex items-center">
                  <ThumbsUp className="mr-3 h-6 w-6 text-green-600" />
                  Quick Relief Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4 text-sm">
                  {[
                    "Cool compresses can provide immediate itch relief",
                    "Keep nails trimmed to prevent scratching damage",
                    "Use hypoallergenic, fragrance-free products",
                    "Document symptoms with photos for vet visits",
                    "Track patterns to identify triggers",
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

            {/* Current Episode Summary */}
            {selectedPet && currentStep >= 2 && (
              <Card>
                <CardHeader gradient>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-3 h-6 w-6 text-blue-600" />
                    Episode Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Start Date</span>
                      <Badge variant="outline">{formData.startDate || "Not set"}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Severity</span>
                      <Badge
                        variant={formData.severity >= 7 ? "danger" : formData.severity >= 4 ? "warning" : "success"}
                      >
                        {formData.severity}/10
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Affected Areas</span>
                      <Badge variant="info">{formData.affectedAreas.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Visible Signs</span>
                      <Badge variant="warning">{formData.visibleSigns.length}</Badge>
                    </div>
                    {formData.currentSeason && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Season</span>
                        <Badge variant="outline" className="capitalize">
                          {formData.currentSeason}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Trigger Tracker */}
            {selectedPet && formData.recentChanges.length > 0 && (
              <Card>
                <CardHeader gradient>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-3 h-6 w-6 text-purple-600" />
                    Potential Triggers
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    {formData.recentChanges.map((changeId, index) => {
                      const change = recentChanges.find((c) => c.id === changeId)
                      return (
                        <motion.div
                          key={changeId}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg"
                        >
                          <span className="text-sm text-gray-700">{change?.name}</span>
                          <Badge variant="outline" className="text-xs capitalize">
                            {change?.category}
                          </Badge>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}