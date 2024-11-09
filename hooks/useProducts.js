"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useProducts = () => {
    const [products, setProducts] = useState(null);
    const pathname = usePathname();
    const products_based_on_pathname = pathname.split('/').slice(1, 2).join('/')
    useEffect(() => {
        const handleFetchProduct = async () => {
            const res = await fetch(`/data/${products_based_on_pathname === 'shop' ? 'products' : 'medicines'}.json`);
            const data = await res.json();
            setProducts(data);
        }
        handleFetchProduct();
    }, [])
    return products;
};

export default useProducts;