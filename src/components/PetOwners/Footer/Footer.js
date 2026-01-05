/* eslint-disable react/no-unescaped-entities */
"use client"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone, Heart, PawPrintIcon as Paw, ShoppingBag, Pill, Video, Calendar, Clock, ChevronRight, Send, Shield, Scissors, GraduationCap, Home, Linkedin, Building2Icon, MessageCircle, Stethoscope, Link } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-gray-200 relative overflow-hidden rounded-t-[2rem] max-sm:rounded-t-[1.5rem]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"
          animate={{
            x: [50, -50, 50],
            y: [50, -50, 50],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Newsletter Section */}
      {/* <div className="relative border-b border-gray-300 border-opacity-20">
        <div className="app-container py-16">
          <div className=" text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl max-sm:text-xl font-semibold mb-2">Join Our Pet-Loving Community</h3>
              <p className="text-gray-300 mb-8">Subscribe to receive updates, pet care tips, and exclusive offers</p>
              <form className="grid grid-cols-[3fr_1fr] gap-2 sm:w-3/5 mx-auto max-w-max">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent bg-white text-gray-800 outline-none placeholder:text-gray-500 rounded-md p-3"
                />
                <button className="bg-secondary hover:bg-black duration-200 text-white font-semibold p-3 rounded-md flex items-center gap-0">
                  Subscribe
                  <Send className="w-4 h-4 ml-2 max-sm:hidden" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="relative app-container mx-auto  py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* <div className="flex items-center gap-2 mb-6">
              <Paw className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold text-white">PetVetPals</span>
            </div> */}
            <div className="cursor-pointer flex items-center gap-2 mb-6">
              <Image src={"/images/nobg-temp-logo-pvp-copy.png"} alt="logo" width={55} height={55} priority className="" />
              <h2 className="text-2xl font-bold">PetVetPals</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Your one-stop destination for all pet health needs. We're committed to providing the best care for your
              furry friends.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-white" />
                <span>Monroe, LA 71203, USA</span>
              </div>
              {/* <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-white" />
                <span>+1 (318) 737-0330</span>
              </div> */}
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-white" />
                <span>hello@petvetpals.com</span>
              </div>
            </div>
          </motion.div>

          {/* Shop Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-white" />
              Shop & Pharmacy
            </h4>
            <ul className="space-y-4">
              {[
                "Pet Food & Treats",
                "Toys & Accessories",
                "Grooming Supplies",
                "Prescription Medicine",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <ChevronRight className="w-4 h-4" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Heart className="w-5 h-5 text-white" />
              Our Services
            </h4>
            <ul className="space-y-4">
              {[
                { text: "Online Vet Consultation", icon: Video },
                { text: "AI Health Tools", icon: Stethoscope },
                { text: "Medication & Vaccination Reminder", icon: Clock },
                { text: "Health Tracker", icon: Shield },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors cursor-pointer group"
                  whileHover={{ x: 5 }}
                >
                  <ChevronRight className="w-4 h-4" />
                  {item.text}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Working Hours & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Building2Icon className="w-5 h-5 text-white" />
              About Us
            </h4>
            <ul className="space-y-4">
              {[
                "Our Stories",
                // "Blog",
                "Site Map"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <ChevronRight className="w-4 h-4" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <h4 className="text-base font-semibold mb-4 mt-8">Connect With Us</h4>
            <div className="flex gap-4">
              {[
                { icon: Facebook, color: "hover:bg-blue-500" },
                { icon: Twitter, color: "hover:bg-sky-500" },
                { icon: Instagram, color: "hover:bg-pink-600" },
                { icon: Youtube, color: "hover:bg-red-600" },
                { icon: Linkedin, color: "hover:bg-blue-600" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className={`w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center ${social.color} transition-colors`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-300 border-opacity-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-300 text-sm">© {currentYear} PetVetPals. All rights reserved.</div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        {/* Floating paw prints */}
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute text-purple-500/10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * -100],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 2,
            }}
          // style={{
          //   left: `${Math.random() * 100}%`,
          //   bottom: "20%",
          // }}
          >
            <Paw className="w-8 h-8" />
          </motion.div>
        ))}
      </div>
    </footer>
  )
}

