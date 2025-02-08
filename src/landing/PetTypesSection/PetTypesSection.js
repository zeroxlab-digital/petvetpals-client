"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const PetTypesSection = () => {
    const types = [
        { title: "Dog deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        { title: "Dog deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        { title: "Dog deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        { title: "Dog deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        { title: "Dog deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        { title: "Dog deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        { title: "Pharmacy", image: "/images/pharmacy.avif", link: "/shop/dog-deals" },
    ];

    const swiperRef = useRef(null);

    return (
        <section className='py-16 md:py-28'>
            <div className='app-container'>
                <div className='text-center mb-10 lg:w-3/6 mx-auto'>
                    <h3 className='text-2xl text-gray-900'>Shop By Pet Type</h3>
                    <p className='text-gray-800 mt-3 text-sm md:text-base'>
                        With a focus on providing pets with continuous care for longer, healthier lives, we have the best deals for you.
                    </p>
                </div>
                <Swiper
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    spaceBetween={10}
                    slidesPerView={3.5}
                    loop={true}
                    autoplay={{ delay: 3000 }}
                    modules={[Navigation, Autoplay]}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 25,
                        },
                        1280: {
                            slidesPerView: 7,
                            spaceBetween: 30,
                        },
                    }}
                >
                    {types.map((type, index) => (
                        <SwiperSlide key={index}>
                            <Link href={type.link}>
                                <div className='text-center group flex flex-col items-center'>
                                    <Image
                                        src={type.image}
                                        alt="type-img"
                                        width={100}
                                        height={100}
                                        className='group-hover:shadow-lg rounded-full duration-200 w-24 h-24 md:w-32 md:h-32'
                                    />
                                    <p className='mt-2 text-gray-800 text-sm md:text-base group-hover:underline duration-200'>{type.title}</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default PetTypesSection;