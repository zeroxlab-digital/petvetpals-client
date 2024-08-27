"use client";
import { useEffect, useState } from 'react';
const GetCategories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch('/data/products.json');
            const data = await res.json();
            setCategories(data.categories);
        };

        fetchCategories();
    }, []);
    return categories;
}
export default GetCategories;