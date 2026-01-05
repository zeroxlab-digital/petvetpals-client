"use client"
import Link from "next/link"
import { User, ShoppingBag, Stethoscope, ArrowUpRight, Sparkles, HeartPulse } from "lucide-react"
import { useUserAuthenticated } from "../../../hooks/useUserAuthenticated";

const FeaturesSection = () => {
    const { isAuthenticated: authUser } = useUserAuthenticated();

    const features = [
        {
            title: authUser ? "My Account" : "Register Today",
            subtitle: authUser ? "Manage your profile" : "Join our community",
            link: authUser ? "/dashboard" : "/signup",
            link_title: authUser ? "Dashboard" : "Sign Up",
            icon: User,
            gradient: "from-blue-500 via-blue-600 to-indigo-600",
            glowColor: "shadow-blue-500/25",
        },
        {
            title: "AI-Powered Pet Health Tools",
            subtitle: "Symptom checker, health tracker & more",
            link: "/dashboard",
            link_title: "Explore Tools",
            icon: HeartPulse,
            gradient: "from-fuchsia-500 via-purple-600 to-indigo-600",
            glowColor: "shadow-fuchsia-500/25",
        },
        {
            title: "Online Vet",
            subtitle: "Expert consultations",
            link: "/vet-appointment",
            link_title: "Book Now",
            icon: Stethoscope,
            gradient: "from-orange-500 via-red-500 to-pink-600",
            glowColor: "shadow-orange-500/25",
        },
        {
            title: "Foods & Accessories",
            subtitle: "Premium pet supplies",
            link: "/shop",
            link_title: "Shop Now",
            icon: ShoppingBag,
            gradient: "from-emerald-500 via-green-600 to-teal-600",
            glowColor: "shadow-emerald-500/25",
        }
    ]

    return (
        <section className="app-container mx-auto px-4 mt-14 mb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => {
                    const IconComponent = feature.icon
                    return (
                        <Link key={index} href={feature.link} className="group">
                            <div className="relative overflow-hidden">
                                {/* Main Card */}
                                <div
                                    className={`relative bg-gradient-to-br ${feature.gradient} rounded-2xl p-6 shadow-xl ${feature.glowColor} hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105`}
                                >
                                    {/* Animated Background Pattern */}
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
                                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-500"></div>
                                    </div>

                                    {/* Sparkle Effect */}
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Sparkles className="h-4 w-4 text-white animate-pulse" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl border border-white/30">
                                                <IconComponent className="h-6 w-6 text-white" />
                                            </div>
                                            <ArrowUpRight className="h-5 w-5 text-white/70 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-white font-bold text-lg leading-tight">{feature.title}</h3>
                                            <p className="text-white/80 text-sm font-medium">{feature.subtitle}</p>

                                            <div className="pt-2">
                                                <span className="inline-flex items-center text-white/90 text-sm font-semibold group-hover:text-white transition-colors">
                                                    {feature.link_title}
                                                    <div className="ml-2 w-0 group-hover:w-4 transition-all duration-300 overflow-hidden">
                                                        <div className="h-0.5 bg-white rounded-full"></div>
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Glow Effect */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Bottom Reflection */}
                                <div
                                    className={`absolute -bottom-2 left-2 right-2 h-4 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300`}
                                ></div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default FeaturesSection
