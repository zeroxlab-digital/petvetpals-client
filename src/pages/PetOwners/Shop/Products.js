"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useProducts from "../../../../hooks/useProducts";
import { HiOutlineHeart, HiShoppingCart } from "react-icons/hi2";
import { Rating } from "@mui/material";


const Products = ({ params }) => {

    const products = useProducts();
    const filteredProducts = products?.filter(product => product.category.category_slug === params.slug) || [];
    const currentPathname = usePathname();

    const handleButtons = (e) => {
        e.stopPropagation();
    }

    return (
        <div>
            <h2 className="text-lg font-semibold text-primary">{filteredProducts[0]?.category?.category_name}</h2>
            {filteredProducts.length > 0 ?
                <div className="items mt-5 grid grid-cols-4 gap-5">
                    {filteredProducts.map(product => <div key={product._id} className="border rounded-md p-3">
                        <Link href={{
                            pathname: `${currentPathname}/${product._id}`,
                            query: {
                                title: `${product.name.toLowerCase()}`
                            }
                        }}>
                            <div className="bg-gray-300 bg-opacity-10 rounded w-auto h-52 mb-3">
                                {/* Product Image Here */}
                            </div>
                            <h2 className="text-gray-900 hover:underline cursor-pointer mb-2">{product.name}</h2>
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-800">${product.price}</h4>
                                <div className="flex gap-1 items-center">
                                    <Rating name="half-rating-read" size="small" defaultValue={4.5} precision={0.5} readOnly />
                                    <p className="font-light text-gray-800">4.5</p>
                                </div>
                            </div>
                        </Link>
                        <div className="mt-4 flex gap-2">
                            <button onClick={(e) => handleButtons(e)} className="flex items-center gap-2 justify-center  text-center bg-[#1b1a1af7] text-white  rounded h-10 w-full"><HiShoppingCart /> Add to Cart</button>
                            <button onClick={(e) => handleButtons(e)} className="border border-[#161515a5] rounded w-[3.3rem] flex justify-center items-center"><HiOutlineHeart className="text-xl text-[#161515]" /></button>
                        </div>
                    </div>)}
                </div>
                :
                <div>
                    <h2>No Products Were Found!</h2>
                </div>
            }
        </div>
    );
};

export default Products;