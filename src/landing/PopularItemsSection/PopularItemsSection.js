"use client";
import React, { useEffect, useRef, useState } from 'react';
import { HiArrowLeft, HiArrowRight, HiCodeBracket } from 'react-icons/hi2';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Rating } from '@mui/material';

const PopularItemsSection = () => {

    const [products, setProducts] = useState(null);
    useEffect(() => {
        const handleFetchProduct = async () => {
            const res = await fetch(`/data/products.json`);
            const data = await res.json();
            setProducts(data);
        }
        handleFetchProduct();
    }, [])
    console.log(products);

    const swiperRef = useRef(null)

    return (
        <section className="pb-32">
            <div className="app-container  mx-auto flex items-center justify-between mb-12">
                <div>
                    <h3 className='text-xl font-semibold text-primary'>Most Popular Items</h3>
                </div>
                <div className="flex gap-5 ">
                    <button onClick={() => swiperRef.current?.slidePrev()} className="bg-white text-primary hover:bg-primary hover:text-white duration-150 border border-[#2e114d] rounded-full max-sm:w-7 w-10 max-sm:h-7 h-10 leading-10 text-center" aria-label="Previous">
                        <HiArrowLeft className="w-full" />
                    </button>
                    <button onClick={() => swiperRef.current?.slideNext()} className="bg-white text-primary hover:bg-primary hover:text-white duration-150 border border-[#2e114d] rounded-full max-sm:w-7 w-10 max-sm:h-7 h-10 leading-10 text-center" aria-label="Next">
                        <HiArrowRight className="w-full" />
                    </button>
                </div>
            </div>
            <div className='app-container'>
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
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        // when window width is >= 1280px
                        1280: {
                            slidesPerView: 6,
                            spaceBetween: 30,
                        },
                        // Default for smaller screens (less than 640px)
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                    }}
                >
                    {products?.map(product => (
                        <SwiperSlide
                            className="border rounded-md p-3 flex flex-col justify-center items-center cursor-pointer"
                            key={product._id}
                        >
                            <Link href={{
                                pathname: `/shop/${product._id}`,
                                query: {
                                    title: `${product.name.toLowerCase()}`
                                }
                            }}>
                                <div className="bg-gray-300 bg-opacity-10 rounded w-auto h-52 mb-3">
                                    <Image src="/images/med1.webp" alt="product-img" width={100} height={100} className="w-full h-full object-cover rounded" />
                                </div>
                                <h2 className="text-gray-900 hover:underline cursor-pointer mb-2">{product.name}</h2>
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-gray-800">${product.price}</h4>
                                    <div className="flex gap-1 items-center">
                                        <Rating name="half-rating-read" size="small" defaultValue={4.5} precision={0.5} readOnly />
                                        <p className="font-light text-gray-800">4.5</p>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default PopularItemsSection;