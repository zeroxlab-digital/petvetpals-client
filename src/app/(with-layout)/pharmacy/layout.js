import CategoriesSidebar from '@/e-commerce/CategoriesSidebar/CategoriesSidebar';
import React from 'react';

const PharmacyLayout = ({ children }) => {
    return (
        <div className='app-container py-10 grid lg:grid-cols-5 gap-10'>
            <CategoriesSidebar />
            <div className='lg:col-span-4'>
                {children}
            </div>
        </div>
    );
};

export default PharmacyLayout;