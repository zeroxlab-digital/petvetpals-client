import ProductDetails from '@/components/ECommerce/Shop/ProductDetails';

const MedicineDetailsPage = ({ params }) => {
    return (
        <div>
            <ProductDetails params={params} />
        </div>
    );
};

export default MedicineDetailsPage;