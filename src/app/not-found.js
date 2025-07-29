/* eslint-disable react/no-unescaped-entities */
"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f2e8f0] to-[#d9c2d3] p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 120 }}
          className="text-9xl font-extrabold text-[#4e1742] drop-shadow-lg"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-3xl font-semibold text-gray-800"
        >
          Oops! This page seems to have wandered off.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="text-lg text-gray-600 max-w-md mx-auto"
        >
          Don't worry, even the best pets get lost sometimes. Let's get you back to PetVetPals!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.7, type: "spring", stiffness: 100 }}
          className="mt-8"
        >
          <Image
            src="/images/dog-doggy.jpg"
            width={200}
            height={200}
            lazyload
            alt="Lost pet with a question mark"
            className="mx-auto rounded-full shadow-lg w-44 h-44 object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#672e5b] hover:bg-[#4e1742] shadow-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#350029]"
          >
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
