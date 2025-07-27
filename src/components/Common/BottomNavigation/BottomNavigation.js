"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCalendar,
  FaHouse,
  FaPaw,
  FaPills,
  FaUser
} from 'react-icons/fa6';

const BottomNavigation = () => {
  const pathname = usePathname();

  const links = [
    { title: "Pet Profiles", link: "/dashboard/pets", icon: <FaPaw /> },
    { title: "Vet GPT", link: "/dashboard/symptom-checker", icon: <FaPills /> },
    { title: "Dashboard", link: "/dashboard", icon: <FaHouse /> },
    { title: "Appointments", link: "/dashboard/appointments", icon: <FaCalendar /> },
    { title: "Pet Owner", link: "/dashboard/account", icon: <FaUser /> }
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className='lg:hidden bg-white absolute bottom-0 left-0 w-full px-3 py-3 z-10 border border-t-2 rounded-t-xl shadow-xl'
    >
      <ul className='grid grid-cols-5 items-center justify-between text-center'>
        {links.map((link, index) => {
          const isActive = pathname === link.link;

          return (
            <li key={index} className='text-xl cursor-pointer'>
              <Link href={link.link} className='flex flex-col gap-[6px] items-center'>
                <motion.span
                  whileTap={{ scale: 0.95 }}
                  animate={{ scale: isActive ? 1.15 : 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                    mass: 0.5
                  }}
                  className={isActive ? 'text-primary' : 'text-gray-600'}
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
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="text-sm text-primary"
                    >
                      {link.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default BottomNavigation;
