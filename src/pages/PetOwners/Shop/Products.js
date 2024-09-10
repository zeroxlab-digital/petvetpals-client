"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useProducts from "../../../../hooks/useProducts";

const Products = ({ params }) => {

    const products = useProducts();
    const filteredProducts = products?.filter(product => product.category.category_slug === params.slug) || [];
    const currentPathname = usePathname();

    return (
        <div>
            <h2 className="text-lg font-semibold text-primary">{filteredProducts[0]?.category?.category_name}</h2>
            {filteredProducts.length > 0 ?
                <div className="items mt-5 grid grid-cols-4 gap-5">
                    {filteredProducts.map(product => <Link href={{
                        pathname: `${currentPathname}/${product._id}`,
                        query: {
                            title: `${product.name.toLowerCase()}`
                        }
                    }} key={product._id} className="border rounded-md p-3">
                        <Image src="/images/pet-accessories2.avif" alt="product-image" width={300} height={200} className="mb-3" />
                        <h2 className="text-gray-700 hover:underline cursor-pointer mb-2">{product.name}</h2>
                        <h4 className="font-semibold text-gray-800">${product.price}</h4>
                    </Link>)}
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