"use client";
import React from "react";
import { motion } from "framer-motion";
import { HiOutlineFingerPrint, HiOutlineVideoCamera, HiOutlineDocumentMagnifyingGlass, HiOutlineSparkles } from "react-icons/hi2";
import Image from "next/image";

const SymptomCheckerSection = () => {
    return (
        <section className="app-container py-24 relative overflow-hidden bg-white">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />

            <div className="grid lg:grid-cols-2 gap-16 items-center">
                
                {/* Content Side */}
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-widest">
                        <HiOutlineSparkles className="animate-pulse" />
                        Smart Diagnostics
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-extrabold text-[#2d152a] leading-[1.1]">
                        From Worry to <span className="text-primary">Certainty</span> in Seconds
                    </h2>
                    
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Don't guess with your pet's health. Our proprietary AI engine identifies issues by analyzing visual signs, affected areas, and behavioral data
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            { icon: <HiOutlineFingerPrint />, title: "Pet Specific", desc: "Results tailored to breed & age" },
                            { icon: <HiOutlineDocumentMagnifyingGlass />, title: "Clinical Logic", desc: "Cross-referenced with vet logs" },
                        ].map((feature, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary text-2xl shadow-sm">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#2d152a]">{feature.title}</h4>
                                    <p className="text-sm text-gray-500">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* The "Visual Demo" Side */}
                <div className="relative">
                    {/* Main UI Mockup */}
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className="relative z-10 bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-6 md:p-8 max-w-md mx-auto lg:ml-auto"
                    >
                        <div className="flex items-center justify-between mb-8 border-b pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">M</div>
                                <div>
                                    <p className="text-sm font-bold">Max's Checkup</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">In Progress</p>
                                </div>
                            </div>
                            <div className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full border border-green-100">
                                AI ACTIVE
                            </div>
                        </div>

                        {/* Step Representation */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <p className="text-xs font-bold text-gray-400">01. AFFECTED AREA</p>
                                <div className="flex gap-2">
                                    <span className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold">Paws & Joints</span>
                                    <span className="px-4 py-2 rounded-lg bg-gray-50 text-gray-400 text-xs font-semibold border border-gray-100 italic">More</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs font-bold text-gray-400">02. VISUAL SIGNS</p>
                                <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-lg overflow-hidden">
                                            <Image src="/images/paw-heart.webp" alt="Scan" width={20} height={20} className="w-full h-full object-cover" />
                                            {/* <PawPrint /> */}
                                        </div>
                                        <p className="text-xs text-gray-500 leading-tight">Redness and swelling detected on front-left paw.</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-[#481d3f] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl hover:shadow-primary/20 transition-all">
                                Analyze Symptoms <HiOutlineSparkles />
                            </button>
                        </div>
                    </motion.div>

                    {/* Decorative Floating Cards */}
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -top-6 -left-6 z-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 hidden sm:block"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><HiOutlineVideoCamera /></div>
                            <p className="text-xs font-bold">Ready for Vet Call</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                        className="absolute -bottom-10 -right-4 z-10 bg-white p-5 rounded-2xl shadow-xl border border-gray-50 max-w-[180px] hidden sm:block"
                    >
                        <p className="text-[10px] text-gray-400 font-bold mb-2 uppercase">AI Confidence</p>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[92%]" />
                        </div>
                        <p className="text-lg font-black mt-1 text-[#481d3f]">92%</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SymptomCheckerSection;