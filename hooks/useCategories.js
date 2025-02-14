"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// [
//     {
//         "category_name": "Dog Foods",
//         "category_slug": "dog-foods",
//         "category_image": "/images/dog-foods.jfif"
//     },
//     {
//         "category_name": "Cat Foods",
//         "category_slug": "cat-foods",
//         "category_image": "/images/pet-foods.webp"
//     },
//     {
//         "category_name": "Rabbit Foods",
//         "category_slug": "rabbit-foods",
//         "category_image": "/images/dog-foods.jfif"
//     },
//     {
//         "category_name": "Bird Foods",
//         "category_slug": "bird-foods",
//         "category_image": "/images/dog-foods.jfif"
//     },
//     {
//         "category_name": "Fish Foods",
//         "category_slug": "fish-foods",
//         "category_image": "/images/fish-foods.webp"
//     },
//     {
//         "category_name": "Pet Accessories",
//         "category_slug": "pet-accessories",
//         "category_image": "/images/pet-accessories.webp"
//     },
//     {
//         "category_name": "Pet Toys",
//         "category_slug": "pet-toys",
//         "category_image": "/images/pet-accessories.webp"
//     },
//     {
//         "category_name": "Others",
//         "category_slug": "others",
//         "category_image": "/images/pet-accessories.webp"
//     }
// ]

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const pathname = usePathname();
    const category_based_on_pathname = pathname.split('/').slice(1, 2).join('/')
    // console.log(categories)
    useEffect(() => {
        const handleFetchCategories = async () => {
            const res = await fetch(`/data/${category_based_on_pathname === 'shop' ? 'categories' : 'pharmacy_categories'}.json`);
            const data = await res.json();
            setCategories(data);
        }
        handleFetchCategories();
    }, [])
    return categories;
};

export default useCategories;