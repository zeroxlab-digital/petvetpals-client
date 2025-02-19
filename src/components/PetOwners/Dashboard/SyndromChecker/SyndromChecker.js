/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Send } from "lucide-react"
import { checkSymptoms, getChatResponse } from "./actions/syndromChecker"
import BrainVisualization from "./BrainVisualization"

export default function SyndromChecker() {
  const [inputValue, setInputValue] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [accuracy, setAccuracy] = useState(0)
  const [chatMessages, setChatMessages] = useState([])
  const [showChatbot, setShowChatbot] = useState(false)

  const particlesRef = useRef(null)

  useEffect(() => {
    if (particlesRef.current) {
      initParticles()
    }
  }, [])

  const initParticles = () => {
    const particlesJS = window.particlesJS
    if (particlesJS) {
      particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          move: { enable: true, speed: 1, direction: "none", random: true, out_mode: "out" },
        },
      })
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    try {
      const result = await checkSymptoms(inputValue)
      setResult(result)
      setAccuracy(result.probability * 100)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleChatSubmit = async (e) => {
    e.preventDefault()
    const userMessage = e.target.message.value
    setChatMessages((prev) => [...prev, { text: userMessage, sender: "user" }])
    e.target.reset()

    const aiResponse = await getChatResponse(userMessage)
    setChatMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }])
  }

  return (
    <section className="  overflow-hidden relative text-pirmary">
      <div id="particles-js" ref={particlesRef} className="absolute inset-0" />

      <div className="container mx-auto px-3 relative z-10">
        {/* <motion.h2
          className="text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          AI-Powered Syndrome Checker
        </motion.h2> */}

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-semibold mb-6">Instant Pet Health Analysis</h3>
            <p className="text-xl mb-8">
              Our cutting-edge AI technology analyzes your pet's symptoms and provides instant, accurate health
              insights.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your pet's symptoms..."
                  value={inputValue}
                  onChange={handleInputChange}
                  className="w-full p-4 pr-12 rounded-lg bg-white/10 backdrop-blur-md border border-black/20 focus:outline-none focus:ring-2 focus:ring-blue-400 text-pirmary placeholder-white/50"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pirmary/50" />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={isProcessing}
              >
                {isProcessing ? "Analyzing..." : "Check Symptoms"}
              </button>
            </form>
          </motion.div>

          <motion.div
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <BrainVisualization isProcessing={isProcessing} />
          </motion.div>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              className="mt-16 bg-black/10 backdrop-blur-md rounded-lg p-8 border border-black/20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Analysis Result</h3>
              <div className="flex items-center mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-4">
                  <motion.div
                    className="bg-blue-600 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${accuracy}%` }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </div>
                <span className="text-lg font-medium">{accuracy}% Accuracy</span>
              </div>
              <p className="text-xl mb-4">
                Potential Syndrome: <span className="font-semibold">{result.syndrome}</span>
              </p>
              <p className="text-lg mb-2">Recommendations:</p>
              <ul className="list-disc list-inside space-y-2">
                {result.recommendations.map((rec, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    {rec}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => setShowChatbot(!showChatbot)}
            className="py-3 px-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full font-semibold text-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Chat with AI Vet Assistant
          </button>
        </motion.div>

        <AnimatePresence>
          {showChatbot && (
            <motion.div
              className="fixed bottom-4 right-4 w-96 h-[500px] bg-black/10 backdrop-blur-md rounded-lg border border-black/20 flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <div className="p-4 border-b border-black/20">
                <h3 className="text-xl font-semibold">AI Vet Assistant</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${msg.sender === "user" ? "bg-blue-500" : "bg-purple-500"}`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleChatSubmit} className="p-4 border-t border-black/20 flex">
                <input
                  type="text"
                  name="message"
                  placeholder="Ask about your pet's health..."
                  className="flex-1 p-2 rounded-l-lg bg-white/10 border border-black/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  className="p-2 bg-blue-500 rounded-r-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  <Send size={20} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

