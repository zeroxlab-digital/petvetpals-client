"use client"
import { useState, useEffect } from "react"
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { Activity, Calendar, Bell, Heart, Zap, Bone, Fish, Carrot } from "lucide-react"
import { useRouter } from "next/navigation"
import { useUserAuthenticated } from "../../../../hooks/useUserAuthenticated";

const PetHealthTrackerSection = () => {
  const {isAuthenticated: authUser} = useUserAuthenticated();
  const router = useRouter();
  const [currentFeature, setCurrentFeature] = useState(0)
  const controls = useAnimation()
  const y = useMotionValue(0)
  const opacity = useTransform(y, [-100, 0, 100], [0, 1, 0])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    controls.start({ rotateY: currentFeature * 90 })
  }, [currentFeature, controls])

  const features = [
    { icon: <Activity className="w-12 h-12 text-indigo-500" />, title: "Activity Tracking" },
    { icon: <Calendar className="w-12 h-12 text-green-500" />, title: "Appointment Reminders" },
    { icon: <Bell className="w-12 h-12 text-yellow-500" />, title: "Medication Alerts" },
    { icon: <Heart className="w-12 h-12 text-red-500" />, title: "Health Insights" },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 overflow-hidden relative">
      <FloatingIcons />

      <div className="container mx-auto px-4">

        {/* Animated Graph */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-center text-indigo-800 mb-8">Track Your Pet&apos;s Health Over Time</h2>
          <div className="bg-white p-8 rounded-xl shadow-xl">
            <AnimatedGraph />
          </div>
        </motion.div>

        {/* Interactive Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} icon={feature.icon} title={feature.title} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h2 className="text-3xl font-bold text-indigo-800 mb-4">Ready to Transform Your Pet&apos;s Health Journey?</h2>
          <p className="text-xl text-purple-700 mb-8">Join thousands of happy pet parents using PetVetPals!</p>
          <motion.button
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(79, 70, 229, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(authUser ? "/dashboard" : "/signup")}
          >
            Claim Your Pawfile
            <motion.span
              className="inline-block ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              <Zap className="w-5 h-5 inline" />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

const FloatingIcons = () => {
  const icons = [Bone, Fish, Carrot]
  return (
    <>
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-indigo-300 opacity-50"
          // style={{
          //   top: `${Math.random() * 100}%`,
          //   left: `${Math.random() * 100}%`,
          // }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 5 + index,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon size={24 + index * 8} />
        </motion.div>
      ))}
    </>
  )
}

const AnimatedGraph = () => {
  const pathLength = useMotionValue(0)
  const opacity = useTransform(pathLength, [0, 1], [0, 1])

  return (
    <svg width="100%" height="200" viewBox="0 0 400 200">
      <motion.path
        d="M0,100 Q100,50 200,100 T400,100"
        fill="none"
        stroke="#4F46E5"
        strokeWidth="4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{ pathLength, opacity }}
      />
    </svg>
  )
}

const FeatureCard = ({ icon, title }) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
    whileHover={{ y: -5 }}
  >
    <motion.div
      className="mb-4"
      whileHover={{ rotate: 360, scale: 1.2 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {icon}
    </motion.div>
    <h3 className="text-xl font-semibold text-indigo-700">{title}</h3>
    <p className="text-purple-600 mt-2">
      Experience the future of pet care with our advanced {title.toLowerCase()} feature.
    </p>
  </motion.div>
)

export default PetHealthTrackerSection

