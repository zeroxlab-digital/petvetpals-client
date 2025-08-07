'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";

const TOTAL_PAWS = 20;

const generateRandomPaws = () =>
  Array.from({ length: TOTAL_PAWS }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.floor(Math.random() * 35) + 30,
    color: ['#ff69b4', '#ff00ff', '#da70d6', '#c084fc'][Math.floor(Math.random() * 4)],
    blurClass: Math.random() > 0.5 ? 'blur-sm' : 'blur-md',
    opacity: 0.1 + Math.random() * 0.3,
    rotation: Math.random() > 0.5,
    xDrift: Math.random() * 10 - 5,
    yDrift: Math.random() * 10 - 5,
    floatDuration: 8 + Math.random() * 5,
  }));

const PawBackground = () => {
  const [paws] = useState(generateRandomPaws);

  return (
    <div className="max-sm:hidden absolute inset-0 -z-10 overflow-hidden pointer-events-none ">
      {paws.map(paw => (
        <motion.div
          key={paw.id}
          initial={{ x: 0, y: 0 }}
          animate={{ x: paw.xDrift, y: [0, -10, 0] }}
          transition={{
            x: {
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            y: {
              duration: paw.floatDuration,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className={`absolute ${paw.blurClass}`}
          style={{
            top: `${paw.top}%`,
            left: `${paw.left}%`,
            fontSize: `${paw.size}px`,
            color: paw.color,
            opacity: paw.opacity,
            filter: `drop-shadow(0 0 6px ${paw.color})`,
          }}
        >
          <motion.div
            animate={paw.rotation ? { rotate: [0, 360] } : {}}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <PawPrint />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default PawBackground;
