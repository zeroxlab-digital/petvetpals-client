"use client";
import { Stethoscope } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { HiOutlineUser, HiOutlineUserCircle, HiOutlineUserPlus } from 'react-icons/hi2';
import { useVetAuthenticated } from '../../../hooks/useVetAuthenticated';

const Landing = () => {
    const { isAuthenticated } = useVetAuthenticated();
    return (
        <div className="relative w-screen h-screen overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src="/videos/veterianary-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

            <div className="relative z-20 flex flex-col min-h-screen">

                <header className='flex items-center justify-between app-container py-4 shadow-md bg-transparent sticky top-0 z-20'>
                    <Link href="/veterinarian" className="flex items-center gap-2 text-white">
                        <Stethoscope className="w-6 h-6 text-blue-400" />
                        <span className="text-3xl max-sm:text-2xl font-bold">
                            Pet<span className='text-blue-400'>Vet</span>Pals
                        </span>
                    </Link>

                    {isAuthenticated ?
                        <Link href="/veterinarian/dashboard">
                            <button className="flex items-center justify-center gap-1 rounded-full bg-blue-600 hover:bg-blue-700 duration-200 text-white w-40 max-sm:w-32 h-10 max-sm:h-9 max-sm:text-sm">
                                <HiOutlineUserCircle className="text-xl" />My account
                            </button>
                        </Link>
                        :
                        <div className="flex items-center gap-2 w-max">
                            <Link href="/veterinarian/signin">
                                <button className="border border-white hover:border-none hover:bg-blue-600 text-white rounded-full flex items-center gap-2 justify-center w-32 max-sm:w-28 h-10 max-sm:h-9 max-sm:text-sm">
                                    <HiOutlineUser className="text-xl" /> Sign In
                                </button>
                            </Link>
                            <Link href="/veterinarian/signup" className="max-sm:hidden">
                                <button className="bg-blue-600 hover:bg-blue-700 duration-200 text-white rounded-full flex items-center gap-2 justify-center w-32 max-sm:w-28 h-10 max-sm:h-9 max-sm:text-sm">
                                    <HiOutlineUserPlus className="text-xl" /> Sign Up
                                </button>
                            </Link>
                        </div>
                    }
                </header>

                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center flex-1 text-center text-white px-4">
                    <h1 className="text-6xl max-sm:text-4xl font-extrabold mb-6 leading-tight">
                        Elevate Your Veterinary Practice
                    </h1>
                    <p className="text-xl max-sm:text-lg mb-8 max-w-3xl">
                        Deliver expert care online, connect with more pet owners, and grow your practice with our AI-powered platform.
                        Streamline consultations, manage cases efficiently, and unlock new revenue opportunities — all from one smart, intuitive platform.
                    </p>
                    <div className="flex gap-4">
                        <Link href={isAuthenticated ? "/veterinarian/dashboard" : "/veterinarian/signup"}>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-200">
                                Get Started
                            </button>
                        </Link>
                        <Link href="/veterinarian/learn-more">
                            <button className="border border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-black transition duration-200">
                                Learn More
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
