"use client";
import React from 'react';
import Link from 'next/link';
import { LuCat, LuDog, LuPill } from "react-icons/lu";
import { usePathname } from 'next/navigation';
import useCategories from '../../../hooks/useCategories';

const ShopDeals = () => {
    const categories = useCategories();
    const pathname = usePathname();
    return (
        <div className='grid grid-cols-2 max-sm:grid-cols-1 items-center gap-8 text-center'>
            {categories.map((category) => <Link href={{
                pathname: `${pathname.slice(1, pathname.length)}/${category.category_slug}`,
                query: {
                    title: `${category.category_name.toLowerCase()}`
                }
            }} key={category.category_slug} className='border rounded-lg hover:shadow-lg duration-200 w-full h-32 text-center flex items-center justify-center relative group overflow-hidden '
                style={{
                    backgroundImage: `url('/images/cute-dog.jpg')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                {/* Hover effect applied to background */}
                <div
                    className='absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-110 z-[0]'
                    style={{
                        backgroundImage: `url('/images/cute-dog.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                ></div>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black opacity-30 z-[1]"></div>
                <button className='font-bold text-white uppercase text-sm z-10 bg-transparent border group-hover:border-none group-hover:bg-primary duration-300 ease-in-out w-44 h-12 rounded-full '>{category.category_name}</button>
            </Link>
            )}
        </div>
    );
};

export default ShopDeals;