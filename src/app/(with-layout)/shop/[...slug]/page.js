import Breadcrumb from '@/components/Common/Breadcrumb/Breadcrumb';
import ProductDetails from '@/e-commerce/ProductDetails/ProductDetails';
import Products from '@/e-commerce/Products/Products';
import ShopCategories from '@/e-commerce/ShopCategories/ShopCategories';
import React from 'react';

const page = ({ params }) => {
    const { slug } = params;
    if (slug.length === 1) {
        return (
            <>
                <ShopCategories type={slug[0]} />
                <div className='mt-14'>
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
                <Breadcrumb />
                <ProductDetails slug={slug[2]} />
            </>
        )
    }
};

export default page;