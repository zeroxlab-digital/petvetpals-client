import Breadcrumb from '@/components/Common/Breadcrumb/Breadcrumb';
import ProductDetails from '@/components/E-commerce/ProductDetails/ProductDetails';
import Products from '@/components/E-commerce/Products/Products';
import ShopCategories from '@/components/E-commerce/ShopCategories/ShopCategories';
import React from 'react';

const page = ({ params }) => {
    const { slug } = params;
    if (slug.length === 1) {
        return (
            <>
                <ShopCategories type={slug[0]} />
                <div className='mt-10'>
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