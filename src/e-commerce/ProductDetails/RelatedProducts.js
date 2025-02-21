import { usePathname } from "next/navigation";
import { HiOutlineHeart, HiShoppingCart } from "react-icons/hi2";
import { Rating } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

const RelatedProducts = ({ products }) => {

    return (
        <div className="mt-10">
            <h2 className="font-semibold text-primary text-lg mb-5">Related products</h2>
            <div className='grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5'>
                {
                    products.length > 0 ?
                        products.slice(0, 4).map(product => <div key={product._id} className='border pb-3 rounded-md'>
                            <Link
                                href={{
                                    pathname: `${product._id}`,
                                    query: {
                                        title: `${product.name.toLowerCase()}`,
                                        description: `${product.product_description.toLowerCase()}`
                                    }
                                }}
                            >
                                <div className="bg-gray-300 bg-opacity-10 rounded w-auto h-max mb-3">
                                    <Image src="/images/med1.webp" alt="product-img" width={100} height={100} className="w-full h-full object-cover rounded" />
                                </div>
                                <div className='px-3'>
                                    <h2 className="text-gray-900 hover:underline cursor-pointer mb-2">{product.name}</h2>
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold text-gray-800">${product.price}</h4>
                                        <div className="flex gap-1 items-center">
                                            <Rating name="half-rating-read" size="small" defaultValue={4.5} precision={0.5} readOnly />
                                            <p className="font-light text-gray-800">4.5</p>
                                        </div>
                                    </div>
                                    <p className='text-sm text-gray-800 mt-2'>{product.product_description.slice(0, 60)}...</p>
                                </div>
                            </Link>
                            <div className="mt-4 flex gap-2 px-3">
                                <button onClick={(e) => handleAddToCart(e, product)} className="flex items-center gap-2 justify-center  text-center bg-[#1b1a1af7] text-white  rounded h-10 w-full"><HiShoppingCart /> Add to Cart</button>
                                <button onClick={(e) => e.stopPropagation()} className="border border-[#161515a5] rounded w-[3.3rem] flex justify-center items-center"><HiOutlineHeart className="text-xl text-[#161515]" /></button>
                            </div>
                        </div>)
                        :
                        <div>
                            <h3>No products available!</h3>
                        </div>
                }
            </div >
        </div>
    );
};

export default RelatedProducts;