"use client"

import { motion } from "framer-motion"
import { Cat, Dog } from "lucide-react"

export function BrandLoader() {
  return (
    <div className="grid place-items-center min-h-[400px] bg-white">
      <div className="relative w-64 h-64">
        {/* Background circle with gradient */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50 to-purple-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Cat icon animation */}
        <motion.div
          className="absolute left-1/2 top-1/2"
          initial={{ x: -100, y: -100, opacity: 0, scale: 0.5 }}
          animate={{ x: -30, y: -30, opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
            delay: 0.2,
          }}
        >
          <Cat size={40} className="text-indigo-600" strokeWidth={2.5} />
        </motion.div>

        {/* Dog icon animation */}
        <motion.div
          className="absolute left-1/2 top-1/2"
          initial={{ x: 100, y: 100, opacity: 0, scale: 0.5 }}
          animate={{ x: -10, y: -10, opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
            delay: 0.3,
          }}
        >
          <Dog size={40} className="text-purple-600" strokeWidth={2.5} />
        </motion.div>

        {/* Brand text animation */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 whitespace-nowrap"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 20, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 0.6,
          }}
        >
          <motion.span
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ letterSpacing: "0.2em" }}
            animate={{ letterSpacing: "0.1em" }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.6,
            }}
          >
            PetVetPals
          </motion.span>
        </motion.div>

        {/* Circular progress */}
        <motion.div
          className="absolute inset-0"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-indigo-100"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-indigo-600"
              strokeDasharray="0 283"
              initial={{ strokeDasharray: "0 283" }}
              animate={{ strokeDasharray: "283 283" }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}

