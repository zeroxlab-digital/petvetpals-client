"use client";
import Quantity from "@/components/PetOwners/Shop/Quantity";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
    console.log(productDetails)
    const pathname = usePathname();
    console.log(pathname)
    return (
        <div>
            <h2 className="text-lg font-semibold text-primary">Product Details</h2>
            <div className="grid grid-cols-[4fr_5fr] gap-5 mt-5">
                <div className="image-details bg-gray-200 p-5 rounded-md">
                    <Image src="/images/pet-accessories2.avif" alt="product image" width={100} height={100} className="w-full h-full" />
                </div>
                <div className="product-details">
                    <h2 className="font-bold text-3xl mb-3">{productDetails?.name}</h2>
                    <h4 className="font-semibld text-2xl">${productDetails?.price}</h4>
                    <Quantity />
                    <div className="actions mt-20 grid grid-cols-2 max-lg:grid-cols-1 gap-5">
                        <button className="bg-transparent border border-[#58294e] h-12 rounded-md text-primary font-semibold ">Add to cart</button>
                        <button className="bg-primary  h-12 rounded-md text-white font-semibold ">Buy now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;