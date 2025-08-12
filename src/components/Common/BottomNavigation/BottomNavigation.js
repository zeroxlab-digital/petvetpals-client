"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar1, Home, PawPrint, Stethoscope, UserCircle } from 'lucide-react';

const BottomNavigation = () => {
  const pathname = usePathname();

  const links = [
    {
      title: "My Pets",
      link: "/dashboard/pets",
      icon: <PawPrint />
    },
    {
      title: "Vet GPT",
      link: "/dashboard/symptom-checker",
      icon: <Stethoscope />
    },
    {
      title: "Dashboard",
      link: "/dashboard",
      icon: <Home />
    },
    {
      title: "Appointments",
      link: "/dashboard/appointments",
      icon: <Calendar1 />
    },
    {
      title: "Pet Owner",
      link: "/dashboard/account-mobile",
      icon: <UserCircle />
    }
  ];


  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className='lg:hidden bg-white fixed bottom-0 left-0 w-full px-[5px] z-20 border-t border-gray-200 rounded-t-2xl shadow-2xl shadow-black'
    >
      <ul className='h-[60px] grid grid-cols-5 items-center text-center'>
        {links.map((link, index) => {
          const isActive = pathname === link.link;
          return (
            <Link href={link.link} key={index} className=" cursor-pointer">
              <li className="flex flex-col gap-1 items-center">
                <motion.span
                  whileTap={{ scale: 0.90 }}
                  animate={{ scale: isActive ? 0.95 : 0.85 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    mass: 0.5,
                  }}
                  className={` ${isActive ? "text-primary" : "text-gray-600"}`}
                >
                {link.icon}
                </motion.span>

                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      key="label"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="text-xs text-primary"
                    >
                      {link.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </li>
            </Link>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default BottomNavigation;
