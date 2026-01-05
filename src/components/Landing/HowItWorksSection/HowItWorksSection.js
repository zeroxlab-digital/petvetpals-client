"use client";
import { motion } from "framer-motion";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineArrowLongRight, HiOutlineShoppingBag, HiOutlineSparkles, HiOutlineVideoCamera } from "react-icons/hi2";
// import { 
//   HiOutlinePencilAlt, 
//   HiOutlineVideoCamera, 
//   HiOutlineSparkles, 
//   HiOutlineShoppingBag,
//   HiOutlineArrowLongRight
// } from "react-icons/hi2";

const steps = [
  {
    icon: <HiOutlinePencilAlt />,
    title: "Onboard Your Pet",
    subtitle: "Digital Health Twin",
    description: "Our AI creates a Digital Twin of your pet by analyzing breed genetics, age, and local environmental data.",
    color: "from-purple-500 to-indigo-600",
    lightColor: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  {
    icon: <HiOutlineVideoCamera />,
    title: "AI Symptom Scan",
    subtitle: "Precision Diagnostics",
    description: "Scan symptoms via video or photo. Our AI identifies anomalies and suggests the best vet match instantly.",
    color: "from-blue-500 to-cyan-600",
    lightColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    icon: <HiOutlineSparkles />,
    title: "Expert Consultation",
    subtitle: "Human + AI Insight",
    description: "Join a virtual call where your vet uses our AI insights to provide a level of care never before possible.",
    color: "from-emerald-500 to-teal-600",
    lightColor: "bg-emerald-50",
    iconColor: "text-emerald-600"
  },
  {
    icon: <HiOutlineShoppingBag />,
    title: "Smart Recovery",
    subtitle: "Tailored Care Plan",
    description: "Receive AI-curated supplements and digital prescriptions delivered to your door in one click.",
    color: "from-rose-500 to-orange-600",
    lightColor: "bg-rose-50",
    iconColor: "text-rose-600"
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-24 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-24 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-[120px]" />
      </div>

      <div className="app-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            The PetVetPals Journey
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
            Smarter Care in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-900">Four Simple Steps.</span>
          </h2>
          <p className="text-lg text-slate-500">
            We've combined veterinary expertise with cutting-edge AI to make keeping your pet healthy easier than ever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Decorative Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/3 left-0 w-full h-[2px] bg-slate-100 -z-10">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-rose-500"
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-200/30 transition-all duration-500 flex flex-col items-center text-center">
                
                {/* Step Number Badge */}
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white font-bold text-xs bg-gradient-to-r ${step.color}`}>
                  STEP 0{index + 1}
                </div>

                {/* Icon Container */}
                <div className={`w-20 h-20 rounded-3xl ${step.lightColor} flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  <div className={step.iconColor}>
                    {step.icon}
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">{step.subtitle}</p>
                    <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Micro-CTA (Hover Only) */}
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-900">
                    Learn More <HiOutlineArrowLongRight className="text-lg" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;