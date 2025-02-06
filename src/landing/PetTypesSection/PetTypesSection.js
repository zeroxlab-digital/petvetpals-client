"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const PetTypesSection = () => {
    const types = [
        { title: "Dog deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        { title: "Dog deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        { title: "Dog deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        { title: "Dog deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        { title: "Dog deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        { title: "Dog deals", image: "/images/cat.avif", link: "/shop/dog-deals" },
        { title: "Pharmacy", image: "/images/pharmacy.avif", link: "/shop/dog-deals" },
    ]
    const swiperRef = useRef(null)
    return (
        <section className='py-32'>
            <div className='app-container'>
                <div className='text-center mb-20 lg:w-3/6 mx-auto'>
                    <h3 className='text-2xl text-gray-900'>Shop By Pet Type</h3>
                    <p className='text-gray-800 mt-3'>With a focuse on providing pets with continuous care for longer, healthier lives we have the best deals for you</p>
                </div>
                <Swiper
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    // modules={[Autoplay, Navigation]}
                    spaceBetween={20}
                    slidesPerView={3}
                    loop={true}
                    autoplay={{
                        delay: 1000, // Auto-slide every 3 seconds
                        disableOnInteraction: true, // Keep autoplay active after interactions
                    }}
                    breakpoints={{
                        // when window width is >= 1024px
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        // when window width is >= 1280px
                        1280: {
                            slidesPerView: 7,
                            spaceBetween: 30,
                        },
                        // Default for smaller screens (less than 640px)
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                    }}
                >
                    {types?.map((type, index) => (
                        <SwiperSlide
                            className=""
                            key={index}
                        >
                            <Link href={type.link}>
                                <div className='text-center group flex flex-col items-center '>
                                    <Image src={type.image} alt="type-img" width={130} height={130} className='group-hover:shadow-lg rounded-full duration-200' />
                                    <p className='mt-2 text-gray-800 group-hover:underline duration-200'>{type.title}</p>
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