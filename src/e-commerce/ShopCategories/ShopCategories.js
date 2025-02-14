"use client";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const ShopCategories = ({ type }) => {
    const dogCategories = [
        { title: "Shop all", image: "", link: "shop-all" },
        { title: "Dog food", image: "", link: "foods" },
        { title: "Dog treats", image: "", link: "treats" },
        { title: "Dog supplies", image: "", link: "supplies" },
    ]
    const catCategories = [
        { title: "Shop all", image: "", link: "shop-all" },
        { title: "Cat food & treats", image: "", link: "foods-and-treats" },
        { title: "Accessories and supplies", image: "", link: "accessories-and-supplies" },
    ]
    const dogPharmacyCategories = [
        { title: "Shop all", image: "", link: "shop-all" },
        { title: "Dog medications", image: "", link: "dog-medications" },
        { title: "Flea & tick treatments", image: "", link: "flea-tick-treatments" },
        { title: "Supplements & vitamins", image: "", link: "supplements-vitamins" },
    ];

    const catPharmacyCategories = [
        { title: "Shop all", image: "", link: "shop-all" },
        { title: "Cat medications", image: "", link: "cat-medications" },
        { title: "Flea & tick treatments", image: "", link: "flea-tick-treatments" },
        { title: "Supplements & vitamins", image: "", link: "supplements-vitamins" },
    ];

    const pathname = usePathname();
    const pathnameCategory = pathname.split("/").slice(0, 2).join("/");
    return (
        <div>
            {pathnameCategory === "/shop" ?
                <>
                    {
                        type === "dog-deals" ?
                            <div className='flex gap-5 flex-wrap justify-evenly'>
                                {
                                    dogCategories.map((category, index) => <Link key={index} href={`${type}/${category.link}`}>
                                        <div className='text-center group flex flex-col items-center'>
                                            <Image
                                                src={"/images/cat.avif"}
                                                alt="type-img"
                                                width={100}
                                                height={100}
                                                className='group-hover:shadow-lg rounded-full duration-200 w-32 h-32 md:w-40 md:h-40'
                                            />
                                            <p className='mt-2 text-gray-800 text-sm md:text-base group-hover:underline duration-200'>{category.title}</p>
                                        </div>
                                    </Link>)
                                }
                            </div>
                            :
                            <div className='flex gap-5 flex-wrap justify-evenly'>
                                {
                                    catCategories.map((category, index) => <Link key={index} href={`${type}/${category.link}`} >
                                        <div className='text-center group flex flex-col items-center'>
                                            <Image
                                                src={"/images/cat.avif"}
                                                alt="type-img"
                                                width={100}
                                                height={100}
                                                className='group-hover:shadow-lg rounded-full duration-200 w-32 h-32 md:w-40 md:h-40'
                                            />
                                            <p className='mt-2 text-gray-800 text-sm md:text-base group-hover:underline duration-200'>{category.title}</p>
                                        </div>
                                    </Link>)
                                }
                            </div>
                    }
                </>
                :
                <>
                    {
                        type === "dog-pharmacy" ?
                            <div className='flex gap-5 flex-wrap justify-evenly'>
                                {
                                    dogPharmacyCategories.map((category, index) => <Link key={index} href={`${type}/${category.link}`}>
                                        <div className='text-center group flex flex-col items-center'>
                                            <Image
                                                src={"/images/cat.avif"}
                                                alt="type-img"
                                                width={100}
                                                height={100}
                                                className='group-hover:shadow-lg rounded-full duration-200 w-32 h-32 md:w-40 md:h-40'
                                            />
                                            <p className='mt-2 text-gray-800 text-sm md:text-base group-hover:underline duration-200'>{category.title}</p>
                                        </div>
                                    </Link>)
                                }
                            </div>
                            :
                            <div className='flex gap-5 flex-wrap justify-evenly'>
                                {
                                    catPharmacyCategories.map((category, index) => <Link key={index} href={`${type}/${category.link}`} >
                                        <div className='text-center group flex flex-col items-center'>
                                            <Image
                                                src={"/images/cat.avif"}
                                                alt="type-img"
                                                width={100}
                                                height={100}
                                                className='group-hover:shadow-lg rounded-full duration-200 w-32 h-32 md:w-40 md:h-40'
                                            />
                                            <p className='mt-2 text-gray-800 text-sm md:text-base group-hover:underline duration-200'>{category.title}</p>
                                        </div>
                                    </Link>)
                                }
                            </div>
                    }
                </>
            }
        </div>
    );
};

export default ShopCategories;