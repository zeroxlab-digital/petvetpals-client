"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { HiOutlineArrowRight, HiOutlineCpuChip, HiOutlineCubeTransparent, HiOutlineFingerPrint, HiOutlineSparkles, HiSparkles } from "react-icons/hi2";
import { Activity, PawPrint } from "lucide-react";
import { FaPaw } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

const petProfiles = [
    {
        id: "senior-dog-meds",
        petName: "Buddy",
        breed: "Labrador Retriever",
        age: "9y",
        condition: "Stiffness and reduced activity reported",
        suggestion: "Joint Support Supplement",
        tag: "Mobility Care Plan",
        image: "/images/dog-white-yellow.jpg",
    },
    {
        id: "kitten-digestive",
        petName: "Milo",
        breed: "Domestic Shorthair",
        age: "5m",
        condition: "Digestive discomfort symptoms logged",
        suggestion: "Probiotic Chews",
        tag: "Digestive Wellness Plan",
        image: "/images/cat-vet.jpg",
    }
];

const HeroSection = () => {
    const router = useRouter();
    const [index, setIndex] = useState(0);
    const active = petProfiles[index];

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % petProfiles.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className=" relative lg:h-[95vh] h-full max-lg:py-20 w-full bg-white overflow-hidden flex items-center">

            {/* SEO STRUCTURE */}
            <h1 className="sr-only">
                PetVetPals: AI-Powered Pet Health Tracking, Symptom Insights & Smart Care Reminders
            </h1>

            {/* Background: Cinema-Grade Light Imagery */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active.id}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
                        className="relative w-full h-full"
                    >
                        {/* High-Key Photo with Soft Vignette */}
                        <Image
                            src={active.image}
                            alt={`${active.breed} biometric scan`}
                            fill
                            className="w-full h-full object-cover grayscale-[10%]"
                        />
                        {/* Light Gradients for Content Legibility */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Technical Grid Overlay (Light Blue) */}
            <div className="absolute inset-0 z-10 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: `linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)`, backgroundSize: '80px 80px' }}
            />

            <div className="app-container relative z-20 w-full">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    {/* Left Side: Content-Heavy Narrative */}
                    <div className="lg:col-span-7 space-y-10 max-md:text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 shadow-sm"
                        >
                            <FaPaw size={16} className="text-base text-blue-600 animate-pulse" />
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">
                                AI Pet Health Assistant
                            </span>
                        </motion.div>

                        <div className="space-y-6">
                            <motion.h2
                                key={`title-${active.id}`}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-6xl md:text-[100px] font-black text-slate-900 leading-[0.85] tracking-tighter"
                            >
                                Smarter <br />
                                <span className="text-primary italic font-light">Pet Care.</span>
                            </motion.h2>
                            <p className="text-slate-500 text-xl md:text-2xl max-w-xl leading-relaxed font-medium">
                                Track symptoms, manage medications, and get AI-powered care insights — all in one place for pets you love.
                            </p>
                        </div>

                        {/* Quantitative Stats Grid */}
                        <div className="md:w-10/12  grid grid-cols-2 md:grid-cols-3 pt-4 pb-8 border-b border-slate-100">
                            <div>
                                <p className="text-3xl font-black text-slate-900 leading-none mb-2">10k+</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    Symptom Checks Run
                                </p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-slate-900 leading-none mb-2">24/7</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    Care Access
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <p className="text-3xl font-black text-slate-900 leading-none mb-2">1 App</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    Health, Meds & Reminders
                                </p>
                            </div>
                        </div>

                        <div className="max-md:flex justify-center">
                            <Link href={'/dashboard/pets'} className=" px-12 py-5 bg-primary text-white rounded-full font-black uppercase tracking-widest text-sm hover:bg-primaryHover transition-all shadow-xl shadow-pink-200 flex items-center justify-center gap-4">
                                Create Pet Profile <HiOutlineArrowRight className="text-lg" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Side: The Frosted AI Suggestion HUD */}
                    <div className="lg:col-span-5 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.id}
                                initial={{ opacity: 0, x: 50, rotateY: -15 }}
                                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                                exit={{ opacity: 0, x: -50, rotateY: 15 }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="relative bg-white/50 backdrop-blur-4xl border border-white rounded-[3rem] p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] overflow-hidden"
                            >
                                {/* Moving Scanner Line (Subtle Blue) */}
                                <motion.div
                                    animate={{ top: ["-10%", "110%"] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-[100px] bg-gradient-to-b from-transparent via-blue-500/5 to-transparent z-0 pointer-events-none"
                                />

                                <div className="relative z-10 space-y-10">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                                                <HiOutlineFingerPrint className="text-3xl text-white" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Bio-Scan Data</p>
                                                <h4 className="text-slate-900 font-black text-2xl">{active.petName}</h4>
                                                <p className="text-slate-400 text-sm font-medium">{active.breed}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 rounded-[1.5rem] bg-slate-50/80 border border-slate-100 space-y-3">
                                        <div className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-widest">
                                            <HiOutlineSparkles /> AI Care Insight
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                                            "Based on reported symptoms, {active.tag} may help support your pet&apos;s comfort and daily routine."
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Suggestion Wellness Option</p>
                                            <p className="text-slate-900 font-black">{active.suggestion}</p>
                                        </div>
                                        <button className="w-14 h-14 bg-white border border-slate-100 rounded-2xl text-slate-900 hover:bg-blue-600 hover:text-white transition-all shadow-sm flex items-center justify-center">
                                            <HiOutlineCubeTransparent className="text-2xl" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>

            {/* Pagination Controls */}
            <div className="absolute bottom-10 right-10 flex gap-4 z-20">
                {petProfiles.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${index === i ? "w-12 bg-primary" : "w-4 bg-slate-200"}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;