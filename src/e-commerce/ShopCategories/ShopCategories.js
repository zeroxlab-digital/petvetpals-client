"use client";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const ShopCategories = ({ type }) => {
    const dogCategories = [
        { title: "Shop all", image: "/images/cute-dog.jpg", link: "shop-all" },
        { title: "Dog food", image: "/images/dog-foods.jfif", link: "foods" },
        { title: "Dog treats", image: "/images/dog-treats.jpg", link: "treats" },
        { title: "Dog supplies", image: "/images/dog-accessories.jpg", link: "supplies" },
    ];
    const catCategories = [
        { title: "Shop all", image: "/images/cat.avif", link: "shop-all" },
        { title: "Cat food & treats", image: "/images/pet-foods.webp", link: "foods-and-treats" },
        { title: "Accessories and supplies", image: "/images/cat-accessories.webp", link: "accessories-and-supplies" },
    ];
    const dogPharmacyCategories = [
        { title: "Shop all", image: "/images/dog-medicines.jfif", link: "shop-all" },
        { title: "Dog medications", image: "/images/dog-medications.jpg", link: "dog-medications" },
        { title: "Flea & tick treatments", image: "/images/dog-flea-treat.jpg", link: "flea-tick-treatments" },
        { title: "Supplements & vitamins", image: "/images/dog-supplements.webp", link: "supplements-vitamins" },
    ];
    const catPharmacyCategories = [
        { title: "Shop all", image: "/images/cat-medicines.jfif", link: "shop-all" },
        { title: "Cat medications", image: "/images/cat-medication.jpg", link: "cat-medications" },
        { title: "Flea & tick treatments", image: "/images/cat-flea-treat.avif", link: "flea-tick-treatments" },
        { title: "Supplements & vitamins", image: "/images/cat-supplement.jpg", link: "supplements-vitamins" },
    ];

    const pathname = usePathname();
    const pathnameCategory = pathname.split("/").slice(0, 2).join("/");
    const categories =
        pathnameCategory === "/shop"
            ? type === "dog-deals"
                ? dogCategories
                : catCategories
            : type === "dog-pharmacy"
                ? dogPharmacyCategories
                : catPharmacyCategories;

    return (
        <div className="grid grid-cols-5 max-md:grid-cols-3 gap-5">
            {categories.map((category, index) => (
                <div key={index}>
                    <Link href={`${type}/${category.link}`}>
                        <div className='text-center group flex flex-col items-center'>
                            <Image
                                src={category.image}
                                alt="type-img"
                                width={100}
                                height={100}
                                className='group-hover:shadow-lg rounded-full duration-200 w-32 h-32 md:w-40 md:h-40 object-cover'
                            />
                            <p className='mt-2 text-gray-800 text-sm md:text-base group-hover:underline duration-200'>{category.title}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ShopCategories;