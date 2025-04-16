"use client";
import Link from 'next/link';
import React from 'react';
import { useIsAuthenticated } from '../../../hooks/useIsAuthenticated';

const FeaturesSection = () => {
    const {isAuthenticated: authUser} = useIsAuthenticated();
    const features = [
        { title: authUser ? "My account" : "Register today", background: "/images/dogs-banner.jpg", link: authUser ? "/dashboard" : "/signup", link_title: authUser ? "User Dashboard" : "/Sign up" },
        { title: "Foods & accessories", background: "/images/pets-banner.jpg", link: "/shop", link_title: "Shop now" },
        { title: "Buy medications", background: "/images/dog-medicines.jfif", link: "/pharmacy", link_title: "Pharmacy" },
        { title: "Online vet", background: "/images/dog-banner.jpg", link: "/appointments", link_title: "Get appointment" }
    ];

    return (
        <section className='app-container mt-5'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-10'>
                {features.map((feature, index) => (
                    <Link key={index} href={feature.link}>
                        <div
                            className='w-full h-24 border rounded flex items-center justify-start p-4 cursor-pointer overflow-hidden relative group'
                            style={{
                                backgroundImage: `url(${feature.background})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        >
                            {/* Hover effect applied to background */}
                            <div
                                className='absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-110 z-[0]'
                                style={{
                                    backgroundImage: `url(${feature.background})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            ></div>

                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-black opacity-40 z-[1]"></div>

                            <div className='z-[2] relative'>
                                <p className='text-base font-semibold text-gray-100 mb-1'>{feature.title}</p>
                                <p className='text-gray-200 text-sm underline'>{feature.link_title}</p>
                            </div>
                        </div>


                    </Link>
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;