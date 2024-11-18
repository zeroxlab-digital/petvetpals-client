import CartPage from '@/components/PetOwners/CartPage/CartPage';

const Cart = () => {
    return (
        <div className='container mx-auto max-md:px-3 xl:px-20 py-14 '>
            <h2 className='text-primary mb-7 font-semibold text-2xl'>Your Shopping Cart</h2>
            <div className=''>
                <CartPage />
            </div>
        </div>
    );
};

export default Cart;