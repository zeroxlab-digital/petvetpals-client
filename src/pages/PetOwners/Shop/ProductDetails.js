"use client";
import Quantity from "@/components/PetOwners/Shop/Quantity";
import Image from "next/image";
import useProducts from "../../../../hooks/useProducts";

const ProductDetails = ({ params }) => {
    const products = useProducts();
    const foundProduct = products?.find(product => product._id === Number(params.id));
    const { _id, name, product_image, price, stock, product_description, product_details, category,  } = foundProduct || {};
    return (
        <div>
            <h2 className="text-lg font-semibold text-primary">Product Details</h2>
            <div className="grid grid-cols-[4fr_5fr] gap-5 mt-5">
                <div className="image-details bg-gray-200 p-5 rounded-md">
                    <Image src="/images/pet-accessories2.avif" alt="product image" width={100} height={100} className="w-full h-full" />
                </div>
                <div className="product-details">
                    <h2 className="font-bold text-3xl mb-3">{name}</h2>
                    <h4 className="font-semibld text-2xl mb-3">${price}</h4>
                    <h5 className="font-semibld text-lg">{stock} items left</h5>
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