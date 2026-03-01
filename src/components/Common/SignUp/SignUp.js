"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { HiOutlineArrowRight, HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi2";
import { PawPrint, Stethoscope } from "lucide-react";
import { useRegisterUserMutation } from "@/redux/services/userApi";
import { useRegisterVetMutation } from "@/redux/services/vetApi";

import Input from "../Form/Input";
import TinySpinner from "../Loader/TinySpinner";
import { GoogleLogin } from "@react-oauth/google";

const SignUpPage = ({ mode }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [registerUser, { isLoading: userLoading, error: userError }] = useRegisterUserMutation();
    const [registerVet, { isLoading: vetLoading, error: vetError }] = useRegisterVetMutation();

    const notify = (message, type) => {
        toast(message, { type: type, autoClose: 2000 });
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const mutation = mode === "user" ? registerUser : registerVet;
            const response = await mutation(formData);
            if (response.data) {
                notify(`${mode === "user" ? "User" : "Vet"} registration successful!`, "success");
                router.push(mode === "user" ? "/dashboard" : "/veterinarian/dashboard");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-white overflow-hidden">

            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-50 items-center justify-center p-12">
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
                    className="relative z-10 max-w-md"
                >
                    <div className="mb-8 w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200">
                        {mode === 'user' ? <PawPrint className="text-white w-8 h-8" /> : <Stethoscope className="text-white w-8 h-8" />}
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 leading-tight tracking-tighter mb-6">
                        Join the future of <span className="text-primary italic font-light">pet wellness.</span>
                    </h1>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">
                        {mode === 'user'
                            ? "Start tracking symptoms and managing your pet's health with AI-powered insights today."
                            : "Provide world-class digital care and stay connected with pet parents effortlessly."}
                    </p>
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
                            {mode === "user" ? "Create Pawfile" : "Vet Registration"}
                        </h2>
                        <p className="text-slate-500 font-medium mt-2">Enter your details to get started.</p>
                    </header>

                    <form onSubmit={handleRegistration} className="space-y-4">
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Full Name"
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                value={formData.fullName}
                                classNames="pl-12 py-4 bg-slate-50/50 border-slate-200 focus:border-primary focus:bg-white transition-all rounded-2xl"
                            />
                            <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                        </div>

                        <div className="relative">
                            <Input
                                type="email"
                                placeholder="Email Address"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                value={formData.email}
                                classNames="pl-12 py-4 bg-slate-50/50 border-slate-200 focus:border-primary focus:bg-white transition-all rounded-2xl"
                            />
                            <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    value={formData.password}
                                    classNames="pl-12 py-4 bg-slate-50/50 border-slate-200 focus:border-primary focus:bg-white transition-all rounded-2xl"
                                />
                                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                            </div>
                            <div className="relative">
                                <Input
                                    type="password"
                                    placeholder="Confirm"
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    value={formData.confirmPassword}
                                    classNames="pl-12 py-4 bg-slate-50/50 border-slate-200 focus:border-primary focus:bg-white transition-all rounded-2xl"
                                />
                                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                            </div>
                        </div>

                        {(userError || vetError) && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-500 font-bold px-2">
                                {(userError || vetError)?.data?.message || "An error occurred"}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            disabled={userLoading || vetLoading}
                            className="w-full py-3 bg-primary hover:bg-primaryHover text-white rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-pink-100 flex items-center justify-center gap-3 active:scale-[0.98]"
                        >
                            {userLoading || vetLoading ? <TinySpinner /> : (
                                <>Sign Up <HiOutlineArrowRight /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8">
                        <div className="relative flex items-center justify-center mb-6">
                            <hr className="w-full border-slate-100" />
                            <span className="absolute bg-white px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Or continue with</span>
                        </div>

                        <div className="w-full flex justify-center">
                            {/* <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-sm font-bold text-slate-700">
                                <Image src="/images/google.webp" alt="Google" width={18} height={18} /> Google
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

                        <p className="text-center text-slate-500 text-sm mt-8 font-medium">
                            Already have an account?{" "}
                            <Link href={mode === "user" ? "/signin" : "/veterinarian/signin"} className="text-primary font-black hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SignUpPage;