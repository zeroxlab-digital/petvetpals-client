"use client";
import React, { useEffect, useRef, useState } from 'react';
import { HiArrowSmallRight } from 'react-icons/hi2';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Image from 'next/image';
import Link from 'next/link';
import { Rating } from '@mui/material';

const PopularItemsSection = () => {
    const [products, setProducts] = useState([]);
    const swiperRef = useRef(null);

    useEffect(() => {
        const handleFetchProduct = async () => {
            const res = await fetch(`/data/products.json`);
            const data = await res.json();
            setProducts(data);
        };
        handleFetchProduct();
    }, []);

    return (
        <>
            <section className="pb-14 md:pb-24">
                <div className="app-container mx-auto flex items-center justify-between mb-5 md:mb-10">
                    <div>
                        <h3 className='text-base font-semibold text-primary '>Top Pet Foods</h3>
                    </div>
                    <div>
                        <Link href={`shop/cat-foods`} className="text-primary flex items-center gap-1 font-semibold  text-base">View More <HiArrowSmallRight className='text-sm' /></Link>
                    </div>
                </div>
                <div className='app-container'>
                    <Swiper
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        spaceBetween={10}
                        slidesPerView={2}
                        loop={true}
                        autoplay={{ delay: 5000 }}
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
                                slidesPerView: 6,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        {products.map((product) => (
                            <SwiperSlide
                                className="border rounded-md p-3 flex flex-col justify-center items-center cursor-pointer"
                                key={product._id}
                            >
                                <Link
                                    href={{
                                        pathname: `/shop/${product._id}`,
                                        query: {
                                            title: `${product.name.toLowerCase()}`,
                                        },
                                    }}
                                >
                                    <div className="bg-gray-300 bg-opacity-10 rounded w-full h-40 md:h-52 mb-3">
                                        <Image
                                            src="/images/med1.webp"
                                            alt="product-img"
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-cover rounded"
                                        />
                                    </div>
                                    <h2 className="text-gray-900 hover:underline cursor-pointer mb-2 text-sm md:text-base">
                                        {product.name}
                                    </h2>
                                    <div className="flex items-center justify-between w-full">
                                        <h4 className="font-semibold text-gray-800 text-sm md:text-base">${product.price}</h4>
                                        <div className="flex gap-1 items-center">
                                            <Rating
                                                name="half-rating-read"
                                                size="small"
                                                defaultValue={4.5}
                                                precision={0.5}
                                                readOnly
                                            />
                                            <p className="font-light text-gray-800 text-sm md:text-base">4.5</p>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
            <section className="pb-14 md:pb-24">
                <div className="app-container mx-auto flex items-center justify-between mb-5 md:mb-10">
                    <div>
                        <h3 className='text-base font-semibold text-primary '>Top Toys & Accessories</h3>
                    </div>
                    <div>
                        <Link href={`shop/cat-foods`} className="text-primary flex items-center gap-1 font-semibold  text-base">View More <HiArrowSmallRight className='text-sm' /></Link>
                    </div>
                </div>
                <div className='app-container'>
                    <Swiper
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        spaceBetween={10}
                        slidesPerView={2}
                        loop={true}
                        autoplay={{ delay: 5000 }}
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
                                slidesPerView: 6,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        {products.map((product) => (
                            <SwiperSlide
                                className="border rounded-md p-3 flex flex-col justify-center items-center cursor-pointer"
                                key={product._id}
                            >
                                <Link
                                    href={{
                                        pathname: `/shop/${product._id}`,
                                        query: {
                                            title: `${product.name.toLowerCase()}`,
                                        },
                                    }}
                                >
                                    <div className="bg-gray-300 bg-opacity-10 rounded w-full h-40 md:h-52 mb-3">
                                        <Image
                                            src="/images/med1.webp"
                                            alt="product-img"
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-cover rounded"
                                        />
                                    </div>
                                    <h2 className="text-gray-900 hover:underline cursor-pointer mb-2 text-sm md:text-base">
                                        {product.name}
                                    </h2>
                                    <div className="flex items-center justify-between w-full">
                                        <h4 className="font-semibold text-gray-800 text-sm md:text-base">${product.price}</h4>
                                        <div className="flex gap-1 items-center">
                                            <Rating
                                                name="half-rating-read"
                                                size="small"
                                                defaultValue={4.5}
                                                precision={0.5}
                                                readOnly
                                            />
                                            <p className="font-light text-gray-800 text-sm md:text-base">4.5</p>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
            <section className="pb-16 md:pb-32">
                <div className="app-container mx-auto flex items-center justify-between mb-5 md:mb-10">
                    <div>
                        <h3 className='text-base font-semibold text-primary '>Top Pharmacy Products</h3>
                    </div>
                    <div>
                        <Link href={`shop/cat-foods`} className="text-primary flex items-center gap-1 font-semibold  text-base">View More <HiArrowSmallRight className='text-sm' /></Link>
                    </div>
                </div>
                <div className='app-container'>
                    <Swiper
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        spaceBetween={10}
                        slidesPerView={2}
                        loop={true}
                        autoplay={{ delay: 5000 }}
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
                                slidesPerView: 6,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        {products.map((product) => (
                            <SwiperSlide
                                className="border rounded-md p-3 flex flex-col justify-center items-center cursor-pointer"
                                key={product._id}
                            >
                                <Link
                                    href={{
                                        pathname: `/shop/${product._id}`,
                                        query: {
                                            title: `${product.name.toLowerCase()}`,
                                        },
                                    }}
                                >
                                    <div className="bg-gray-300 bg-opacity-10 rounded w-full h-40 md:h-52 mb-3">
                                        <Image
                                            src="/images/med1.webp"
                                            alt="product-img"
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-cover rounded"
                                        />
                                    </div>
                                    <h2 className="text-gray-900 hover:underline cursor-pointer mb-2 text-sm md:text-base">
                                        {product.name}
                                    </h2>
                                    <div className="flex items-center justify-between w-full">
                                        <h4 className="font-semibold text-gray-800 text-sm md:text-base">${product.price}</h4>
                                        <div className="flex gap-1 items-center">
                                            <Rating
                                                name="half-rating-read"
                                                size="small"
                                                defaultValue={4.5}
                                                precision={0.5}
                                                readOnly
                                            />
                                            <p className="font-light text-gray-800 text-sm md:text-base">4.5</p>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </>

    );
};

export default PopularItemsSection;