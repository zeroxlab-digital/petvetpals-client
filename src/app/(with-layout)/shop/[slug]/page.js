import Products from '@/components/ECommerce/Shop/Products';


const ProductsPage = ({ params }) => {
    return (
        <div className=''>
            <Products params={params} />
        </div>
    );
};

export default ProductsPage;