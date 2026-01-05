"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
    HiOutlineCalendar, 
    HiOutlineSparkles, 
    HiOutlineHeart, 
    HiOutlineChartBar,
    HiOutlineVideoCamera 
} from "react-icons/hi2";

const timelineEvents = [
    {
        age: "Early Puppyhood",
        title: "Growth Spurt Detection",
        desc: "Our AI analyzed Max's gait and weight trends, confirming healthy bone development and adjusting calcium intake.",
        icon: <HiOutlineChartBar className="text-blue-500" />,
        color: "from-blue-500/20 to-cyan-400/20",
        tag: "Growth AI"
    },
    {
        age: "Adulthood (3 Yrs)",
        title: "Metabolic Baseline Established",
        desc: "Max reached his ideal weight. The AI locked in his long-term metabolic baseline to monitor for future fluctuations.",
        icon: <HiOutlineSparkles className="text-purple-500" />,
        color: "from-purple-500/20 to-pink-400/20",
        tag: "Optimization"
    },
    {
        age: "The Senior Years",
        title: "Proactive Mobility Support",
        desc: "Detected a subtle change in morning activity levels. Initiated joint-support recommendations before symptoms appeared.",
        icon: <HiOutlineHeart className="text-rose-500" />,
        color: "from-rose-500/20 to-orange-400/20",
        tag: "Longevity"
    }
];

const HealthTimeline = () => {
    return (
        <section className="app-container py-24 bg-white relative overflow-hidden">
            {/* SEO Header */}
            <div className="max-w-3xl mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-[#481d3f] text-xs font-bold uppercase tracking-widest mb-6">
                    <HiOutlineCalendar className="text-lg" /> Lifelong Care Engine
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-[#2d152a] leading-tight mb-6">
                    A Health Story <br />
                    <span className="text-primary italic">Written by Data.</span>
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                    PetVetPals doesn't just track symptoms—it maps your pet's entire life journey. From the first vaccination to senior mobility, our AI ensures you never miss a milestone.
                </p>
            </div>

            {/* Timeline Wrapper */}
            <div className="relative max-w-5xl mx-auto">
                
                {/* Vertical Pulse Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-100 -translate-x-1/2 overflow-hidden">
                    <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="w-full bg-gradient-to-b from-primary via-purple-400 to-rose-400"
                    />
                </div>

                <div className="space-y-24">
                    {timelineEvents.map((event, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className={`relative flex items-center justify-start md:justify-between w-full ${
                                i % 2 !== 0 ? "md:flex-row-reverse" : ""
                            }`}
                        >
                            {/* Dot */}
                            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white bg-primary shadow-[0_0_15px_rgba(236,72,153,0.5)] z-20" />

                            {/* Content Card */}
                            <div className="ml-16 md:ml-0 w-full md:w-[45%]">
                                <div className={`p-8 rounded-[2.5rem] bg-gradient-to-br ${event.color} border border-white shadow-xl backdrop-blur-sm`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{event.age}</span>
                                        <div className="px-3 py-1 bg-white/60 rounded-full text-[10px] font-bold text-[#481d3f] uppercase border border-white">
                                            {event.tag}
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm text-2xl">
                                            {event.icon}
                                        </div>
                                        <h4 className="text-xl font-bold text-[#2d152a] flex-1 leading-tight">{event.title}</h4>
                                    </div>
                                    
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                        {event.desc}
                                    </p>

                                    {/* Action Integration */}
                                    <div className="flex items-center gap-4 text-xs font-bold text-primary cursor-pointer hover:gap-6 transition-all">
                                        View AI Summary <HiOutlineVideoCamera className="text-lg" />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Placeholder for App UI (Right/Left side) */}
                            <div className="hidden md:flex w-[45%] items-center justify-center">
                                <div className="w-32 h-32 rounded-full bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white shadow-lg animate-pulse" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HealthTimeline;