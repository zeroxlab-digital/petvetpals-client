"use client";
import { motion, useInView } from "framer-motion";
// import { HiUser, HiSearch, HiPaw, HiShoppingCart } from "react-icons/hi2";
import { useRef } from "react";
import { HiSearch } from "react-icons/hi";
import { HiShoppingCart, HiUser, HiUsers } from "react-icons/hi2";

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const steps = [
    {
      icon: <HiUser className="w-10 h-10 text-primary" />,
      title: "Create an Account",
      description:
        "Sign up in seconds and create a profile for you and your pet. Get access to exclusive features and personalized recommendations.",
      color: "bg-purple-600",
      animation: {
        scale: [1, 1.1, 1],
        rotate: [0, 10, -10, 0],
        transition: { duration: 2, repeat: Infinity },
      },
    },
    {
      icon: <HiSearch className="w-10 h-10 text-primary" />,
      title: "Find a Vet & Book",
      description:
        "Browse certified vets, read reviews, and choose a slot that works for you. Book a video or in-person consultation in just a few clicks.",
      color: "bg-blue-600",
      animation: {
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
        transition: { duration: 2, repeat: Infinity },
      },
    },
    {
      icon: <HiUsers className="w-10 h-10 text-primary" />,
      title: "Join with Your Pet",
      description:
        "Bring your pet to the consultation and get expert advice. Our vets are trained to handle all kinds of pets, from cats and dogs to exotic animals.",
      color: "bg-green-600",
      animation: {
        scale: [1, 1.1, 1],
        transition: { duration: 2, repeat: Infinity },
      },
    },
    {
      icon: <HiShoppingCart className="w-10 h-10 text-primary" />,
      title: "Get Prescription & Shop",
      description:
        "Receive a digital prescription after your consultation. Click a link to buy all recommended products, which are automatically added to your cart.",
      color: "bg-orange-600",
      animation: {
        x: [0, 10, -10, 0],
        transition: { duration: 2, repeat: Infinity },
      },
    },
  ];

  return (
    <section className="pt-10 pb-44 app-container relative overflow-hidden">
      {/* Floating shapes for background */}
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

      <div className=" mx-auto px-4 relative z-10">
        <h2 className="text-2xl text-gray-900 text-center mb-10">
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
              {/* Animated background circle */}
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