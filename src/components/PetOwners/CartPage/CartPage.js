import { Rating } from '@mui/material';
import Quantity from '../Shop/Quantity';
import { HiOutlineTrash } from 'react-icons/hi2';
import Button from '@/components/Common/Button/Button';

const CartPage = () => {
    const cartItems = [
        { title: "Grain free dog foods", description: "High quality, grain free dog foods for all.", price: 52.99, quantity: 1 },
        { title: "Grain free dog foods", description: "High quality, grain free dog foods for all.", price: 50.99, quantity: 2 },
        { title: "Grain free dog foods", description: "High quality, grain free dog foods for all.", price: 20.19, quantity: 1 },
        { title: "Grain free dog foods", description: "High quality, grain free dog foods for all.", price: 20.19, quantity: 1 },
    ]

    return (
        <div className='grid grid-cols-[4fr_2fr] max-lg:grid-cols-1 gap-7 items-start'>
            <div className="cart-items rounded-md border px-5 flex flex-col">
                {cartItems.map((item, index) => <div key={index} className='grid grid-cols-[4fr_1fr] max-sm:grid-cols-1 gap-5 items-center py-5 border-b last:border-none'>
                    <div className='flex sm:items-center gap-5'>
                        <div className='product-img min-w-24 h-24 rounded-md bg-gray-200'></div>
                        <div className='product-details'>
                            <h4 className='font-semibold text-xl mb-1'>{item.title}</h4>
                            <p className='text-gray-500 mb-3'>{item.description}</p>
                            <div className='flex items-center gap-2'><Rating name="half-rating-read" size="small" defaultValue={4} precision={0.5} readOnly /> <h4 className='text-gray-600 text-sm'>4.5</h4></div>
                        </div>
                    </div>
                    <div className='flex flex-col sm:items-end sm:text-right'>
                        <h2 className='font-semibold text-xl mb-2'>${item.price}</h2>
                        <Quantity />
                        <button className='flex items-center gap-2 text-red-500 mt-3'><HiOutlineTrash /> Remove</button>
                    </div>
                </div>)}
            </div>
            <div className='order-summary rounded-md border p-5'>
                <h4 className='mb-5 font-semibold text-xl'>Order summary</h4>
                <ul className='flex flex-col gap-3 border-b pb-3 mb-3'>
                    <li className='flex items-center justify-between'><p>Subtotal</p> <p>$120.83</p></li>
                    <li className='flex items-center justify-between'><p>Shipping</p> <p>$0.00</p></li>
                    <li className='flex items-center justify-between'><p>Tax</p> <p>$0.00</p></li>
                </ul>
                <div className='flex items-center justify-between font-semibold text-lg'>
                    <p>Total</p>
                    <p>$120.83</p>
                </div>
                <div className='actions mt-8'>
                    <form className='flex items-center gap-3 mb-3'>
                        <input type="text" placeholder='Enter coupon code' className='w-full font-normal text-base border rounded-md p-2 outline-none' />
                        <input type="submit" value="Apply" className='bg-black cursor-pointer py-2 rounded-md w-28 text-white' />
                    </form>
                    <Button variant={"primary"} classNames={"w-full rounded-md"}>Proceed to Checkout</Button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;