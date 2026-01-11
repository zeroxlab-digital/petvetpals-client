import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Activity, Check, Heart, Search, Sparkles } from "lucide-react";

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

export default StepIndicator;