import { usePathname } from "next/navigation";
import useProducts from "../../../../hooks/useProducts";
import { HiOutlineHeart, HiShoppingCart } from "react-icons/hi2";
import { Rating } from "@mui/material";
import Link from "next/link";

const RelatedProducts = () => {
    const products = useProducts();
    const currentPathname = usePathname();
    const pathnameSlug = currentPathname.split('/').slice(0, -1).join('/');
    const relatedProducts = products?.filter(item => item.category.category_slug === pathnameSlug.split('/').slice(2, 3).join(''));
    return (
        <div className="mt-10">
            <h2 className="font-semibold text-primary text-lg">Related products</h2>
            <div className="items mt-5 grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
                {relatedProducts?.slice(0, 4).map(product => <div key={product._id} className="border rounded-md p-3">
                    <Link href={{
                        pathname: `${pathnameSlug}/${product._id}`,
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
        </div>
    );
};

export default RelatedProducts;