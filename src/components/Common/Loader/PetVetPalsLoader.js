"use client"
import { motion } from "framer-motion"
import { Cat, Dog } from "lucide-react"

export function PetVetPalsLoader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white">
            <div className="relative">
                {/* Main container for the animation */}
                <motion.div initial="hidden" animate="visible" className="relative">
                    {/* Brand name with reveal effect */}
                    <motion.div
                        className="relative flex items-center justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="text-4xl font-bold tracking-tight"
                            initial={{ clipPath: "inset(0 100% 0 0)" }}
                            animate={{ clipPath: "inset(0 0% 0 0)" }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                PetVet
                            </span>
                            <span className="text-indigo-950">Pals</span>
                        </motion.div>

                        {/* Sliding line underneath */}
                        <motion.div
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-violet-600"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            style={{ transformOrigin: "left" }}
                        />
                    </motion.div>

                    {/* Icons container */}
                    <div className="relative mt-6 flex justify-center">
                        {/* Cat icon with trail effect */}
                        <motion.div
                            className="relative"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Cat size={28} className="text-indigo-600" strokeWidth={2.5} />
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute inset-0"
                                    initial={{ opacity: 0.3, x: -15 }}
                                    animate={{ opacity: 0, x: -30 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.2,
                                        ease: "easeOut",
                                    }}
                                >
                                    <Cat size={28} className="text-indigo-400" strokeWidth={2.5} />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Center dot */}
                        <motion.div
                            className="mx-3 mt-3 h-1 w-1 rounded-full bg-indigo-600"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        />

                        {/* Dog icon with trail effect */}
                        <motion.div
                            className="relative"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Dog size={28} className="text-violet-600" strokeWidth={2.5} />
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute inset-0"
                                    initial={{ opacity: 0.3, x: 15 }}
                                    animate={{ opacity: 0, x: 30 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.2,
                                        ease: "easeOut",
                                    }}
                                >
                                    <Dog size={28} className="text-violet-400" strokeWidth={2.5} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Loading bar */}
                    <motion.div
                        className="mt-8 h-1 w-32 mx-auto overflow-hidden rounded-full bg-indigo-100"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                    >
                        <motion.div
                            className="h-full bg-gradient-to-r from-indigo-600 to-violet-600"
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{
                                duration: 0.8,
                                ease: "easeInOut",
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                            }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
