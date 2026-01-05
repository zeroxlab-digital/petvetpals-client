"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles, HiLightningBolt, HiShieldCheck, HiFingerPrint } from "react-icons/hi";
import { MdHealthAndSafety } from "react-icons/md";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi2";

const hotspots = [
    {
        id: "symptoms",
        top: "18%",
        left: "45%",
        title: "AI Symptom Checker",
        insight: "Based on recent symptoms and behavior logs, Max may be experiencing mild gastrointestinal discomfort. No emergency indicators detected.",
        status: "Analyzing Symptom Patterns...",
        action: "Run Symptom Check",
        icon: <HiSparkles className="text-blue-500" />,
        color: "#2563EB"
    },
    {
        id: "nutrition",
        top: "55%",
        left: "55%",
        title: "AI Nutritionist",
        insight: "Daily calorie intake optimized for Max’s age, weight, and activity level. Protein-to-fiber ratio adjusted for better digestion.",
        status: "Optimizing Nutrition Plan...",
        action: "View Nutrition Plan",
        icon: <HiLightningBolt className="text-amber-500" />,
        color: "#F59E0B"
    },
    {
        id: "allergy",
        top: "75%",
        left: "35%",
        title: "Allergy & Itch Coach",
        insight: "Frequent paw licking detected. Possible seasonal allergy trigger identified from recent activity and weather patterns.",
        status: "Monitoring Allergy Triggers...",
        action: "Open Itch Coach",
        icon: <HiShieldCheck className="text-emerald-500" />,
        color: "#10B981"
    }
];

const AiHealthTwin = () => {
    const [index, setIndex] = useState(0);
    const activeTab = hotspots[index];

    // Automatic 10-second rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % hotspots.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center  relative overflow-hidden">

                    {/* Left Side: Interactive Scan View */}
                    <div className="relative flex  items-center">
                        <div className="relative w-full max-w-md aspect-square rounded-full flex items-center justify-center border border-slate-100 bg-slate-50/50">

                            {/* Rotating Scan Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-2 border-2 border-dashed border-slate-200 rounded-full"
                            />

                            <div className="relative w-4/5 h-4/5">
                                <Image
                                    src="/images/dog-poster.png"
                                    alt="Pet Health Scan"
                                    // fill
                                    width={200}
                                    height={100}
                                    className="w-full h-full opacity-90 transition-opacity duration-500 absolute top-0 -left-12"
                                />
                            </div>

                            {/* Pulsing Hotspots */}
                            {hotspots.map((point, i) => (
                                <button
                                    key={point.id}
                                    onClick={() => setIndex(i)}
                                    className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2"
                                    style={{ top: point.top, left: point.left }}
                                >
                                    <span className={`absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-20 ${index === i ? 'scale-150' : 'hidden'}`}></span>
                                    <div className={`relative p-2 rounded-full border-2 transition-all duration-500 shadow-sm ${index === i
                                            ? "bg-blue-600 border-white scale-125 shadow-blue-200"
                                            : "bg-white border-slate-200 hover:scale-110"
                                        }`}>
                                        <MdHealthAndSafety className={`text-lg ${index === i ? "text-white" : "text-slate-400"}`} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Modern Analysis Hub */}
                    <div className="flex flex-col justify-center min-h-[480px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab.id}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-8"
                            >
                                {/* Header */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-widest">
                                        <HiFingerPrint className="text-lg" /> AI Diagnostic Active
                                    </div>
                                    <h3 className="text-5xl font-black text-slate-900 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-900">
                                        {activeTab.title}
                                    </h3>
                                </div>

                                {/* Thinking Bar */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                                            {activeTab.status}
                                        </span>
                                        <span className="text-xs font-black text-blue-600">LIVE SYNC</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            key={`bar-${index}`}
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 10, ease: "linear" }}
                                            className="h-full bg-blue-600"
                                        />
                                    </div>
                                </div>

                                {/* Insight Bubble */}
                                <div className="p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100 relative">
                                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center text-2xl">
                                        {activeTab.icon}
                                    </div>
                                    <p className="text-slate-600 text-xl leading-relaxed font-medium italic">
                                        {activeTab.insight}
                                    </p>
                                </div>

                                {/* CTA Button */}
                                <button className="w-full sm:w-fit px-10 py-5 bg-blue-600 text-white rounded-full font-semibold text-base hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all flex items-center justify-center gap-3 group">
                                    {activeTab.action}
                                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                        <HiArrowRight />
                                    </motion.span>
                                </button>
                            </motion.div>
                        </AnimatePresence>

                        {/* Pagination Indicators */}
                        <div className="flex gap-3 mt-12">
                            {hotspots.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIndex(i)}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${index === i ? 'w-12 bg-blue-600' : 'w-4 bg-slate-200 hover:bg-slate-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AiHealthTwin;