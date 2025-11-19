"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, ArrowRight, Brain, Calendar, Check, ChevronDown, Heart, Loader2, MessageSquare, ThumbsUp, Download, Sparkles, Activity, Clock, FileText, Utensils, Scale, Target, Award, ShoppingCart, AlertCircle, Leaf, Star, Timer, TrendingUp, Coffee, Fish, Beef, Carrot, PawPrint, CheckCircle } from "lucide-react"
import Image from "next/image"
import html2pdf from "html2pdf.js"
import { useGetAllergiesConditionsQuery, useGetPetsQuery } from "@/redux/services/petApi"
import { useGetNutritionistGptMutation } from "@/redux/services/NutritionistApi"
import { HiFaceFrown, HiOutlineFaceFrown } from "react-icons/hi2"
import TagInput from "@/components/Common/TagInput/TagInput"
import { useRouter } from "next/navigation"

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
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95"

  const variants = {
    default:
      "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-gray-200 bg-white hover:border-green-300 text-gray-700 hover:text-green-600 hover:bg-green-50 shadow-sm hover:shadow-md",
    ghost: "hover:bg-gray-100 text-gray-700 hover:text-green-600",
    success:
      "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl",
    warning:
      "bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600 shadow-lg hover:shadow-xl",
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

// Enhanced Card components
const Card = ({ className, children, hover = true, ...props }) => {
  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm",
        hover && "hover:shadow-xl hover:border-green-200 transition-all duration-300",
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
        gradient && "bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-2xl border-b border-gray-100",
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

// Enhanced Badge component
const Badge = ({ children, variant = "default", className, ...props }) => {
  const variants = {
    default: "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md",
    outline: "bg-white border-2 border-gray-200 text-gray-700 hover:border-green-300",
    success: "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md",
    warning: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md",
    premium: "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md",
    affiliate: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md",
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

// Input component
const Input = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "flex h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-300 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

// Select component
const Select = ({ children, value, onValueChange, className, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || "")

  const handleSelect = (newValue) => {
    setSelectedValue(newValue)
    onValueChange?.(newValue)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm transition-colors hover:border-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500",
          className,
        )}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        <span className={selectedValue ? "text-gray-900" : "text-gray-500"}>{selectedValue || "Select an option"}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto"
          >
            {children?.map((child, index) => (
              <button
                key={index}
                className="w-full px-4 py-3 text-left hover:bg-green-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                onClick={() => handleSelect(child.props.value)}
              >
                {child.props.children}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const SelectItem = ({ value, children }) => {
  return <div value={value}>{children}</div>
}

// Step Indicator Component
const StepIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, title: "Pet Info", icon: <Heart className="h-4 w-4" /> },
    { number: 2, title: "Health & Activity", icon: <Activity className="h-4 w-4" /> },
    { number: 3, title: "Diet Analysis", icon: <Utensils className="h-4 w-4" /> },
    { number: 4, title: "Nutrition Plan", icon: <Sparkles className="h-4 w-4" /> },
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
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 text-white shadow-lg"
                  : currentStep === step.number - 1
                    ? "border-green-300 bg-green-50 text-green-600"
                    : "border-gray-200 bg-gray-50 text-gray-400",
              )}
              whileHover={{ scale: 1.1 }}
              animate={currentStep === step.number ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: currentStep === step.number ? 2 : 0 }}
            >
              {currentStep > step.number ? <Check className="h-5 w-5" /> : step.icon}
            </motion.div>
            <div className="ml-2 hidden sm:block">
              <p className={cn("text-sm font-medium", currentStep >= step.number ? "text-green-600" : "text-gray-500")}>
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-8 h-0.5 mx-4 transition-all duration-300",
                  currentStep > step.number ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gray-200",
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PetNutritionist() {
  // Activity levels
  const activityLevels = [
    { value: "low", label: "Low - Mostly indoor, minimal exercise", icon: <Coffee className="h-4 w-4" /> },
    { value: "moderate", label: "Moderate - Daily walks, some play", icon: <Activity className="h-4 w-4" /> },
    { value: "high", label: "High - Very active, lots of exercise", icon: <TrendingUp className="h-4 w-4" /> },
    { value: "working", label: "Working - Working dog, intense activity", icon: <Target className="h-4 w-4" /> },
  ]

  // Medical conditions
  const [medicalConditions, setMedicalConditions] = useState([
    "Dental Disease",
    "Ear Infections",
    "Skin Allergies",
    "Obesity",
    "Arthritis",
    "Urinary Tract Infections",
    "Kidney Disease",
    "Heart Disease",
    "Gastrointestinal Issues",
    "Fleas and Parasites",
    "Respiratory Infections",
  ]);

  // Treatment goals
  const treatmentGoals = [
    "Weight Loss",
    "Weight Gain",
    "Muscle Maintenance",
    "Joint Health Support",
    "Digestive Health",
    "Skin & Coat Health",
    "Energy Boost",
    "Senior Support",
    "Growth & Development",
    "Immune System Support",
    "General Maintenance",
  ];

  // Current symptoms
  const [currentSymptoms, setCurrentSymptoms] = useState([
    "Itching / Scratching",
    "Vomiting",
    "Diarrhea",
    "Lethargy / Low Energy",
    "Loss of Appetite",
    "Eye Discharge / Redness",
    "Sneezing / Nasal Discharge",
    "Coughing",
    "Limping / Stiffness",
    "Excessive Thirst",
    "Excessive Licking"
  ]);

  const router = useRouter();

  const { data: { pets } = {}, isLoading: petsLoading } = useGetPetsQuery();
  const [selectedPet, setSelectedPet] = useState(null)
  console.log("pet:", selectedPet);
  const { data: { allergiesConditions } = {}, isLoading: allergyConditionLoading } = useGetAllergiesConditionsQuery({ petId: selectedPet?._id }, { skip: !selectedPet?._id });
  const allergies = allergiesConditions?.filter(i => i.type == 'allergy').map(i => i.name);
  const conditions = allergiesConditions?.filter(i => i.type == 'condition').map(i => ({ name: i.name, severity: i.severity, diagnosed_date: i.diagnosedDate, description: i.description })) || [];

  // Get Nutritionist GPT Response
  const [getNutritionistGpt, { isLoading: nutritionPlanLoading }] = useGetNutritionistGptMutation();

  // Add condition to medical condition if the pet already have it
  useEffect(() => {
    if (conditions.length > 0) {
      const conditionNames = conditions.map(c => c.name);
      const updatedMedicalConditions = Array.from(new Set([...medicalConditions, ...conditionNames]));

      // Only update if different
      if (updatedMedicalConditions.join() !== medicalConditions.join()) {
        setMedicalConditions(updatedMedicalConditions);
      }
    }
  }, [conditions, selectedPet]);


  const [showPetMenu, setShowPetMenu] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [nutritionPlan, setNutritionPlan] = useState(null);
  console.log("Nutrtion Plan:", nutritionPlan);
  const [isGenerating, setIsGenerating] = useState(false)

  // Form data
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    activityLevel: "",
    medicalConditions: [],
    currentSymptoms: [],
    currentDiet: [],
    allergies: [],
    treatmentGoals: [],
  })
  useEffect(() => {
    setFormData({
      age: selectedPet?.age || '',
      weight:
        selectedPet?.weight?.reduce((latest, current) => {
          return new Date(current.date) > new Date(latest.date) ? current : latest
        }).value || 0,
      activityLevel: "",
      medicalConditions: conditions.map(c => c.name),
      currentSymptoms: [],
      currentDiet: [],
      allergies: allergies,
      treatmentGoals: [],
    })
  }, [allergiesConditions, selectedPet])
  console.log("Form data:", formData);


  const mockNutritionHistory = [
    // {
    //   createdAt: new Date().toISOString(),
    //   goals: ["Weight Loss", "Joint Health"],
    // },
    // {
    //   createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    //   goals: ["Maintenance", "Skin Health"],
    // },
  ]

  // Mock functions
  // const mockGetNutritionRecommendation = async (data) => {
  //   await new Promise((resolve) => setTimeout(resolve, 3000)) // Simulate API delay
  //   return {
  //     data: {
  //       dailyCalories: 850,
  //       proteinNeeds: "25-30%",
  //       fatNeeds: "12-15%",
  //       carbNeeds: "45-50%",
  //       feedingSchedule: [
  //         { time: "7:00 AM", portion: "1/2 cup", meal: "Breakfast" },
  //         { time: "12:00 PM", portion: "1/4 cup", meal: "Lunch" },
  //         { time: "6:00 PM", portion: "1/2 cup", meal: "Dinner" },
  //       ],
  //       recommendedIngredients: [
  //         { name: "Chicken", type: "Protein", benefit: "High-quality protein for muscle maintenance" },
  //         { name: "Sweet Potato", type: "Carbohydrate", benefit: "Complex carbs for sustained energy" },
  //         { name: "Salmon Oil", type: "Fat", benefit: "Omega-3 for skin and coat health" },
  //         { name: "Blueberries", type: "Antioxidant", benefit: "Immune system support" },
  //       ],
  //       avoidIngredients: ["Chocolate", "Grapes", "Onions", "Garlic", "Xylitol"],
  //       brandRecommendations: [
  //         {
  //           name: "Royal Canin Breed Health Nutrition",
  //           price: "$45.99",
  //           rating: 4.8,
  //           affiliate: true,
  //           reason: "Breed-specific formula with optimal nutrition",
  //         },
  //         {
  //           name: "Hill's Science Diet Adult",
  //           price: "$52.99",
  //           rating: 4.7,
  //           affiliate: true,
  //           reason: "Veterinarian recommended for overall health",
  //         },
  //         {
  //           name: "Blue Buffalo Life Protection",
  //           price: "$38.99",
  //           rating: 4.6,
  //           affiliate: true,
  //           reason: "Natural ingredients with LifeSource Bits",
  //         },
  //       ],
  //     },
  //   }
  // }

  const mockSaveNutritionPlan = async (data) => {
    console.log("Saving nutrition plan:", data)
    return { success: true }
  }

  const saveNutritionPlan = mockSaveNutritionPlan
  const nutritionHistory = selectedPet ? mockNutritionHistory : []

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleArrayItem = (field, item) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item) ? prev[field].filter((i) => i !== item) : [...prev[field], item],
    }))
  }

  const generateNutritionPlan = async () => {
    if (!selectedPet) {
      alert("Please select a pet first.")
      return
    }

    setIsGenerating(true)
    try {
      const latestWeight = selectedPet.weight.reduce((latest, current) => {
        return new Date(current.date) > new Date(latest.date) ? current : latest
      }).value || 0;
      const petData = {
        type: selectedPet.type, name: selectedPet.name, age: selectedPet.age, weight: latestWeight, gender: selectedPet.gender, breed: selectedPet.breed,
      }
      const { age, weight, ...formDataWithoutAgeWeight } = formData;

      const { data } = await getNutritionistGpt({
        pet: petData,
        ...formDataWithoutAgeWeight
      })
      console.log("DATA:", data);

      setNutritionPlan(data?.plan)
      setCurrentStep(4)
      await saveNutritionPlan({
        petId: selectedPet._id,
        plan: data,
        formData,
      })
    } catch (err) {
      console.error("Error generating nutrition plan:", err)
      alert("Something went wrong while generating the nutrition plan.")
    } finally {
      setIsGenerating(false)
    }
  }

  const exportPlan = () => {
    const element = document.getElementById("nutrition-plan")
    if (!element) {
      alert("Nothing to export.")
      return
    }
    html2pdf().set({ margin: 0.5, filename: "nutrition_plan.pdf" }).from(element).save()
  }

  const canProceedToStep = (step) => {
    switch (step) {
      case 2:
        return selectedPet
      case 3:
        return selectedPet && formData.age && formData.weight && formData.activityLevel
      case 4:
        return selectedPet && formData.age && formData.weight && formData.activityLevel
      default:
        return true
    }
  }

  // Mock nutrition plan data for demonstration
  // const mockNutritionPlan = {
  //   dailyCalories: 850,
  //   proteinNeeds: "25-30%",
  //   fatNeeds: "12-15%",
  //   carbNeeds: "45-50%",
  //   feedingSchedule: [
  //     { time: "7:00 AM", portion: "1/2 cup", meal: "Breakfast" },
  //     { time: "12:00 PM", portion: "1/4 cup", meal: "Lunch" },
  //     { time: "6:00 PM", portion: "1/2 cup", meal: "Dinner" },
  //   ],
  //   recommendedIngredients: [
  //     { name: "Chicken", type: "Protein", benefit: "High-quality protein for muscle maintenance" },
  //     { name: "Sweet Potato", type: "Carbohydrate", benefit: "Complex carbs for sustained energy" },
  //     { name: "Salmon Oil", type: "Fat", benefit: "Omega-3 for skin and coat health" },
  //     { name: "Blueberries", type: "Antioxidant", benefit: "Immune system support" },
  //   ],
  //   avoidIngredients: ["Chocolate", "Grapes", "Onions", "Garlic", "Xylitol"],
  //   brandRecommendations: [
  //     {
  //       name: "Royal Canin Breed Health Nutrition",
  //       price: "$45.99",
  //       rating: 4.8,
  //       affiliate: true,
  //       reason: "Breed-specific formula with optimal nutrition",
  //     },
  //     {
  //       name: "Hill's Science Diet Adult",
  //       price: "$52.99",
  //       rating: 4.7,
  //       affiliate: true,
  //       reason: "Veterinarian recommended for overall health",
  //     },
  //     {
  //       name: "Blue Buffalo Life Protection",
  //       price: "$38.99",
  //       rating: 4.6,
  //       affiliate: true,
  //       reason: "Natural ingredients with LifeSource Bits",
  //     },
  //   ],
  // }

  return (
    <div className="">
      <div className="relative">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl shadow-xl max-md:hidden"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Utensils className="h-10 w-10 text-white " />
            </motion.div>
            <div>
              <h1 className="text-5xl max-md:text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Pet Nutritionist AI
              </h1>
              <Badge className="mt-2">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered Nutrition
              </Badge>
            </div>
          </div>
          {/* <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Get personalized nutrition plans tailored to your pet&apos;s breed, age, health, and lifestyle needs.
          </p> */}
        </motion.div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={4} />

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-8 ">
            {/* Step 1: Pet Selection */}
            <Card hover>
              <CardHeader gradient>
                <CardTitle className="flex items-center">
                  <Heart className="mr-3 h-6 w-6 text-green-600" />
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
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-3 border-green-200 shadow-lg">
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
                        <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
                          <PawPrint className="h-5 w-5 md:w-6 md:h-6 text-green-600" />
                        </div>
                        <div className="text-start">
                          <p className="font-semibold text-gray-800">Select Pet</p>
                          <span className="text-[13px] sm:text-sm font-normal text-gray-600">Get instant nutrition analysis</span>
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
                              className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 rounded-xl transition-all duration-200"
                              onClick={() => {
                                setSelectedPet(pet)
                                setShowPetMenu(false)
                              }}
                              whileHover={{ x: 4 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-green-100 shadow-md">
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
                      Continue to Health Info
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Step 2: Health & Activity Information */}
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
                        <Activity className="mr-3 h-6 w-6 text-emerald-600" />
                        Step 2: Health & Activity Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      {/* Basic Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">Age (years)</label>
                          <Input
                            type="number"
                            placeholder="e.g., 3"
                            value={formData.age}
                          // onChange={(e) => updateFormData("age", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">Weight (lbs)</label>
                          <Input
                            type="number"
                            placeholder="e.g., 45"
                            value={formData.weight}
                          // onChange={(e) => updateFormData("weight", e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Activity Level */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-4">Activity Level</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {activityLevels.map((level) => (
                            <motion.button
                              key={level.value}
                              onClick={() => updateFormData("activityLevel", level.value)}
                              className={cn(
                                "p-4 rounded-xl border-2 text-left transition-all duration-300",
                                formData.activityLevel === level.value
                                  ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-lg"
                                  : "bg-white border-gray-200 hover:border-green-200 hover:shadow-md",
                              )}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <div
                                  className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center",
                                    formData.activityLevel === level.value
                                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                                      : "bg-gray-100 text-gray-600",
                                  )}
                                >
                                  {level.icon}
                                </div>
                                <div>
                                  <h3 className="font-bold text-gray-800 capitalize">{level.value}</h3>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600">{level.label}</p>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Medical Conditions */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-4">
                          Medical Conditions (select all that apply)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {medicalConditions.map((condition) => (
                            <motion.button
                              key={condition}
                              onClick={() => toggleArrayItem("medicalConditions", condition)}
                              className={cn(
                                "p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200",
                                formData.medicalConditions.includes(condition)
                                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-700"
                                  : "bg-white border-gray-200 text-gray-700 hover:border-green-200",
                              )}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {condition}
                              {formData.medicalConditions.includes(condition) && (
                                <Check className="h-4 w-4 ml-2 inline" />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Current Symptoms */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-4">
                          Current Symptoms (select all that apply)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {currentSymptoms.map((symptom) => (
                            <motion.button
                              key={symptom}
                              onClick={() => toggleArrayItem("currentSymptoms", symptom)}
                              className={cn(
                                "p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200",
                                formData.currentSymptoms.includes(symptom)
                                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-700"
                                  : "bg-white border-gray-200 text-gray-700 hover:border-green-200",
                              )}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {symptom}
                              {formData.currentSymptoms.includes(symptom) && (
                                <Check className="h-4 w-4 ml-2 inline" />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Treatment Goals */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-4">
                          Nutrition Goals (select all that apply)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {treatmentGoals.map((goal) => (
                            <motion.button
                              key={goal}
                              onClick={() => toggleArrayItem("treatmentGoals", goal)}
                              className={cn(
                                "p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200",
                                formData.treatmentGoals.includes(goal)
                                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-700"
                                  : "bg-white border-gray-200 text-gray-700 hover:border-green-200",
                              )}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {goal}
                              {formData.treatmentGoals.includes(goal) && <Check className="h-4 w-4 ml-2 inline" />}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TagInput
                          label="Current Diet/Food Brand"
                          placeholder="e.g., Royal Canin Adult"
                          value={formData.currentDiet}
                          onChange={(newArray) => updateFormData("currentDiet", newArray)}
                        />

                        <TagInput
                          label="Known Allergies"
                          placeholder="e.g., Chicken, Grain"
                          value={formData.allergies}
                          onChange={(newArray) => updateFormData("allergies", newArray)}
                        />
                      </div>

                      {canProceedToStep(3) && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center pt-4"
                        >
                          <Button onClick={() => setCurrentStep(3)} size="lg" className="px-8">
                            Continue to Analysis
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Diet Analysis */}
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
                        <Utensils className="mr-3 h-6 w-6 text-teal-600" />
                        Step 3: Generate Nutrition Plan
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="text-center space-y-6">
                        <div className="p-8 max-md:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                          <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                              <Brain className="h-8 w-8 text-white" />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to Generate Your Plan</h3>
                          <p className="text-gray-600 mb-6">
                            Our AI nutritionist will analyze {selectedPet?.name}&apos;s information and create a personalized
                            nutrition plan with:
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm max-md:text-start">
                            <div className="flex items-center gap-2 text-green-700">
                              <CheckCircle className="h-4 w-4" />
                              Daily calorie requirements
                            </div>
                            <div className="flex items-center gap-2 text-green-700">
                              <CheckCircle className="h-4 w-4" />
                              Feeding schedule
                            </div>
                            <div className="flex items-center gap-2 text-green-700">
                              <CheckCircle className="h-4 w-4" />
                              Ingredient recommendations
                            </div>
                            <div className="flex items-center gap-2 text-green-700">
                              <CheckCircle className="h-4 w-4" />
                              Brand suggestions
                            </div>
                          </div>
                        </div>

                        <Button onClick={generateNutritionPlan} disabled={isGenerating} size="lg" className="px-12">
                          {isGenerating ? (
                            <>
                              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                              Generating Nutrition Plan
                            </>
                          ) : (
                            <>
                              <Sparkles className="mr-3 h-5 w-5" />
                              Generate Nutrition Plan
                              {/* <ArrowRight className="ml-3 h-5 w-5" /> */}
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 4: Nutrition Plan Results */}
            {currentStep >= 4 && !nutritionPlan &&
              <div className="flex flex-col items-center justify-center gap-4 text-center py-12 px-4 bg-red-50 border rounded-2xl animate-fadeIn">
                <div className="flex items-center justify-center w-20 h-20 bg-red-100 rounded-full shadow-inner animate-bounce">
                  <HiOutlineFaceFrown className="text-5xl text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Oops! We couldn&apos;t create your nutrition plan
                </h3>
                <p className="text-gray-600 text-sm max-w-md">
                  Our AI hit a hiccup while preparing your pet&apos;s meal plan. Please review your inputs and try again — we&apos;ll get it right next time!
                </p>
              </div>
            }
            <AnimatePresence mode="wait">
              {currentStep >= 4 && nutritionPlan && (
                <motion.div
                  id="nutrition-plan"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Daily Requirements */}
                  <Card>
                    <CardHeader gradient>
                      <CardTitle className="flex items-center">
                        <Target className="mr-3 h-6 w-6 text-green-600" />
                        Daily Nutritional Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                          <Scale className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-800">{nutritionPlan.dailyCalories}</p>
                          <p className="text-sm text-gray-600">Daily Calories</p>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                          <Beef className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-800">{nutritionPlan.proteinNeeds}</p>
                          <p className="text-sm text-gray-600">Protein</p>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                          <Fish className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-800">{nutritionPlan.fatNeeds}</p>
                          <p className="text-sm text-gray-600">Fat</p>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                          <Carrot className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-800">{nutritionPlan.carbNeeds}</p>
                          <p className="text-sm text-gray-600">Carbohydrates</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Feeding Schedule */}
                  <Card>
                    <CardHeader gradient>
                      <CardTitle className="flex items-center">
                        <Timer className="mr-3 h-6 w-6 text-blue-600" />
                        Feeding Schedule
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {nutritionPlan.feedingSchedule.map((meal, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                <Clock className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <p className="font-bold text-gray-800">{meal.meal}</p>
                                <p className="text-sm text-gray-600">{meal.time}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-white">
                              {meal.portion}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommended Ingredients */}
                  <Card>
                    <CardHeader gradient>
                      <CardTitle className="flex items-center">
                        <Leaf className="mr-3 h-6 w-6 text-green-600" />
                        Recommended Ingredients
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {nutritionPlan.recommendedIngredients.map((ingredient, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-gray-800">{ingredient.name}</h3>
                              <Badge variant="success" className="text-xs">
                                {ingredient.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{ingredient.benefit}</p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Ingredients to Avoid */}
                  <Card>
                    <CardHeader gradient>
                      <CardTitle className="flex items-center">
                        <AlertCircle className="mr-3 h-6 w-6 text-red-600" />
                        Ingredients to Avoid
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                        <div className="flex flex-wrap gap-2">
                          {nutritionPlan.avoidIngredients.map((ingredient, index) => (
                            <Badge key={index} variant="warning" className="bg-gradient-to-r from-red-500 to-pink-500">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              {ingredient}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-red-700 mt-3">
                          These ingredients can be toxic or harmful to your pet. Always check food labels carefully.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Brand Recommendations */}
                  <Card>
                    <CardHeader gradient>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Award className="min-h-6 min-w-6 text-purple-600" />
                          Recommended Brands
                        </div>
                        <Badge variant="affiliate" className={'flex items-center gap-2'}>
                          <ShoppingCart className="h-3 w-3" />
                          Affiliate Partners
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {nutritionPlan?.brandRecommendations?.map((brand, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="font-bold text-lg text-gray-800">{brand.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={cn(
                                          "h-4 w-4",
                                          i < Math.floor(brand.rating)
                                            ? "text-yellow-400 fill-current"
                                            : "text-gray-300",
                                        )}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-600">({brand.rating})</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xl font-bold text-green-600">{brand.price}</p>
                                {/* {brand.affiliate && (
                                  <Badge variant="affiliate" className="text-xs">
                                    Affiliate Link
                                  </Badge>
                                )} */}
                              </div>
                            </div>
                            <p className="text-gray-600 mb-4">{brand.reason}</p>
                            <Button variant="primary" className="w-full bg-primary text-white">
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              View Product & Buy Now
                            </Button>
                          </motion.div>
                        ))}
                      </div>
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
                      <Button
                        onClick={exportPlan}
                        variant="outline"
                        className="w-full justify-start h-auto py-4 bg-transparent"
                      >
                        <Download className="h-5 w-5 text-purple-500 mr-3" />
                        <div className="text-left">
                          <div className="font-bold">Download Nutrition Plan</div>
                          <div className="text-xs text-gray-500">Save PDF for your records</div>
                        </div>
                      </Button>

                      <Button onClick={() => router.push("/vet-appointment")} variant="outline" className="w-full justify-start h-auto py-4 bg-transparent">
                        <MessageSquare className="h-5 w-5 text-blue-500 mr-3" />
                        <div className="text-left">
                          <div className="font-bold">Consult with Nutritionist</div>
                          <div className="text-xs text-gray-500">Get professional guidance</div>
                        </div>
                      </Button>

                      {/* <Button variant="outline" className="w-full justify-start h-auto py-4 bg-transparent">
                        <Calendar className="h-5 w-5 text-green-500 mr-3" />
                        <div className="text-left">
                          <div className="font-bold">Schedule Follow-up</div>
                          <div className="text-xs text-gray-500">Track progress and adjust plan</div>
                        </div>
                      </Button> */}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-0 z-10 h-fit">

            {/* Nutrition Tips */}
            <Card>
              <CardHeader gradient>
                <CardTitle className="flex items-center">
                  <ThumbsUp className="mr-3 h-6 w-6 text-green-600" />
                  Nutrition Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4 text-sm">
                  {[
                    "Transition to new foods gradually over 7-10 days",
                    "Fresh water should always be available",
                    "Monitor your pet's weight regularly",
                    "Treats should not exceed 10% of daily calories",
                    "Consult your vet before major diet changes",
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

            {/* Quick Stats */}
            {selectedPet && currentStep >= 2 && (
              <Card>
                <CardHeader gradient>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-3 h-6 w-6 text-blue-600" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pet Age</span>
                      <Badge variant="outline">{formData.age || "Not set"} years</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Weight</span>
                      <Badge variant="outline">{formData.weight || "Not set"} lbs</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Activity Level</span>
                      <Badge variant="success" className="capitalize">
                        {formData.activityLevel || "Not set"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Health Conditions</span>
                      <Badge variant="warning">{formData.medicalConditions.length}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Nutrition History */}
            {selectedPet && (
              <Card>
                <CardHeader gradient>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-3 h-6 w-6 text-orange-600" />
                    Nutrition History
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {nutritionHistory.length > 0 ? (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {nutritionHistory.map((plan, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-600">
                              {new Date(plan.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                            <FileText className="h-4 w-4 text-gray-400" />
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {plan.goals?.map((goal, i) => (
                              <Badge key={i} variant="outline" className="text-xs bg-white">
                                {goal}
                              </Badge>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p className="font-medium">No nutrition history</p>
                      <p className="text-sm">Create your first plan to get started</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}