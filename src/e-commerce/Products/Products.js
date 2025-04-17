"use client";
import Breadcrumb from '@/components/Common/Breadcrumb/Breadcrumb';
import { setCart } from '@/redux/features/cartSlice';
import { Rating } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { HiOutlineHeart, HiShoppingCart } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import FilterSort from '../ProductFilterSort/FilterSort';

const Products = ({ slug }) => {
    const pathname = usePathname();
    const pathnameCategory = pathname.split("/").slice(0, 2).join("/");
    const [products, set_products] = useState([]);
    useEffect(() => {
        const handleFetchProducts = async () => {
            const res = await fetch(`/data/${pathnameCategory === '/shop' ? 'products' : 'medicines'}.json`)
            const data = await res.json();
            if (slug.length < 2) {
                const productsBasedOnDeal = data.filter(product => product.category.deal_type === slug[0]);
                set_products(productsBasedOnDeal);
            } else if (slug[1] === "shop-all") {
                const productsBasedOnDeal = data.filter(product => product.category.deal_type === slug[0]);
                set_products(productsBasedOnDeal);
            } else {
                const filteredProducts = data.filter(product => product.category.slug === slug[1]);
                set_products(filteredProducts);
            }
        }
        handleFetchProducts();
    }, [slug])
    let href;
    if (slug.length === 1) {
        href = slug[0] + "/shop-all"
    } else {
        href = slug[1]
    }

    const disptach = useDispatch();
    const handleAddToCart = (e, product) => {
        e.stopPropagation()
        disptach(setCart({ product, order_quantity: 1 }));
    }
    return (
        <div>
            <div className='flex max-md:flex-col max-md:gap-4 items-center justify-between mb-8'>
                <Breadcrumb />
                <FilterSort />
            </div>
            <div className='grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5'>
                {
                    products.length > 0 ?
                        products.map(product => <div key={product._id} className='border pb-3 rounded-md'>
                            <Link
                                href={{
                                    pathname: `${href + '/' + product._id}`,
                                    query: {
                                        title: `${product.name.toLowerCase()}`,
                                        description: `${product.product_description.toLowerCase()}`
                                    }
                                }}
                            >
                                <div className="bg-gray-300 bg-opacity-10 rounded w-auto h-max mb-3">
                                    <Image src="/images/no-image.png" alt="product-img" width={100} height={100} className="w-full h-full object-cover rounded" />
                                </div>
                                <div className='px-3'>
                                    <h2 className="text-gray-900 hover:underline cursor-pointer mb-2">{product.name}</h2>
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold text-gray-800">${product.price}</h4>
                                        <div className="flex gap-1 items-center">
                                            <Rating name="half-rating-read" size="small" defaultValue={4.5} precision={0.5} readOnly />
                                            <p className="font-light text-gray-800">4.5</p>
                                        </div>
                                    </div>
                                    <p className='text-sm text-gray-800 mt-2'>{product.product_description.slice(0, 60)}...</p>
                                </div>
                            </Link>
                            <div className="mt-4 flex gap-2 px-3">
                                <button onClick={(e) => handleAddToCart(e, product)} className="flex items-center gap-2 justify-center  text-center bg-[#1b1a1af7] text-white  rounded h-10 w-full"><HiShoppingCart /> Add to Cart</button>
                                <button onClick={(e) => e.stopPropagation()} className="border border-[#161515a5] rounded w-[3.3rem] flex justify-center items-center"><HiOutlineHeart className="text-xl text-[#161515]" /></button>
                            </div>
                        </div>)
                        :
                        <div>
                            <h3>No products available!</h3>
                        </div>
                }
            </div >
        </div>
    );
};

export default Products;