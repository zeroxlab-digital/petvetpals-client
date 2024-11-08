import Products from '@/pages/PetOwners/Shop/Products';

const MedicinePage = ({ params }) => {
    return (
        <div>
            <Products params={params} />
        </div>
    );
};

export default MedicinePage;