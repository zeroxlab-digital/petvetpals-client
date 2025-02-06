"use client";
import React, { useRef } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';
import SImg from '/public/images/vet.png'
import Image from 'next/image';

const BlogsSection = () => {
    const blogs = [
        {
            title: 'NASA Animations with SpaceX Mixer Ready to Fly',
            description: 'Peer-to-peer real estate sales platform asking to renovate their brand from zero',
            banner: SImg,
            read_time: 6
        },
        {
            title: 'NASA Animations with SpaceX Mixer Ready to Fly',
            description: 'Peer-to-peer real estate sales platform asking to renovate their brand from zero',
            banner: SImg,
            read_time: 6
        },
        {
            title: 'NASA Animations with SpaceX Mixer Ready to Fly',
            description: 'Peer-to-peer real estate sales platform asking to renovate their brand from zero',
            banner: SImg,
            read_time: 6
        }
    ];

    const swiperRef = useRef(null);

    return (
        <section className='py-32'>
            <div className="grid lg:grid-cols-3 max-lg:grid-cols-1 max-lg:gap-10">
                <div className="lg:col-span-1 flex lg:flex-col justify-between xl:pl-20 lg:px-10 max-lg:px-5">
                    <div>
                        <h3 className='text-lg text-primary mb-5'>Blogs</h3>
                        <h1 className='text-3xl text-gray-800 mb-1'>The latest from ZeroxLab</h1>
                        <p className='font-light text-gray-600 mb-5'>Some of our recently published blogs</p>
                        <Link href="/blogs" className='text-primary font-semibold text-sm flex items-center gap-1 group'>Explore More <HiArrowRight className='group-hover:ml-1 duration-200' /></Link>
                    </div>
                    <div className="flex gap-5 mt-auto">
                        <button
                            className="bg-white text-primary hover:bg-primary hover:text-white duration-150 border border-[#2e114d] rounded-full max-sm:w-7 w-10 max-sm:h-7 h-10 flex items-center justify-center"
                            onClick={() => swiperRef.current?.slidePrev()}
                            aria-label="Previous"
                        >
                            <HiArrowLeft />
                        </button>
                        <button
                            className="bg-white text-primary hover:bg-primary hover:text-white duration-150 border border-[#2e114d] rounded-full max-sm:w-7 w-10 max-sm:h-7 h-10 flex items-center justify-center"
                            onClick={() => swiperRef.current?.slideNext()}
                            aria-label="Next"
                        >
                            <HiArrowRight />
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-2 max-lg:px-5">
                    <Swiper
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        // modules={[Autoplay, Navigation]}
                        spaceBetween={30}
                        slidesPerView={2}
                        loop={true}
                        autoplay={{
                            delay: 1000, // Auto-slide every 3 seconds
                            disableOnInteraction: true, // Keep autoplay active after interactions
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                        }}
                    >
                        {blogs.map((blog, index) => (
                            <SwiperSlide key={index}>
                                <div className="cursor-pointer">
                                    <Image src={SImg} alt="banner" width={400} height={200} className='mb-5  rounded-md min-w-full h-60 bg-cover' />
                                    <p className='font-light text-sm text-gray-700 ml-4 mb-2 relative'><span className='w-2 h-2 bg-primary rounded-full absolute top-[6px] -left-3'></span>{blog.read_time} min read</p>
                                    <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                                    <p className="text-base text-gray-800">{blog.description}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default BlogsSection;
