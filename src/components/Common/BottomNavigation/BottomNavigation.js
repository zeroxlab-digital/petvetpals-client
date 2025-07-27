"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineCalendar, HiOutlineHome, HiOutlineUserCircle } from 'react-icons/hi2';
import { LuStethoscope } from 'react-icons/lu';
import Image from 'next/image';

const BottomNavigation = () => {
  const pathname = usePathname();

  const links = [
    {
      title: "My Pets",
      link: "/dashboard/pets",
      // image: "/images/paw.svg"
    },
    {
      title: "Vet GPT",
      link: "/dashboard/symptom-checker",
      icon: <LuStethoscope />
    },
    {
      title: "Dashboard",
      link: "/dashboard",
      icon: <HiOutlineHome />
    },
    {
      title: "Appointments",
      link: "/dashboard/appointments",
      icon: <HiOutlineCalendar />
    },
    {
      title: "Pet Owner",
      link: "/dashboard/account",
      icon: <HiOutlineUserCircle />
    }
  ];


  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className='lg:hidden bg-white fixed bottom-0 left-0 w-full px-[5px] z-20 border-t border-gray-200 rounded-t-2xl shadow-2xl shadow-black'
    >
      <ul className='h-16 grid grid-cols-5 items-center text-center'>
        {links.map((link, index) => {
          const isActive = pathname === link.link;
          return (
            <Link href={link.link} key={index} className="text-xl cursor-pointer">
              <li className="flex flex-col gap-1 items-center">
                <motion.span
                  whileTap={{ scale: 0.95 }}
                  animate={{ scale: isActive ? 1.15 : 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    mass: 0.5,
                  }}
                  className={`text-[22px] ${isActive ? "text-primary" : "text-gray-600"}`}
                >
                  {link.icon ? (
                    link.icon
                  ) : (
                    <Image
                      src={`${isActive ? '/images/paw-primary.svg' : '/images/paw-gray.svg'}`}
                      alt={'paw'}
                      width={27}
                      height={27}
                    />
                  )}
                </motion.span>

                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      key="label"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="text-sm text-primary"
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
