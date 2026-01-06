"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    HiOutlineSparkles,
    HiOutlineShieldCheck,
    HiSparkles
} from "react-icons/hi2";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { ShoppingBag } from "lucide-react";
import Button from "@/components/Common/Button/Button";
import ProductModal from "./ProductModal";

const suggested_products = [
    // {
    //     id: "p1",
    //     name: "Cosequin Maximum Strength Plus MSM",
    //     brand: "Nutramax Laboratories",
    //     price: "$39.99",
    //     category: "Mobility",
    //     matchScore: 98,
    //     reason: "Recommended for senior dogs showing early joint stiffness and reduced mobility.",
    //     image: "/images/med1.webp",
    //     description:
    //         "Veterinarian-recommended joint health supplement containing glucosamine, chondroitin, MSM, and omega-3s to support cartilage health and joint flexibility."
    // },
    // {
    //     id: "p2",
    //     name: "Purina Pro Plan FortiFlora Probiotic",
    //     brand: "Purina Pro Plan",
    //     price: "$31.50",
    //     category: "Digestive",
    //     matchScore: 95,
    //     reason: "Matches recent digestive sensitivity patterns detected in stool and diet logs.",
    //     image: "/images/med2.webp",
    //     description:
    //         "Clinically proven probiotic supplement with guaranteed live cultures to support digestive health and strengthen the immune system."
    // },
    // {
    //     id: "p3",
    //     name: "Zesty Paws Aller-Immune Bites",
    //     brand: "Zesty Paws",
    //     price: "$29.99",
    //     category: "Skin & Coat",
    //     matchScore: 93,
    //     reason: "Ideal for seasonal allergies and excessive scratching indicators.",
    //     image: "/images/med3.webp",
    //     description:
    //         "Soft chew supplement formulated with colostrum, probiotics, and omega fatty acids to support immune response and healthy skin."
    // },
    // {
    //     id: "p4",
    //     name: "Vet’s Best Advanced Allergy Relief Shampoo",
    //     brand: "Vet’s Best",
    //     price: "$16.99",
    //     category: "Skin Care",
    //     matchScore: 90,
    //     reason: "Supports relief from itching and irritation related to environmental allergens.",
    //     image: "/images/med4.webp",
    //     description:
    //         "Plant-based therapeutic shampoo with aloe vera and essential oils to soothe itchy skin and maintain a healthy coat."
    // }
];

