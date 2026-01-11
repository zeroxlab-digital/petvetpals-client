"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    HiOutlineAdjustmentsHorizontal, 
    HiOutlineArrowPath, 
    HiCheck,
    HiChevronDown
} from 'react-icons/hi2';

const VetFilterSidebar = ({ setFilterChange, vets, isLoading }) => {
    const [filters, setFilters] = useState({ specialities: [], sortBy: "Relevance" });
    const [openMobile, setOpenMobile] = useState(false);

    const specialties = ["General Veterinary", "Dermatology", "Dentistry", "Internal Medicine"];
    const sortOptions = [
        { id: 'Relevance', label: 'Recommended' },
        { id: 'Popularity', label: 'Top Rated' },
        { id: 'Experience', label: 'Most Experienced' },
        { id: 'Fee', label: 'Price: Low to High' }
    ];

    const handleSpeciality = (val) => {
        const updated = filters.specialities.includes(val)
            ? filters.specialities.filter(s => s !== val)
            : [...filters.specialities, val];
        const state = { ...filters, specialities: updated };
        setFilters(state);
        setFilterChange(state);
    };

    const handleSort = (val) => {
        const state = { ...filters, sortBy: val };
        setFilters(state);
        setFilterChange(state);
    };

    return (
        <div className='border-r border-r-slate-100'>
            {/* MOBILE NAVIGATION BAR with thump reach*/}
            <div className="xl:hidden flex items-center gap-2 mb-6 w-full">
                <button 
                    onClick={() => setOpenMobile(true)}
                    className="flex-1 flex items-center justify-between bg-white border border-slate-200 px-5 py-3 rounded-2xl shadow-sm active:bg-slate-50"
                >
                    <div className="flex items-center gap-3">
                        <HiOutlineAdjustmentsHorizontal className="text-slate-500" />
                        <span className="text-sm font-semibold text-slate-700">Filter & Sort</span>
                    </div>
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded-md">
                        {filters.specialities.length > 0 ? filters.specialities.length : vets.length}
                    </span>
                </button>
            </div>

            {/* THIS DESKTOP SIDEBAR */}
            <aside className="sticky top-28 max-xl:hidden w-72 h-fit space-y-8">

                <div className="pb-6 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Search Directory</h3>
                    <p className="text-xs text-slate-500 mt-1">Showing {vets.length} verified specialists</p>
                </div>

                <section>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4 block">Sort Results</label>
                    <div className="space-y-1">
                        {sortOptions.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => handleSort(opt.id)}
                                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all ${
                                    filters.sortBy === opt.id 
                                    ? 'bg-slate-900 text-white font-medium shadow-md shadow-slate-200' 
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                {opt.label}
                                {filters.sortBy === opt.id && <HiCheck className="text-white" />}
                            </button>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Specialties</label>
                        {filters.specialities.length > 0 && (
                            <button 
                                onClick={() => {
                                    const reset = { ...filters, specialities: [] };
                                    setFilters(reset);
                                    setFilterChange(reset);
                                }}
                                className="text-[10px] font-bold text-primary hover:underline"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                    <div className="space-y-2">
                        {specialties.map((s) => (
                            <div 
                                key={s}
                                onClick={() => handleSpeciality(s)}
                                className="group flex items-center gap-3 cursor-pointer"
                            >
                                <div className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center ${
                                    filters.specialities.includes(s) 
                                    ? 'bg-primary border-primary' 
                                    : 'bg-white border-slate-200 group-hover:border-slate-400'
                                }`}>
                                    {filters.specialities.includes(s) && <HiCheck className="text-white text-xs" />}
                                </div>
                                <span className={`text-sm transition-colors ${
                                    filters.specialities.includes(s) ? 'text-slate-900 font-semibold' : 'text-slate-600'
                                }`}>
                                    {s}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="pt-4">
                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4 block text-center">Price Range</label>
                        <input 
                            type="range" min="10" max="500" 
                            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                        />
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-xs font-bold text-slate-700">$10</span>
                            <div className="h-px w-8 bg-slate-200" />
                            <span className="text-xs font-bold text-slate-700">$500+</span>
                        </div>
                    </div>
                </section>
            </aside>

            {/* Mobile Modal */}
            <AnimatePresence>
                {openMobile && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setOpenMobile(false)}
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
                        />
                        <motion.div 
                            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 w-full bg-white rounded-t-[2.5rem] z-[110] p-8 shadow-2xl overflow-hidden"
                        >
                            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />
                            <div className="space-y-8 max-h-[70vh] overflow-y-auto">
                                <section>
                                    <h4 className="text-lg font-bold text-slate-900 mb-4">Sort By</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {sortOptions.map(o => (
                                            <button 
                                                key={o.id}
                                                onClick={() => handleSort(o.id)}
                                                className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                                                    filters.sortBy === o.id ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-100 text-slate-500'
                                                }`}
                                            >
                                                {o.label}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h4 className="text-lg font-bold text-slate-900 mb-4">Specialties</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {specialties.map(s => (
                                            <button 
                                                key={s}
                                                onClick={() => handleSpeciality(s)}
                                                className={`py-3 px-5 rounded-full text-xs font-bold transition-all ${
                                                    filters.specialities.includes(s) ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
                                                }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </section>
                                
                                <button 
                                    onClick={() => setOpenMobile(false)}
                                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold mt-4 shadow-lg shadow-slate-200"
                                >
                                    Show {vets.length} Results
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VetFilterSidebar;