import CategoriesSidebar from '@/e-commerce/CategoriesSidebar/CategoriesSidebar';
import React from 'react';

export const metadata = {
    title: "Shop Pet Foods & Accessories | PetVetPals",
    description: "Browse high-quality pet foods, toys, accessories, and more at PetVetPals. Find the best products to keep your pets happy and healthy!",
};

const ShopLayout = ({ children }) => {
    return (
        <div className='app-container py-10 grid lg:grid-cols-5 gap-10'>
            <CategoriesSidebar />
            <div className='lg:col-span-4'>
                {children}
            </div>
        </div>
    );
};

export default ShopLayout;