import Link from 'next/link';
import React from 'react';

const FeaturesSection = () => {
    const features = [
        { title: "Register today", background: "/images/vet-call.webp", link: "/register", link_title: "Sign up" },
        { title: "Foods & accessories", background: "/images/vet-call.webp", link: "/shop", link_title: "Shop now" },
        { title: "Buy medications", background: "/images/vet-call.webp", link: "/pharmacy", link_title: "Pharmacy" },
        { title: "Online vet", background: "/images/vet-call.webp", link: "/appointments", link_title: "Get appointment" }
    ];

    return (
        <section className='app-container mt-5'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-10'>
                {features.map((feature, index) => (
                    <Link key={index} href={feature.link}>
                        <div
                            className='w-full h-24 border rounded-md flex items-center justify-start p-5 cursor-pointer overflow-hidden relative group'
                            style={{
                                backgroundImage: `url(${feature.background})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        >
                            <div
                                className=' absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out hover:scale-110'
                                style={{
                                    backgroundImage: `url(${feature.background})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            ></div>
                            <div className='z-[1] relative'>
                                <p className='text-base font-semibold text-gray-100 mb-1'>{feature.title}</p>
                                <p className='text-gray-200 text-sm group-hover:underline duration-200'>{feature.link_title}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;