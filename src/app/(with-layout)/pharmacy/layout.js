import CategoriesSidebar from '@/components/PetOwners/Shop/CategoriesSidebar';
import React from 'react';

const PharmacyLayout = ({ children }) => {
    return (
        <div className="container mx-auto max-md:px-3 2xl:px-20 py-10 grid xl:grid-cols-[2fr_7fr] gap-14">
            <CategoriesSidebar />
            <div>
                {children}
            </div>
        </div>
    );
};

export default PharmacyLayout;