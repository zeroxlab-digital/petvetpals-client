"use client"
import { Cat, Dog } from "lucide-react"
import { motion } from "framer-motion"

export function PetSpinner({ size = 100, color = "#58294E" }) {
  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-16rem)]">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Main rotating ring */}
        <motion.div
          className="absolute inset-0"
          style={{
            border: `${size * 0.02}px solid ${color}15`,
            borderTopColor: color,
            borderRadius: "50%",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />

        {/* Pet icons container */}
        <div className="absolute inset-0">
          {/* Cat */}
          <motion.div
            className="absolute left-1/2 top-1/2"
            initial={{ rotate: 0 }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: {
                duration: 3,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              },
              scale: {
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
          >
            <Cat
              size={size * 0.25}
              color={color}
              strokeWidth={2}
              className="absolute"
              style={{
                transform: `translate(-50%, -${size * 0.4}px)`,
              }}
            />
          </motion.div>

          {/* Dog */}
          <motion.div
            className="absolute left-1/2 top-1/2"
            initial={{ rotate: 180 }}
            animate={{
              rotate: 540,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: {
                duration: 3,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              },
              scale: {
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.75,
              },
            }}
          >
            <Dog
              size={size * 0.25}
              color={color}
              strokeWidth={2}
              className="absolute"
              style={{
                transform: `translate(-50%, -${size * 0.4}px)`,
              }}
            />
          </motion.div>
        </div>

        {/* Loading dots */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: color }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
