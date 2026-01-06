import Button from "@/components/Common/Button/Button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React from "react";
import { HiOutlineShoppingBag, HiOutlineXMark, HiSparkles } from "react-icons/hi2";

const ProductModal = ({ setSelectedProduct, selectedProduct }) => {
    return (
        <AnimatePresence>
            {selectedProduct && (
                <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProduct(null)}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-4xl bg-white rounded-t-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[95vh] md:max-h-[85vh]"
                    >
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-slate-100 active:scale-90 transition-transform"
                        >
                            <HiOutlineXMark className="text-2xl text-slate-900" />
                        </button>

                        <div className="relative w-full md:w-1/2 bg-[#F6F6F6] flex items-center justify-center
                h-[320px] sm:h-[400px] md:h-auto">
                            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-100 via-transparent to-transparent" />
                            <Image
                                src={selectedProduct.image}
                                fill
                                className="relative z-10 object-contain"
                                alt={selectedProduct.name}
                                priority
                            />

                            <div className="absolute bottom-8 left-0 right-0 flex justify-center px-4">
                                <div className="bg-white/80 backdrop-blur-md border border-white px-4 py-2 rounded-2xl shadow-sm flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="pet" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">
                                        Trusted by 2k+ similar breeds
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 p-8 lg:p-12 overflow-y-auto bg-white flex flex-col">
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.25em]">
                                        {/* <div className="w-2 h-2 rounded-full bg-primary animate-pulse" /> */}
                                        <HiSparkles className="text-primary text-base" />
                                        AI Analysis Report
                                    </div>
                                    <div className="bg-pink-50/50 rounded-[1rem] p-5 border border-pink-100/50">
                                        <p className="text-slate-700 text-sm leading-relaxed italic font-medium">
                                            {selectedProduct.reason}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">{selectedProduct.brand}</p>
                                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-[1.1]">
                                        {selectedProduct.name}
                                    </h3>
                                    <p className="text-slate-500 text-base leading-relaxed">
                                        {selectedProduct.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-2">
                                    <div className="p-3 border border-slate-100 rounded-xl">
                                        <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Durability</p>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((s) => <div key={s} className="h-1 flex-1 bg-primary rounded-full" />)}
                                        </div>
                                    </div>
                                    <div className="p-3 border border-slate-100 rounded-xl">
                                        <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Stimulation</p>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4].map((s) => <div key={s} className="h-1 flex-1 bg-primary rounded-full" />)}
                                            <div className="h-1 flex-1 bg-slate-100 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-8 space-y-4">
                                <div className="flex items-end justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Est. Price</span>
                                        <span className="text-4xl font-black text-slate-900 tracking-tighter">{selectedProduct.price}</span>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">Verified Stock</span>
                                    </div>
                                </div>

                                <Button classNames={"w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-slate-200 flex items-center justify-center gap-4 hover:bg-primary transition-all active:scale-[0.98]"}>
                                    Get it Now <HiOutlineShoppingBag className="text-xl" />
                                </Button>

                                <div className="flex items-center justify-center gap-2 opacity-50">
                                    <div className="h-[1px] flex-1 bg-slate-200" />
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Secure Partner Transaction</p>
                                    <div className="h-[1px] flex-1 bg-slate-200" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default ProductModal;