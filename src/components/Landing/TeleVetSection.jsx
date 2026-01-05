"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
    HiOutlineVideoCamera, 
    HiOutlineChatBubbleLeftRight, 
    HiOutlineShieldCheck, 
    HiOutlineClock,
    HiOutlineDocumentText
} from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";

const TeleVetSection = () => {
    return (
        <section className="app-container py-24 relative overflow-hidden bg-white">
            {/* Background Blue Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-[100px] -z-10" />

            <div className="grid lg:grid-cols-2 gap-20 items-center">
                
                {/* Visual Side: The Consultation Interface */}
                <div className="relative order-2 lg:order-1">
                    {/* The "Video Call" Main Frame */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative z-10 bg-[#0f172a] rounded-[3rem] p-4 shadow-2xl border border-blue-500/20"
                    >
                        <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-slate-800">
                            {/* Placeholder for Vet Video */}
                            <Image
                                src="/images/dog-pharmacy.jpeg" 
                                alt="Virtual Vet" 
                                width={500}
                                height={500}
                                className="w-full h-full object-cover opacity-80" 
                            />
                            
                            {/* Live AI Data Overlay */}
                            <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                                {/* <div className="bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Live AI Feed</p>
                                    <p className="text-xs text-white">HR: 82 BPM • Resp: Normal</p>
                                </div> */}
                                <div className="flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full text-[10px] font-bold text-white animate-pulse">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full" /> LIVE
                                </div>
                            </div>

                            {/* Call Controls */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                                <div className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20"><HiOutlineChatBubbleLeftRight /></div>
                                <div className="p-4 bg-red-500 rounded-full text-white shadow-lg shadow-red-500/40"><HiOutlineVideoCamera /></div>
                                <div className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20"><HiOutlineDocumentText /></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating Trust Badge */}
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-3xl shadow-xl border border-blue-50 flex items-center gap-4"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white text-2xl shadow-lg shadow-pink-200">
                            <HiOutlineShieldCheck />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">Licensed Vets</p>
                            <p className="text-[10px] text-gray-500 uppercase font-black">24/7 Availability</p>
                        </div>
                    </motion.div>
                </div>

                {/* Content Side */}
                <div className="order-1 lg:order-2 space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-100 text-primary text-xs font-bold uppercase tracking-widest">
                        Human-in-the-loop AI
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1]">
                        Expert Care, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-900">Whenever</span> You Need It
                    </h2>
                    
                    <p className="text-lg text-slate-500 leading-relaxed">
                        When the AI detects something that needs a human touch, connect with a licensed veterinarian in under 2 minutes. Our vets see your pet's full AI health history instantly
                    </p>

                    <div className="grid gap-4">
                        {[
                            { 
                                icon: <HiOutlineClock />, 
                                title: "2-Minute Connection", 
                                desc: "No appointments. No waiting rooms. Just instant care",
                                color: "text-blue-600"
                            },
                            { 
                                icon: <HiOutlineDocumentText />, 
                                title: "Data-Rich Consults", 
                                desc: "Vets receive the AI-generated report before the call starts",
                                color: "text-cyan-500"
                            }
                        ].map((item, i) => (
                            <div key={i} className="group p-5 rounded-2xl bg-slate-50 flex items-center gap-6">
                                <div className={`text-3xl ${item.color} `}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                                    <p className="text-sm text-slate-500">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link href={"/vet-appointment"} className="flex px-10 py-4 max-w-64 bg-primary text-white rounded-full font-semibold text-base shadow-xl shadow-pink-200 hover:bg-primaryHover">
                        Book a Discovery Call
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TeleVetSection;