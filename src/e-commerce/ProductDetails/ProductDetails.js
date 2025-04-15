"use client";
import { Rating } from "@mui/material";
import { HiOutlineHeart, HiOutlineShare, HiShoppingCart } from "react-icons/hi2";
import Button from "@/components/Common/Button/Button";
import Reviews from "@/components/Common/Reviews/Reviews";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductDetailsTabs from "./ProductDetailsTabs";
import RelatedProducts from "./RelatedProducts";
import Quantity from "../Quantity/Quantity";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/features/cartSlice";

const ProductDetails = ({ slug }) => {
    const pathname = usePathname();
    const pathnameCategory = pathname.split("/").slice(0, 2).join("/");
    const [products, set_products] = useState([]);
    const [quantity, setQuantity] = useState(1); // Local quantity state

    useEffect(() => {
        const handleFetchProducts = async () => {
            const res = await fetch(`/data/${pathnameCategory === '/shop' ? 'products' : 'medicines'}.json`);
            const data = await res.json();
            set_products(data);
        };
        handleFetchProducts();
    }, [slug]);

    const foundProduct = products?.find(product => product._id === Number(slug));
    const { _id, name, product_image, price, stock, product_description, product_details, category } = foundProduct || {};

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(setCart({ product, order_quantity: quantity }));
    };

    const handleQuantityIncrease = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleQuantityDecrease = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    return (
        <div className="max-w-full mt-5">
            <div className=" grid grid-cols-2 max-md:grid-cols-1  gap-5 border-b border-gray-300 mb-10 pb-14">
                <div className="image-details">
                    <div className="bg-gray-300 bg-opacity-20 border border-gray-300 rounded-md h-max">
                        <Image src="/images/no-image.jpg" alt="product-img" width={100} height={100} className="w-full h-full object-cover" />
                    </div>
                    <div className="mt-4 flex  gap-2 items-center justify-items-start">
                        <div className="cursor-pointer bg-gray-300 bg-opacity-20 p-2 rounded w-16 h-14 border border-gray-300"></div>
                        <div className="cursor-pointer bg-gray-300 bg-opacity-20 p-2 rounded w-16 h-14"></div>
                        <div className="cursor-pointer bg-gray-300 bg-opacity-20 p-2 rounded w-16 h-14"></div>
                    </div>
                </div>
                <div className="product-details">
                    <h2 className="font-bold text-3xl mb-3">{name}</h2>
                    <div className="flex gap-1 items-center">
                        <Rating name="half-rating-read" size="small" defaultValue={4.5} precision={0.5} readOnly />
                        <p className=" text-gray-700">4.5 (172 reviews)</p>
                    </div>
                    <h4 className="font-bold text-2xl mb-3 mt-3">${price}</h4>
                    <h5 className={`font-semibold text-lg ${Number(stock) < 20 ? 'text-red-600' : 'text-gray-900'}`}>{stock} items left</h5>
                    <p className="text-gray-600 mt-3 mb-6">Modern science proves that your dog shares the DNA of the wolf. Years of domestication and excellent care have turned your dog from a short-lived potential foe to a long-lived best friend. Modern science proves that your dog shares the DNA of the wolf...</p>
                    <div className="mt-24">
                        <div className="flex items-center gap-1">
                            <button onClick={handleQuantityDecrease} className="border border-gray-500 w-10 h-9 flex items-center justify-center rounded">
                                -
                            </button>
                            <p className="border border-gray-500 w-16 h-9 flex items-center justify-center rounded">{quantity}</p>
                            <button onClick={handleQuantityIncrease} className="border border-gray-500 w-10 h-9 flex items-center justify-center rounded">
                                +
                            </button>
                        </div>
                        <div className="mt-5 flex gap-3">
                            <button onClick={() => handleAddToCart(foundProduct)} className="flex items-center gap-2 justify-center  text-center bg-[#1b1a1af7] text-white  rounded h-12 w-full"><HiShoppingCart /> Add to Cart</button>
                            <button className="border border-[#161515a5] rounded w-[3.3rem] flex justify-center items-center"><HiOutlineHeart className="text-xl text-[#161515]" /></button>
                        </div>
                        <div className="mt-4">
                            <Button classNames={"w-full h-10 border border-[#161515a5] rounded text-gray-900 "}><HiOutlineShare /> Share Product</Button>
                        </div>
                    </div>
                </div>
            </div>
            <ProductDetailsTabs name={name} description={product_description} details={product_details} category={category} />
            <div className="mt-10">
                <h2 className="font-semibold text-primary text-lg mb-2">Product reviews</h2>
                <Reviews />
            </div>
            <RelatedProducts products={products} />
        </div>
    );
};

export default ProductDetails;