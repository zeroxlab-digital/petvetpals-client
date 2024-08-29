"use client";
import { useEffect, useState } from "react";

const ProductDetails = ({ params }) => {
    const { category, id } = params;
    const [productDetails, setProductDetails] = useState(null);
    useEffect(() => {
        const fetchProductDetails = async () => {
            const res = await fetch('/data/products.json');
            const product = await res.json();
            const filteredCategory = product.categories.find(item => item.id === Number(category));
            const filteredProduct = filteredCategory.items.find(item => item.id === Number(id));
            setProductDetails(filteredProduct);
        }   
        fetchProductDetails()
    }, [category, id])
    return (
        <div>
            Product details page for product name: {productDetails?.name}
        </div>
    );
};

export default ProductDetails;