const SmartShopping = ({ selectedPet }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    const renderEmptyState = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-[380px] flex flex-col items-center justify-center p-8 text-center"
        >
            <div className="relative mb-6">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                    <HiOutlineShieldCheck className="text-4xl text-slate-500" />
                </div>

                <span className="absolute -bottom-1 -right-2 text-[9px] font-black uppercase tracking-widest
                       bg-amber-50 text-amber-700 border border-amber-100 px-2 py-1 rounded-full">
                    Beta
                </span>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">
                Smart Shopping Coming Online
            </h3>

            <p className="text-slate-500 max-w-[330px] text-sm leading-relaxed">
                This feature is currently rolling out and may not yet be fully available
                for <span className="font-semibold text-slate-700">{selectedPet?.name}</span>.
                Product recommendations will appear automatically as more health and
                activity data is collected.
            </p>

            <div className="mt-4 px-4 py-2 rounded-full bg-slate-50 border border-slate-100
                    text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Limited availability
            </div>

            <p className="mt-4 text-[11px] text-slate-400 max-w-[300px] leading-relaxed">
                No action is required. This module will activate automatically when
                sufficient data is available.
            </p>
        </motion.div>
    );

    return (
        <div className="bg-white rounded-xl border shadow-sm md:col-span-4 flex flex-col">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b p-4">
                <div>
                    <h3 className="flex items-center text-lg font-semibold text-primary">
                        <ShoppingBag className="mr-2 h-5 w-5 " />
                        Smart Shopping
                    </h3>
                    <p className="text-sm text-gray-500">AI-Powered shopping experience for {selectedPet?.name}</p>
                </div>
                {!isLoading && (
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 text-[10px] font-bold uppercase tracking-wider">
                        <HiOutlineShieldCheck className="text-lg" /> Data-Sync Active
                    </div>
                )}
            </div>

            <AnimatePresence mode="wait">
                {
                    isLoading ?
                        (
                            /* Scanning State */
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-[400px] flex flex-col items-center justify-center space-y-6 text-center"
                            >
                                <div className="relative w-24 h-24">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 border-4 border-blue-100 border-t-blue-600 rounded-full"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <HiOutlineSparkles className="text-3xl text-blue-600" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-slate-900 font-black text-xl tracking-tight">AI is analyzing {selectedPet?.name}'s biometrics...</p>
                                    <p className="text-slate-400 text-sm font-medium italic">Cross-referencing 42+ clinical markers</p>
                                </div>
                            </motion.div>
                        )
                        :
                        suggested_products.length > 0 ?
                            (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="relative py-14"
                                >
                                    <Swiper
                                        effect={'coverflow'}
                                        grabCursor={true}
                                        centeredSlides={true}
                                        slidesPerView={'auto'}
                                        coverflowEffect={{
                                            rotate: 0,
                                            stretch: 0,
                                            depth: 100,
                                            modifier: 2.5,
                                            slideShadows: false,
                                        }}
                                        pagination={true}
                                        modules={[EffectCoverflow, Pagination]}
                                        className="pb-16"
                                    >
                                        {suggested_products.map((product) => (
                                            <SwiperSlide key={product.id} className="max-w-[340px] lg:max-w-[380px]">
                                                <div className="group relative bg-white rounded-[2.5rem] border border-slate-100 p-4 shadow-xl shadow-slate-200/40 transition-all duration-500 flex flex-col h-full">

                                                    {/* 1. Perfected Visual Stage */}
                                                    <div className="relative aspect-[1/1] rounded-[2rem] overflow-hidden mb-6 bg-gradient-to-b from-[#FDFBF9] to-[#F3F4F6] flex items-center justify-center">
                                                        {/* Subtle radial glow to make the product "pop" */}
                                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent)] pointer-events-none" />

                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-out z-10"
                                                        />

                                                        {/* AI Confidence Badge - Minimalist Glassmorphism */}
                                                        <div className="absolute top-4 left-4 bg-white/60 backdrop-blur-3xl px-3 py-2 rounded-xl border border-white/40 shadow-sm z-20">
                                                            <span className="text-[9px] font-black text-primary leading-none flex items-center gap-1 uppercase">
                                                                <HiSparkles className="text-xs" /> ai match {product.matchScore}%</span>
                                                        </div>

                                                    </div>

                                                    <div className="px-2 pb-2 flex-grow space-y-4">
                                                        <div>
                                                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">
                                                                {product.brand}
                                                            </p>
                                                            <h3 className="text-xl font-bold text-slate-900 leading-tight">
                                                                {product.name}
                                                            </h3>
                                                        </div>

                                                        <div className="bg-pink-50/40 rounded-2xl p-4 border border-pink-100/30">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                                                <span className="text-[9px] font-black text-primary uppercase tracking-wider">AI Recommendation</span>
                                                            </div>
                                                            <p className="text-xs text-slate-600 leading-relaxed font-medium italic">
                                                                We recommend this for your pet's **high-energy personality**. It's built to withstand heavy play and stimulate natural instincts
                                                            </p>
                                                        </div>

                                                        <div className="flex items-center justify-between pt-4 mt-auto border-t border-slate-50">
                                                            <div className="flex flex-col">
                                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Est. Price</span>
                                                                <span className="text-2xl font-black text-slate-900 tracking-tighter">{product.price}</span>
                                                            </div>

                                                            <Button
                                                                size={'lg'}
                                                                onClick={() => setSelectedProduct(product)}
                                                                classNames="group/btn relative overflow-hidden px-7 py-3.5 bg-slate-900 text-white rounded-xl transition-all hover:bg-primary active:scale-95 shadow-lg shadow-slate-200"
                                                            >
                                                                <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">
                                                                    View Details
                                                                </span>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </motion.div>
                            )
                            :
                            (
                                renderEmptyState()
                            )
                }
            </AnimatePresence>
            <ProductModal selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
        </div>
    );
};

export default SmartShopping;