"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const pathname = usePathname();
    const category_based_on_pathname = pathname.split('/').slice(1, 2).join('/')

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