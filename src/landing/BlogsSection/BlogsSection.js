"use client";
import React, { useRef } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';
import SImg from '/public/images/cat-cute.jpg';
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
        <section className='py-24'>
            <div className="grid lg:grid-cols-3 max-lg:grid-cols-1 max-lg:gap-10 ">
                {/* Left Content */}
                <div className="lg:col-span-1 flex max-sm:items-end lg:flex-col justify-between xl:pl-20 lg:px-10 max-lg:px-5">
                    <div>
                        <h3 className='text-lg text-primary mb-5'>Blogs</h3>
                        <h1 className='text-2xl md:text-3xl max-sm:hidden text-gray-800 mb-1'>Latest from PetVetPals</h1>
                        <p className='font-light text-gray-600 max-sm:hidden mb-5 text-sm md:text-base'>Some of our recently published blogs</p>
                        <Link href="/blogs" className='text-primary font-semibold text-sm flex items-center gap-1 group'>
                            Explore More <HiArrowRight className='group-hover:ml-1 duration-200' />
                        </Link>
                    </div>
                    <div className="flex gap-5 mt-8 md:mt-auto">
                        <button
                            className="bg-white text-primary hover:bg-primary hover:text-white duration-150 border border-[#2e114d] rounded-full w-10 max-sm:w-7 h-10 max-sm:h-7  flex items-center justify-center"
                            onClick={() => swiperRef.current?.slidePrev()}
                            aria-label="Previous"
                        >
                            <HiArrowLeft />
                        </button>
                        <button
                            className="bg-white text-primary hover:bg-primary hover:text-white duration-150 border border-[#2e114d] rounded-full w-10 max-sm:w-7  h-10 max-sm:h-7  flex items-center justify-center"
                            onClick={() => swiperRef.current?.slideNext()}
                            aria-label="Next"
                        >
                            <HiArrowRight />
                        </button>
                    </div>
                </div>

                {/* Right Swiper */}
                <div className="lg:col-span-2 max-lg:px-5">
                    <Swiper
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        spaceBetween={20}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 40,
                            },
                        }}
                    >
                        {blogs.map((blog, index) => (
                            <SwiperSlide key={index}>
                                <div className="cursor-pointer">
                                    <Image
                                        src={SImg}
                                        alt="banner"
                                        width={400}
                                        height={200}
                                        className='mb-5 rounded-md w-full h-48 md:h-64 object-cover'
                                    />
                                    <p className='font-light text-sm text-gray-700 ml-4 mb-2 relative'>
                                        <span className='w-2 h-2 bg-primary rounded-full absolute top-[6px] -left-3'></span>
                                        {blog.read_time} min read
                                    </p>
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