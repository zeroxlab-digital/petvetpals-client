import Cart from "@/e-commerce/Cart/Cart";

const CartPage = () => {
    return (
        <div className='app-container py-10'>
            <h2 className='text-primary mb-7 font-bold text-xl'>Your Shopping Cart</h2>
                <Cart />
        </div>
    );
};

export default CartPage;