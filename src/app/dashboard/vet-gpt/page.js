import React from "react";
import Link from "next/link";
import { PawPrint, Bone, Zap, Dog } from "lucide-react";

const page = () => {
  const features = [
    {
      title: "AI Symptom Checker",
      href: "vet-gpt/symptom-checker",
      icon: <PawPrint className="w-12 h-12 text-pink-500" />,
      bg: "from-pink-100 to-pink-300",
    },
    {
      title: "Nutrition Guru",
      href: "vet-gpt/nutrition-guru",
      icon: <Bone className="w-12 h-12 text-green-500" />,
      bg: "from-green-100 to-green-300",
    },
    {
      title: "Allergy & Itch Coach",
      href: "vet-gpt/allergy-itch-coach",
      icon: <Zap className="w-12 h-12 text-purple-500" />,
      bg: "from-purple-100 to-purple-300",
    },
    {
      title: "PetFit AI",
      href: "vet-gpt/petfit-ai",
      icon: <Dog className="w-12 h-12 text-yellow-500" />,
      bg: "from-yellow-100 to-yellow-300",
    },
  ];

  return (
    <div className="min-h-full flex flex-col items-center justify-center py-12 max-sm:py-6 px-4 max-sm:px-2">
      <h1 className="text-3xl font-bold mb-12 text-gray-800 text-center max-sm:hidden">
        VetGPT AI Features
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {features.map((feature, idx) => (
          <Link
            key={idx}
            href={feature.href}
            className={`group relative rounded-3xl shadow-xl overflow-hidden bg-gradient-to-br ${feature.bg} p-6 flex flex-col items-center justify-center text-gray-900 transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl`}
          >
            {/* Soft icon circle background */}
            <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center mb-4">
              {feature.icon}
            </div>

            <h2 className={`text-slate-700 max-sm:text-lg font-semibold text-center`}>{feature.title}</h2>
            <div className="sm:opacity-0 group-hover:opacity-100 transition-opacity text-sm text-gray-700 mt-2">
              Explore →
            </div>

            {/* Optional floating gradient overlay for extra depth */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-tr from-white/10 to-black/5"></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;