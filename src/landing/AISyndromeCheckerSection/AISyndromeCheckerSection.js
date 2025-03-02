"use client";

import { motion } from "framer-motion";
import { Brain, Bone, Fish, Heart, Star, Shield, Activity, Search } from "lucide-react";
import React from "react";

export default function AISyndromeCheckerSection() {
  return (
    <section className="rounded-b-[4rem] max-sm:rounded-b-[3rem] py-32 bg-gradient-to-br from-rose-900 via-purple-900 to-indigo-900 overflow-hidden relative">
      <FloatingElements />
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        style={{ backgroundImage: 'url("/placeholder.svg?height=600&width=600")', backgroundSize: "60px 60px" }}
      />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              className="lg:w-1/2 relative z-10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
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
                Our advanced AI technology watches over your pet&apos;s health 24/7, detecting potential health issues before
                they become serious concerns.
              </motion.p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Shield, title: "99.9% Accuracy", description: "Highly precise diagnostics" },
                  { icon: Activity, title: "Real-time Analysis", description: "Instant health insights" },
                  { icon: Search, title: "Early Detection", description: "Preventive care at its best" },
                  { icon: Star, title: "Vet Approved", description: "Trusted by professionals" },
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
            </motion.div>
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <BrainVisualization />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

const FloatingElements = () => {
  return (
    <>
      {[Bone, Fish, Heart, Star].map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-white/5 will-change-transform"
          initial={{ x: Math.random() * window?.innerWidth, y: Math.random() * window?.innerHeight }}
          animate={{ y: [0, -20, 0], rotate: [0, 360] }}
          transition={{ duration: 5 + Math.random() * 5, repeat: Number.POSITIVE_INFINITY, delay: Math.random() * 2 }}
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        >
          <Icon size={20 + Math.random() * 30} />
        </motion.div>
      ))}
    </>
  );
};

const BrainVisualization = (() => {
  return (
    <div className="relative w-[500px] h-[500px] mx-auto">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="relative">
          <div className="absolute inset-0 blur-2xl">
            <Brain className="w-40 h-40 text-purple-500/50" />
          </div>
          <Brain className="w-40 h-40 text-purple-300" />
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <div className="absolute inset-0 border-2 border-purple-500/10 rounded-full" />
      </motion.div>
      {Array.from({ length: 10 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-purple-400/50 rounded-full will-change-transform"
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Number.POSITIVE_INFINITY, delay: Math.random() * 2 }}
          style={{ left: `${50 + (Math.random() - 0.5) * 80}%`, top: `${50 + (Math.random() - 0.5) * 80}%` }}
        />
      ))}
    </div>
  );
});