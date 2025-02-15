"use client";
import React, { useEffect, useRef, useState } from 'react';
import { HiArrowSmallRight, HiOutlineHeart, HiShoppingCart } from 'react-icons/hi2';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Image from 'next/image';
import Link from 'next/link';
import { Rating } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCart } from '@/redux/features/cartSlice';

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

    const disptach = useDispatch();
    const handleAddToCart = (e, product) => {
        e.stopPropagation()
        disptach(setCart({ product, order_quantity: 1 }));
    }

    return (
        <>
            <section className="pb-14 md:pb-24">
                <div className="app-container mx-auto flex items-center justify-between mb-5 md:mb-10">
                    <div>
                        <h3 className='text-base font-semibold text-primary '>Top pet foods</h3>
                    </div>
                    <div>
                        <Link href={`shop/cat-foods`} className="text-primary flex items-center gap-1 font-semibold  text-base">View more <HiArrowSmallRight className='text-sm' /></Link>
                    </div>
                </div>
                <div className='app-container'>
                    <Swiper
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        spaceBetween={10}
                        slidesPerView={2.2}
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
                                className="border rounded-md  flex flex-col justify-center items-center"
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
                                    <div className="bg-gray-300 bg-opacity-10 w-full h-32 md:h-40 mb-1">
                                        <Image
                                            src="/images/med1.webp"
                                            alt="product-img"
                                            width={70}
                                            height={70}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className='p-2'>
                                        <h2 className="text-gray-900 hover:underline cursor-pointer mb-2 text-sm md:text-base ">
                                            {product.name}
                                        </h2>
                                        <div className="flex items-center justify-between w-full max-sm:flex-col max-sm:items-start max-sm:gap-1">
                                            <h4 className="font-semibold text-gray-800 text-sm md:text-base">${product.price}</h4>
                                            <div className="flex max-sm:flex-row-reverse gap-1 items-center">
                                                <Rating
                                                    name="half-rating-read"
                                                    size="small"
                                                    defaultValue={5}
                                                    precision={0.5}
                                                    readOnly
                                                />
                                                <p className="font-light text-gray-800 text-sm md:text-base">4.5</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className=" flex gap-1 p-2">
                                    <button onClick={(e) => handleAddToCart(e, product)} className="flex items-center gap-2 justify-center  text-center bg-[#1b1a1af7] text-white  rounded h-8 sm:h-9 w-full max-sm:text-sm"><HiShoppingCart className='' /> Add to Cart</button>
                                    <button onClick={(e) => e.stopPropagation()} className="border border-[#161515a5] rounded w-10 flex justify-center items-center text-base"><HiOutlineHeart className=" text-[#161515]" /></button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
            <section className="pb-14 md:pb-24">
                <div className="app-container mx-auto flex items-center justify-between mb-5 md:mb-10">
                    <div>
                        <h3 className='text-base font-semibold text-primary '>Top toys & accessories</h3>
                    </div>
                    <div>
                        <Link href={`shop/cat-foods`} className="text-primary flex items-center gap-1 font-semibold  text-base">View more <HiArrowSmallRight className='text-sm' /></Link>
                    </div>
                </div>
                <div className='app-container'>
                    <Swiper
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        spaceBetween={10}
                        slidesPerView={2.2}
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
                                className="border rounded-md  flex flex-col justify-center items-center"
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
                                    <div className="bg-gray-300 bg-opacity-10 w-full h-32 md:h-40 mb-1">
                                        <Image
                                            src="/images/med1.webp"
                                            alt="product-img"
                                            width={70}
                                            height={70}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className='p-2'>
                                        <h2 className="text-gray-900 hover:underline cursor-pointer mb-2 text-sm md:text-base ">
                                            {product.name}
                                        </h2>
                                        <div className="flex items-center justify-between w-full max-sm:flex-col max-sm:items-start max-sm:gap-1">
                                            <h4 className="font-semibold text-gray-800 text-sm md:text-base">${product.price}</h4>
                                            <div className="flex max-sm:flex-row-reverse gap-1 items-center">
                                                <Rating
                                                    name="half-rating-read"
                                                    size="small"
                                                    defaultValue={5}
                                                    precision={0.5}
                                                    readOnly
                                                />
                                                <p className="font-light text-gray-800 text-sm md:text-base">4.5</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className=" flex gap-1 p-2">
                                    <button onClick={(e) => handleAddToCart(e, product)} className="flex items-center gap-2 justify-center  text-center bg-[#1b1a1af7] text-white  rounded h-8 sm:h-9 w-full max-sm:text-sm"><HiShoppingCart className='' /> Add to Cart</button>
                                    <button onClick={(e) => e.stopPropagation()} className="border border-[#161515a5] rounded w-10 flex justify-center items-center text-base"><HiOutlineHeart className=" text-[#161515]" /></button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
            <section className="pb-16 md:pb-32">
                <div className="app-container mx-auto flex items-center justify-between mb-5 md:mb-10">
                    <div>
                        <h3 className='text-base font-semibold text-primary '>Top pharmacy products</h3>
                    </div>
                    <div>
                        <Link href={`shop/cat-foods`} className="text-primary flex items-center gap-1 font-semibold  text-base">View more <HiArrowSmallRight className='text-sm' /></Link>
                    </div>
                </div>
                <div className='app-container'>
                    <Swiper
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        spaceBetween={10}
                        slidesPerView={2.2}
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
                                className="border rounded-md  flex flex-col justify-center items-center"
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
                                    <div className="bg-gray-300 bg-opacity-10 w-full h-32 md:h-40 mb-1">
                                        <Image
                                            src="/images/med1.webp"
                                            alt="product-img"
                                            width={70}
                                            height={70}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className='p-2'>
                                        <h2 className="text-gray-900 hover:underline cursor-pointer mb-2 text-sm md:text-base ">
                                            {product.name}
                                        </h2>
                                        <div className="flex items-center justify-between w-full max-sm:flex-col max-sm:items-start max-sm:gap-1">
                                            <h4 className="font-semibold text-gray-800 text-sm md:text-base">${product.price}</h4>
                                            <div className="flex max-sm:flex-row-reverse gap-1 items-center">
                                                <Rating
                                                    name="half-rating-read"
                                                    size="small"
                                                    defaultValue={5}
                                                    precision={0.5}
                                                    readOnly
                                                />
                                                <p className="font-light text-gray-800 text-sm md:text-base">4.5</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className=" flex gap-1 p-2">
                                    <button onClick={(e) => handleAddToCart(e, product)} className="flex items-center gap-2 justify-center  text-center bg-[#1b1a1af7] text-white  rounded h-8 sm:h-9 w-full max-sm:text-sm"><HiShoppingCart className='' /> Add to Cart</button>
                                    <button onClick={(e) => e.stopPropagation()} className="border border-[#161515a5] rounded w-10 flex justify-center items-center text-base"><HiOutlineHeart className=" text-[#161515]" /></button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </>

    );
};

export default PopularItemsSection;