/* eslint-disable react/no-unescaped-entities */
"use client"

import { motion } from "framer-motion"
import { Brain, Bone, Fish, Cat, Dog, Bird, Heart, Star, Search, Shield, Activity } from "lucide-react"

export default function AISyndromeCheckerSection() {
  return (
    <section className="rounded-b-[4rem] max-sm:rounded-b-[3rem] py-32 bg-gradient-to-br from-rose-900 via-purple-900 to-indigo-900 overflow-hidden relative">
      {/* Floating pet elements */}
      <FloatingElements />

      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage: 'url("/placeholder.svg?height=600&width=600")',
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Main content wrapper */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left side content */}
            <motion.div
              className="lg:w-1/2 relative z-10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              <div className="relative">
                <motion.div
                  className="absolute -top-6 -left-6 text-purple-300/20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Heart size={40} />
                </motion.div>

                <h2 className="text-5xl md:text-6xl font-bold mb-8">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-purple-200 to-indigo-200">
                    AI-Powered
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mt-2">
                    Pet Health Guardian
                  </span>
                </h2>
              </div>

              <motion.p
                className="text-xl text-purple-100 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Our advanced AI technology watches over your pet's health 24/7, detecting potential health issues before
                they become serious concerns.
              </motion.p>

              {/* Feature cards */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: Shield,
                    title: "99.9% Accuracy",
                    description: "Highly precise diagnostics",
                  },
                  {
                    icon: Activity,
                    title: "Real-time Analysis",
                    description: "Instant health insights",
                  },
                  {
                    icon: Search,
                    title: "Early Detection",
                    description: "Preventive care at its best",
                  },
                  {
                    icon: Star,
                    title: "Vet Approved",
                    description: "Trusted by professionals",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  >
                    <feature.icon className="w-8 h-8 text-purple-300 mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-purple-200 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <button className="border border-white/30 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <span>Check your pet's health</span>
                  <motion.span
                    className="inline-block ml-2"
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    →
                  </motion.span>
                </button>
              </motion.div> */}
            </motion.div>

            {/* Right side animation */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                {/* Main brain visualization */}
                <BrainVisualization />

                {/* Floating pet avatars */}
                <div className="absolute inset-0">
                  <FloatingPetAvatars />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

const FloatingElements = () => {
  return (
    <>
      {[Bone, Fish, Heart, Star].map((Icon, index) =>
        Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`${index}-${i}`}
            className="absolute text-white/5"
            initial={{
              x: Math.random() * window?.innerWidth,
              y: Math.random() * window?.innerHeight,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Icon size={20 + Math.random() * 30} />
          </motion.div>
        )),
      )}
    </>
  )
}

const BrainVisualization = () => {
  return (
    <div className="relative w-[500px] h-[500px] mx-auto">
      {/* Central brain icon with glow effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 blur-2xl">
            <Brain className="w-40 h-40 text-purple-500/50" />
          </div>
          <Brain className="w-40 h-40 text-purple-300" />
        </div>
      </motion.div>

      {/* Circular paths */}
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20 + index * 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div
            className="absolute inset-0 border-2 border-purple-500/10 rounded-full"
            style={{ transform: `scale(${0.6 + index * 0.2})` }}
          />
        </motion.div>
      ))}

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-purple-400/50 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${50 + (Math.random() - 0.5) * 80}%`,
            top: `${50 + (Math.random() - 0.5) * 80}%`,
          }}
        />
      ))}
    </div>
  )
}

const FloatingPetAvatars = () => {
  const pets = [
    { Icon: Dog, color: "text-yellow-300" },
    { Icon: Cat, color: "text-purple-300" },
    { Icon: Bird, color: "text-blue-300" },
  ]

  return (
    <>
      {pets.map((pet, index) => (
        <motion.div
          key={index}
          className={`absolute ${pet.color}`}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3 + index,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 0.5,
          }}
          style={{
            left: `${20 + index * 30}%`,
            top: `${20 + index * 20}%`,
          }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-full p-3">
            <pet.Icon size={24} />
          </div>
        </motion.div>
      ))}
    </>
  )
}

