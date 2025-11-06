"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HiPencilAlt, HiHeart, HiChat, HiClipboardCheck } from "react-icons/hi";

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const steps = [
    {
      icon: <HiPencilAlt className="w-10 h-10 text-primary" />,
      title: "Create Your Pet Profiles",
      description: (
        <>
          Sign up quickly and add your pets’ details. Our AI instantly analyzes breed, age, and health history to give personalized care insights just for them.
          <span className="sr-only">
            AI pet health analysis, personalized pet care, pet profile setup
          </span>
        </>
      ),
      color: "bg-purple-600",
      animation: {
        scale: [1, 1.1, 1],
        rotate: [0, 10, -10, 0],
        transition: { duration: 2, repeat: Infinity },
      },
    },
    {
      icon: <HiHeart className="w-10 h-10 text-primary" />,
      title: "AI Health Assessment & Vet Booking",
      description: (
        <>
          Get an AI-powered symptom analysis and health check. Browse certified vets, read reviews, and book virtual or in-person consultations perfectly suited for your pet’s needs.
          <span className="sr-only">
            virtual vet consultation, AI symptom tracking, pet health check
          </span>
        </>
      ),
      color: "bg-blue-600",
      animation: {
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
        transition: { duration: 2, repeat: Infinity },
      },
    },
    {
      icon: <HiChat className="w-10 h-10 text-primary" />,
      title: "Consult with Experts & AI Insights",
      description: (
        <>
          Join your consultation with your pet while our AI provides real-time health insights and suggestions. Experience combined veterinary expertise and AI accuracy for smarter care.
          <span className="sr-only">
            veterinary advice, AI health insights, real-time pet monitoring
          </span>
        </>
      ),
      color: "bg-green-600",
      animation: {
        scale: [1, 1.1, 1],
        transition: { duration: 2, repeat: Infinity },
      },
    },
    {
      icon: <HiClipboardCheck className="w-10 h-10 text-primary" />,
      title: "Get Prescriptions & Smart Recommendations",
      description: (
        <>
          After your consultation, receive digital prescriptions instantly. Our AI recommends the right medications, supplements, and products — ready to order with one click to keep your pet thriving.
          <span className="sr-only">
            digital prescriptions, AI medication recommendations, pet health products
          </span>
        </>
      ),
      color: "bg-orange-600",
      animation: {
        x: [0, 10, -10, 0],
        transition: { duration: 2, repeat: Infinity },
      },
    },
  ];

  return (
    <section className="pt-10 pb-44 app-container relative overflow-hidden">
      <motion.div
        className="absolute w-64 h-64 bg-purple-200 rounded-full opacity-20 top-20 left-20"
        animate={{ y: [0, -20, 0], rotate: [0, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-48 h-48 bg-blue-200 rounded-full opacity-20 bottom-20 right-20"
        animate={{ y: [0, 20, 0], rotate: [0, -360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <div className="mx-auto px-4 relative z-10">
        <h2 className="text-2xl md:text-3xl text-gray-900 text-center mb-10 font-bold">
          How It Works
        </h2>
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <motion.div
                className={`absolute -top-16 -right-16 w-32 h-32 ${step.color} rounded-full opacity-10`}
                animate={{ scale: [1, 1.5, 1], rotate: [0, 180] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="w-20 h-20 mx-auto mb-5 flex items-center justify-center rounded-full relative z-10"
                animate={step.animation}
              >
                {step.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;