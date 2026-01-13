"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineBellAlert,
  HiOutlineChartBar,
  HiOutlineCheckCircle,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
  HiOutlineSparkles,
  HiShoppingCart,
  HiSparkles,
} from "react-icons/hi2";
import Image from "next/image";

const protocols = [
  {
    id: "demo-01",
    petName: "Max",
    breed: "Golden Retriever",
    age: "10 Years",
    indicator: "Senior Dog Wellness",
    overview:
      "Senior, large-breed dog with age-related wellness considerations",
    logic:
      "Based on age and breed, joint-support and mobility-focused supplements are commonly recommended for senior large dogs",
    product: "Omega-3 Joint Support Supplement",
    tag: "Demographic Match",
    image: "/images/omega3.webp",
  },
  {
    id: "demo-02",
    petName: "Luna",
    breed: "French Bulldog",
    age: "5 Months",
    indicator: "Puppy Growth Support",
    overview:
      "Young, small-breed puppy in an early growth and development stage",
    logic:
      "Puppies may benefit from balanced multivitamins to support normal growth when transitioning diets",
    product: "Daily Puppy Multivitamin",
    tag: "Life-Stage Match",
    image: "/images/multivitamin.webp",
  },
];

const SmartShopSection = () => {
  const [active, setActive] = useState(protocols[0]);

  return (
    <section
      className="py-24 bg-white relative overflow-hidden"
      aria-labelledby="petvetpals-smart-recommendations"
    >
      {/* SEO H1 (hidden but indexable) */}
      <h1 id="petvetpals-smart-recommendations" className="sr-only">
        PetVetPals Demographic-Based Pet Wellness Product Recommendations
      </h1>

      <div className="app-container relative z-10">
        {/* Header of the section */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            {/* <span className="h-px w-12 bg-primary" /> */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-widest">
              <HiOutlineSparkles className="animate-pulse" />
              Demographic-Based Recommendations
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">
            Smarter product choices <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-900">For every stage of life</span>
          </h2>

          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
            PetVetPals suggests pet wellness products using your pet’s age,
            breed, size, and life stage—helping you choose options commonly
            recommended for pets like yours.
          </p>
        </div>

        {/* Main Interface */}
        <div className="grid lg:grid-cols-12 gap-0 border border-slate-100 rounded-[4rem] bg-white shadow-2xl shadow-slate-200/50 overflow-hidden">
          {/* Left: Pet Selector */}
          <div className="lg:col-span-4 border-r border-slate-100 p-10 bg-slate-50/30">
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">
                Pet Profiles
              </p>

              {protocols.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActive(p)}
                  className={`w-full text-left p-6 rounded-3xl transition-all duration-500 border ${active.id === p.id
                    ? "bg-white border-pink-100 shadow-xl shadow-pink-100/20 scale-105"
                    : "border-transparent text-slate-400 grayscale opacity-60 hover:opacity-100"
                    }`}
                >
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">
                    {p.breed}
                  </p>
                  <h4 className="text-xl font-black text-slate-900">
                    {p.petName}{" "}
                    <span className="text-sm font-medium">({p.age})</span>
                  </h4>
                </button>
              ))}
            </div>

            <div className="mt-20 p-6 rounded-3xl bg-primary text-white space-y-4 max-md:hidden">
              <HiOutlineShoppingCart className="text-3xl" />
              <p className="text-sm font-medium leading-relaxed">
                Product recommendations are generated using pet demographics such as
                breed, age, size, and life stage.
              </p>
            </div>
          </div>

          {/* Right: Recommendation Panel */}
          <div className="lg:col-span-8 p-12 md:p-20 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-16 items-center"
              >
                {/* Explanation Column */}
                <div className="space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-widest">
                      <HiOutlineBellAlert className="text-lg" />
                      Pet Profile Overview
                    </div>
                    <p className="text-2xl font-bold text-slate-900 leading-tight">
                      {active.overview}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                      <HiOutlineChartBar className="text-lg" />
                      Recommendation Logic
                    </div>
                    <p className="text-lg text-slate-500 font-medium italic">
                      {active.logic}
                    </p>
                  </div>

                  <div className="pt-6">
                    <button
                      aria-label="View recommended product"
                      className="flex items-center gap-4 text-slate-900 font-black uppercase tracking-widest text-xs group"
                    >
                      <span className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                        <HiOutlineShoppingBag className="text-lg" />
                      </span>
                      View Recommendation
                    </button>

                    <p className="text-[11px] text-slate-400 mt-4">
                      Recommendations are not a substitute for veterinary
                      advice.
                    </p>
                  </div>
                </div>

                {/* Product Column */}
                <div className="relative flex flex-col items-center">
                  {/* <div className="absolute inset-0 bg-pink-50/50 rounded-full blur-3xl -z-10" /> */}
                  <Image
                    src={active.image}
                    alt={`${active.product} recommended for ${active.breed}`}
                    width={280}
                    height={280}
                    className="w-full max-w-[280px] h-auto object-contain mb-8"
                  />
                  <div className="text-center">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      {active.tag}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-3">
                      {active.product}
                    </h3>
                    <div className="mt-4 flex items-center justify-center gap-2 text-emerald-600 text-xs font-bold">
                      <HiOutlineCheckCircle />
                      Suitable for this pet profile
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartShopSection;
