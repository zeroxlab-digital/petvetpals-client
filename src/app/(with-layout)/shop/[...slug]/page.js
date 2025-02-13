import ProductDetails from '@/e-commerce/ProductDetails/ProductDetails';
import Products from '@/e-commerce/Products/Products';
import ShopCategories from '@/e-commerce/ShopCategories/ShopCategories';
import React from 'react';

const page = ({ params }) => {
    const { slug } = params;
    console.log("slug:", slug);
    console.log("slug length:", slug.length);
    if (slug.length === 1) {
        return (
            <>
                <ShopCategories type={slug[0]} />
                <div className='mt-10'>
                    <h2 className='font-bold text-primary text-xl mb-5'>All products</h2>
                    <Products slug={slug} />
                </div>
            </>
        )
    } else if (slug.length === 2) {
        return (
            <>
                <Products slug={slug} />
            </>
        )
    } else if (slug.length === 3) {
        return (
            <>
                <ProductDetails slug={slug[2]} />
            </>
        )
    }
};

export default page;