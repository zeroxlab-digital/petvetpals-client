"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Brain } from "lucide-react"

export default function BrainVisualization({ isProcessing }) {
  const pathLength = useMotionValue(0)
  const opacity = useTransform(pathLength, [0, 1], [0.2, 1])

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        pathLength.set(Math.random())
      }, 200)
      return () => clearInterval(interval)
    } else {
      pathLength.set(1)
    }
  }, [isProcessing, pathLength])

  return (
    <div className="relative w-80 h-80">
      <motion.div
        className="absolute inset-0"
        animate={{
          rotate: isProcessing ? 360 : 0,
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <motion.path
            d="M100,10 C120,10 140,20 150,40 C160,60 160,80 150,100 C140,120 120,130 100,130 C80,130 60,120 50,100 C40,80 40,60 50,40 C60,20 80,10 100,10 Z"
            fill="none"
            stroke="#4FD1C5"
            strokeWidth="4"
            style={{ pathLength, opacity }}
          />
        </svg>
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: isProcessing ? [1, 1.1, 1] : 1,
        }}
        transition={{ duration: 1, repeat: isProcessing ? Number.POSITIVE_INFINITY : 0, ease: "easeInOut" }}
      >
        <Brain size={100} className="text-blue-300" />
      </motion.div>
    </div>
  )
}

