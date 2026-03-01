"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { HiOutlineArrowRight, HiOutlineEnvelope, HiOutlineLockClosed } from "react-icons/hi2";
import { PawPrint, Stethoscope, Sparkles } from "lucide-react";
import { useSignInUserMutation } from "@/redux/services/userApi";
import { useLoginVetMutation } from "@/redux/services/vetApi";

import Input from "../Form/Input";
import TinySpinner from "../Loader/TinySpinner";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

const SignInPage = ({ mode }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [signInUser, { isLoading: userLoading, error: userError }] = useSignInUserMutation();
    const [loginVet, { isLoading: vetLoading, error: vetError }] = useLoginVetMutation();

    const isLoading = userLoading || vetLoading;
    const apiError = userError || vetError;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const mutation = mode === 'user' ? signInUser : loginVet;
            const response = await mutation(formData);

            if (response.data?.success || response.data?.success === "true") {
                toast.success("Welcome back!", { autoClose: 2000 });
                router.push(mode === 'user' ? "/dashboard" : "/veterinarian/dashboard");
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-white overflow-hidden">

            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-50 items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                    <Image
                        src={mode === 'user' ? "/images/dog-white-yellow.jpg" : "/images/cat-vet.jpg"}
                        alt="Background"
                        fill
                        className="object-cover grayscale-[20%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-white via-white/20 to-transparent" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 max-w-md text-white"
                >
                    <div className="mb-8 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-500/20">
                        {mode === 'user' ? <PawPrint className="w-8 h-8" /> : <Stethoscope className="w-8 h-8" />}
                    </div>
                    <h1 className="text-5xl text-primary font-black leading-tight tracking-tighter mb-6">
                        Good to see <br />
                        <span className="text-primary italic font-light">you again.</span>
                    </h1>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">
                        {mode === 'user'
                            ? "Your pet's health insights and AI-powered records are just a few clicks away."
                            : "Access your clinical dashboard and stay connected with your patients effortlessly."}
                    </p>

                    <div className="mt-12 p-4 rounded-2xl bg-white/30 border border-white/10 backdrop-blur-2xl inline-flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-xs text-blue-400 font-bold tracking-wide">Syncing your digital clinic...</span>
                    </div>
                </motion.div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white relative">

                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: `linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
                />

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md z-10"
                >
                    <header className="mb-10 max-lg:text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4">
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                                {mode === 'user' ? "Pet Parent Access" : "Veterinary Partner"}
                            </span>
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                            {mode === "user" ? "Sign In" : "Vet Portal"}
                        </h2>
                        <p className="text-slate-500 font-medium mt-2">Access your PetVetPals account.</p>
                    </header>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative group">
                            <Input
                                type="email"
                                placeholder="Email Address"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                value={formData.email}
                                classNames="pl-12 py-4 bg-slate-50 border-transparent focus:border-primary focus:bg-white transition-all rounded-2xl text-sm"
                            />
                            <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-primary transition-colors" />
                        </div>

                        <div className="relative group">
                            <Input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                value={formData.password}
                                classNames="pl-12 py-4 bg-slate-50 border-transparent focus:border-primary focus:bg-white transition-all rounded-2xl text-sm"
                            />
                            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-primary transition-colors" />
                        </div>

                        <div className="flex justify-end px-1">
                            <Link href="/forgot-password" size="sm" className="text-xs font-black text-primary uppercase tracking-widest underline">
                                Forgot Password?
                            </Link>
                        </div>

                        {apiError && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-red-50 border border-red-100 rounded-xl">
                                <p className="text-xs text-red-500 font-bold text-center">
                                    {apiError?.data?.message || "Invalid credentials. Please try again."}
                                </p>
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-primary hover:bg-primaryHover text-white rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-[0.98] group"
                        >
                            {isLoading ? <TinySpinner /> : (
                                <>Sign In <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8">
                        <div className="relative flex items-center justify-center mb-8">
                            <hr className="w-full border-slate-100" />
                            <span className="absolute bg-white px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Or Continue With</span>
                        </div>

                        <div className="">
                            {/* <button onClick={() => handleGoogleLogin()} className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-xs font-bold text-slate-700">
                                <Image src="/images/google.webp" alt="Google" width={16} height={16} /> Continue with Google
                            </button> */}
                            <GoogleLogin
                                onSuccess={async (credentialResponse) => {
                                    try {
                                        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/user/google`,
                                            {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                credentials: "include",
                                                body: JSON.stringify({ credential: credentialResponse.credential })
                                            });
                                        const data = await res.json();
                                        if (data.success) {
                                            toast.success(`Welcome!`, { autoClose: 2000 });
                                        } else {
                                            toast.error(data.message);
                                        }
                                        router.push(mode === "user" ? "/dashboard" : "/veterinarian/dashboard");
                                    } catch (err) {
                                        toast.error("Google sign-in failed.");
                                    }
                                }}
                                onError={() => toast.error("Google sign-in failed.")}
                                width="100%"
                                size="large"
                                theme="outline"
                                shape="pill"
                                text="continue_with"
                                logo_alignment="center"
                            />
                        </div>

                        <p className="text-center text-slate-500 text-sm mt-10 font-medium">
                            Don't have an account?{" "}
                            <Link href={mode === "user" ? "/signup" : "/veterinarian/signup"} className="text-primary font-black tracking-widest hover:underline ml-1">
                                Create One
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SignInPage;