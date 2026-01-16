import CategoriesSidebar from '@/components/E-commerce/CategoriesSidebar/CategoriesSidebar';
import React from 'react';

export const metadata = {
    title: "Pet Pharmacy – Medications & Supplements | PetVetPals",
    description: "Shop vet-approved pet medications, supplements, and health products at PetVetPals. Keep your pets healthy with trusted pharmacy essentials!",
};

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