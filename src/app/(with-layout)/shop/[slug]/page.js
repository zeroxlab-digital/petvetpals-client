import Products from '@/pages/PetOwners/Shop/Products';
import React from 'react';

const ProductsPage = ({ params }) => {
    return (
        <div>
            <Products params={params} />
        </div>
    );
};

export default ProductsPage;