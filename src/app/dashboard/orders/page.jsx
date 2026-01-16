"use client";
import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, PackageOpen, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const page = () => {
    return (
        <div className="py-20 flex flex-col items-center justify-center px-6 text-center">

            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mb-8"
            >
                <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center border-2 border-dashed border-slate-200">
                    <PackageOpen size={56} className="text-slate-300" />
                </div>

                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute -top-2 -right-2 bg-white p-3 rounded-2xl shadow-xl border border-slate-100"
                >
                    <Search size={20} className="text-primary" />
                </motion.div>
            </motion.div>

            <h2 className="text-2xl font-black text-slate-900 mb-3">No orders found!</h2>
            <p className="text-slate-500 max-w-[280px] mx-auto leading-relaxed mb-10">
                It looks like you haven&apos;t placed any orders yet. Treat your furry friend to something special!
            </p>

            <div className="flex flex-col w-full max-w-xs gap-3">
                <Link href="/dashboard" className="w-full">
                    <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all">
                        <ShoppingBag size={18} />
                        Browse the Shop
                    </button>
                </Link>
                
                <Link href="/dashboard/vet-gpt" className="w-full">
                    <button className="w-full py-4 bg-white text-slate-600 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2 active:scale-95 transition-all">
                        Get AI Recommendations
                        <ArrowRight size={18} className="text-slate-400" />
                    </button>
                </Link>
            </div>

            {/* <div className="mt-16 pt-8 border-t border-slate-100 w-full max-w-md">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                    Quick Links
                </p>
                <div className="flex justify-center gap-6">
                    <Link href="/pharmacy" className="text-xs font-bold text-slate-500 hover:text-primary transition-colors">Pharmacy</Link>
                    <Link href="/supplies" className="text-xs font-bold text-slate-500 hover:text-primary transition-colors">Pet Supplies</Link>
                    <Link href="/deals" className="text-xs font-bold text-slate-500 hover:text-primary transition-colors">Daily Deals</Link>
                </div>
            </div> */}
        </div>
    );
};

export default page;