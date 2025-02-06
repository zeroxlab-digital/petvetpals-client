import Link from 'next/link';
import React from 'react';

const FeaturesSection = () => {
    const features = [
        { title: "Foods & Accesories", background: "/images/vet-call.webp", link: "/shop" },
        { title: "Pharmacy", background: "/images/vet-call.webp", link: "/pharmacy" },
        { title: "Online Vet", background: "/images/vet-call.webp", link: "/appointments" }
    ]
    return (
        <section className='app-container mt-10'>
            <div className='grid grid-cols-3 gap-10 '>
                {
                    features.map((feature, index) => (
                        <Link key={index} href={feature.link}>
                            <div
                                className='w-full h-52 border rounded-md flex items-center justify-center cursor-pointer overflow-hidden relative'
                                style={{
                                    backgroundImage: `url(${feature.background})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                <div
                                    className='absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out hover:scale-110'
                                    style={{
                                        backgroundImage: `url(${feature.background})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center center',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                ></div>
                                <p className='font-semibold text-lg text-white relative z-10'>{feature.title}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </section>
    );
};

export default FeaturesSection;