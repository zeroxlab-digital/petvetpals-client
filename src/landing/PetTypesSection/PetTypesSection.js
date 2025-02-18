"use client";
import Link from 'next/link';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const PetTypesSection = () => {
    const types = [
        { title: "Dog deals", image: "/images/cute-dog.jpg", link: "/shop/dog-deals" },
        { title: "Cat deals", image: "/images/cat.avif", link: "/shop/cat-deals" },
        { title: "Pharmacy", image: "/images/pharmacy.avif", link: "/pharmacy" },
        // { title: "Rabbit deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        // { title: "Birds deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        // { title: "Fish deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        // { title: "Small animals", image: "/images/cat.avif", link: "/shop/dog-deals" },
    ];

    const swiperRef = useRef(null);

    return (
        <section className='py-16 md:py-28'>
            <div className='app-container'>
                <div className='text-center mb-10 lg:w-3/6 mx-auto'>
                    <h3 className='text-2xl text-gray-900'>Shop by Type</h3>
                    <p className='text-gray-800 mt-3 text-sm md:text-base'>
                        With a focus on providing pets with continuous care for longer, healthier lives, we have the best deals for you.
                    </p>
                </div>
                <Swiper
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    spaceBetween={10}
                    slidesPerView={1.5}
                    loop={true}
                    autoplay={{ delay: 3000 }}
                    modules={[Navigation, Autoplay]}
                    breakpoints={{
                        640: {
                            slidesPerView: 1.5,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 2.5,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 25,
                        },
                        1280: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                >
                    {types.map((type, index) => (
                        <SwiperSlide key={index}>
                            <Link
                                href={type.link}
                                key={index}
                                className='border rounded-lg hover:shadow-lg duration-200 w-full h-32 text-center flex items-center justify-center relative group overflow-hidden'
                                style={{
                                    backgroundImage: index === 0
                                        ? 'url("/images/cute-dog.jpg")'
                                        : index === 1
                                            ? 'url("/images/cat-cute.jpg")'
                                            : 'url("")',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <div
                                    className='absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-110 z-[0]'
                                    style={{
                                        backgroundImage: index === 0
                                            ? 'url("/images/cute-dog.jpg")'
                                            : index === 1
                                                ? 'url("/images/cat-cute.jpg")'
                                                : 'url("/images/pharmacy.avif")',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-black opacity-30 z-[1]"></div>
                                <button className='font-bold text-white sm:uppercase text-sm z-10 bg-transparent border group-hover:border-none group-hover:bg-primary duration-300 ease-in-out w-44 h-12 max-sm:w-36 max-sm:h-10 rounded-full '>
                                    {type.title}
                                </button>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default PetTypesSection;