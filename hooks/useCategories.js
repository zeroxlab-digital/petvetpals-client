"use client";
import { useEffect, useState } from "react";

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const handleFetchCategories = async () => {
            const res = await fetch('/data/categories.json');
            const data = await res.json();
            setCategories(data);
        }
        handleFetchCategories();
    }, [])
    return categories;
};

export default useCategories;