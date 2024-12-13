import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineHeart, HiShoppingCart } from "react-icons/hi2";

const Products = ({ _id, name, price, currentPathname }) => {
    return (
        <>
            <Link href={{
                pathname: `${currentPathname}/cat-foods/${_id}`,
                query: {
                    title: `${name.toLowerCase()}`
                }
            }}>
                <div className="bg-gray-300 bg-opacity-10 rounded w-auto h-52 mb-3">
                    <Image src="/images/med1.webp" alt="product-img" width={100} height={100} className="w-full h-auto object-cover" />
                </div>
                <h2 className="text-gray-900 hover:underline cursor-pointer mb-2">{name}</h2>
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">${price}</h4>
                    <div className="flex gap-1 items-center">
                        <Rating name="half-rating-read" size="small" defaultValue={4.5} precision={0.5} readOnly />
                        <p className="font-light text-gray-800">4.5</p>
                    </div>
                </div>
            </Link>
            <div className="mt-4 flex gap-2">
                <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 justify-center  text-center bg-[#1b1a1af7] text-white  rounded h-10 w-full"><HiShoppingCart /> Add to Cart</button>
                <button onClick={(e) => e.stopPropagation()} className="border border-[#161515a5] rounded w-[3.3rem] flex justify-center items-center"><HiOutlineHeart className="text-xl text-[#161515]" /></button>
            </div>
        </>
    );
};

export default Products;