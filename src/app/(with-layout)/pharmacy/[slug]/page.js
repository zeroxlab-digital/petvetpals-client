import Products from '@/components/ECommerce/Shop/Products';

const MedicinePage = ({ params }) => {
    return (
        <div>
            <Products params={params} />
        </div>
    );
};

export default MedicinePage;