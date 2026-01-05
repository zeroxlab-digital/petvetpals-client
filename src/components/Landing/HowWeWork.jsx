"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineSparkles } from "react-icons/hi2";

const HowWeWorkSection = () => {
    return (
        <section className='py-24 bg-white overflow-hidden'>
            <div className='app-container'>
                <div className='grid lg:grid-cols-2 gap-16 items-center'>
                    
                    {/* Left: Section Content Block with Premium Typography */}
                    <div className='relative z-10'>
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className='space-y-8'
                        >
                            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]'>
                                <HiOutlineSparkles className="text-primary" /> Human-Led, AI-Powered
                            </div>
                            
                            <h3 className='text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter'>
                                Care That Puts Your Pet at the <span className='text-primary italic font-light'>Center</span>
                            </h3>

                            <p className='text-xl text-slate-500 leading-relaxed max-w-lg'>
                                PetVetPals focuses on providing pets with continuous, data-driven care for longer, healthier lives through a seamless digital ecosystem
                            </p>

                            <div className='flex flex-col sm:flex-row gap-6 pt-4'>
                                <Link href="/how-it-works" className='group flex items-center gap-4 text-sm font-black uppercase tracking-widest text-slate-900 hover:text-primary transition-colors'>
                                    Explore the platform 
                                    <span className='w-12 h-[2px] bg-slate-200 relative overflow-hidden'>
                                        <motion.span 
                                            initial={{ x: "-100%" }}
                                            whileHover={{ x: "100%" }}
                                            transition={{ duration: 0.5 }}
                                            className='absolute inset-0 bg-primary'
                                        />
                                    </span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: The "Visual Window" */}
                    <div className='relative'>
                        {/* Decorative Background Elements */}
                        <div className='absolute -top-20 -right-20 w-80 h-80 bg-blue-50 rounded-full blur-[100px] -z-10' />
                        <div className='absolute -bottom-20 -left-20 w-80 h-80 bg-purple-50 rounded-full blur-[100px] -z-10' />

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1, ease: "circOut" }}
                            className='relative'
                        >
                            {/* The Main Image with a Floating Effect */}
                            <div className='relative rounded-[3rem] overflow-hidden '>
                                <Image
                                    src="/images/petvetpals-call.png"
                                    alt="Professional Vet Consultation"
                                    width={1200}
                                    height={1200}
                                    quality={100}
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                            {/* Floating  Indicator */}
                            <motion.div 
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className='absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-50 hidden md:block'
                            >
                                <div className='flex items-center gap-4'>
                                    <div className='w-3 h-3 bg-emerald-500 rounded-full animate-pulse' />
                                    <div>
                                        <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Encryption</p>
                                        <p className='text-sm font-bold text-slate-900'>Secure Health Link Active</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowWeWorkSection;