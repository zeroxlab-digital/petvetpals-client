import CategoriesSidebar from '@/components/PetOwners/Shop/CategoriesSidebar';
import React from 'react';

const PharmacyLayout = ({ children }) => {
    return (
        <div className="container py-10 grid grid-cols-[2fr_7fr] gap-14">
            <CategoriesSidebar />
            <div>
                {children}
            </div>
        </div>
    );
};

export default PharmacyLayout;