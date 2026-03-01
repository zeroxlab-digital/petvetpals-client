"use client";
import { Rating } from '@mui/material';
import { HiOutlineTrash, HiShoppingBag } from 'react-icons/hi2';
import Button from '@/components/Common/Button/Button';
import Quantity from '../Quantity/Quantity';
import { useDispatch, useSelector } from 'react-redux';
import { removeProductFromCart } from '@/redux/features/cartSlice';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, PackageOpen, Search, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const Cart = () => {
    const cart = useSelector((state) => state.cartRedu.cart);

    const dispatch = useDispatch();
    const handleRemoveProduct = (productId) => {
        dispatch(removeProductFromCart(productId))
    }

    const subTotal = cart.reduce((sum, item) => {
        return sum + item.order_quantity * item.product.price;
    }, 0)

    const shippingTotal = 4.99;
    const taxTotal = 0;
    const total = subTotal + shippingTotal + taxTotal;

    return (
        <div className='app-container py-10'>
            {
                cart.length > 0 ?
                    <>
                        <h2 className='text-primary mb-7 font-semibold text-xl'>Your Shopping Cart</h2>
                        <div className='grid grid-cols-[4fr_2fr] max-lg:grid-cols-1 gap-7 items-start'>
                            <div className="cart-items rounded-md border px-5 flex flex-col">
                                {cart.map((item, index) => (
                                    <div key={index} className='grid grid-cols-[4fr_1fr] max-sm:grid-cols-1 gap-5 max-sm:gap-8 items-center py-5 border-b last:border-none'>
                                        <div className='flex items-center gap-5'>
                                            <div className='product-img w-24 h-24 max-sm:min-w-24 rounded-md bg-gray-200'></div>
                                            <div className='product-details'>
                                                <h4 className='font-semibold text-lg mb-1'>{item.product.name}</h4>
                                                <p className='text-gray-500 mb-2 '>{item.product.product_description.slice(0, 40)}...</p>
                                                <div className='flex items-center gap-2'><Rating name="half-rating-read" size="small" defaultValue={4} precision={0.5} readOnly /> <h4 className='text-gray-600 text-sm'>4.5</h4></div>
                                            </div>
                                        </div>
                                        <div className='flex max-sm:justify-between sm:flex-col items-center sm:items-end sm:text-right'>
                                            <h2 className='font-semibold text-xl sm:mb-2'>${item.product.price}</h2>
                                            <Quantity item={item} />
                                            <button onClick={() => handleRemoveProduct(item.product._id)} className='flex items-center gap-2 text-red-500 sm:mt-3'><HiOutlineTrash /> Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='order-summary rounded-md border p-5'>
                                <h4 className='mb-5 font-semibold text-xl'>Order summary</h4>
                                <ul className='flex flex-col gap-3 border-b pb-3 mb-3'>
                                    <li className='flex items-center justify-between'><p>Subtotal</p> <p>${subTotal.toFixed(2)}</p></li>
                                    <li className='flex items-center justify-between'><p>Shipping</p> <p>${shippingTotal.toFixed(2)}</p></li>
                                    <li className='flex items-center justify-between'><p>Tax</p> <p>${taxTotal.toFixed(2)}</p></li>
                                </ul>
                                <div className='flex items-center justify-between font-semibold text-lg'>
                                    <p>Total</p>
                                    <p>${total.toFixed(2)}</p>
                                </div>
                                <div className='actions mt-8'>
                                    <form className='flex items-center gap-3 mb-3'>
                                        <input type="text" placeholder='Enter coupon code' className='w-full font-normal text-base border rounded-md p-2 outline-none' />
                                        <input type="submit" value="Apply" className='bg-black cursor-pointer py-2 rounded-md w-28 text-white' />
                                    </form>
                                    <Button variant={"primary"} classNames={"w-full rounded-lg"}>Proceed to Checkout</Button>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    // <div className='flex items-center justify-center text-center p-3'>
                    //     <h3 className='text-2xl font-semibold text-gray-700'>Your cart is empty! Purchase our products to become a legendary customer, today.</h3>
                    // </div>
                    <div className="py-20 flex flex-col items-center justify-center px-6 text-center">

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative mb-8"
                        >
                            <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center border-2 border-dashed border-slate-200">
                                <HiShoppingBag size={56} className="text-slate-300" />
                            </div>

                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                                className="absolute -top-2 -right-2 bg-white p-3 rounded-2xl shadow-xl border border-slate-100"
                            >
                                <Search size={20} className="text-primary" />
                            </motion.div>
                        </motion.div>

                        <h2 className="text-2xl font-black text-slate-900 mb-3">Cart is Empty!</h2>
                        <p className="text-slate-500 max-w-[280px] mx-auto leading-relaxed mb-10">
                            It looks like you haven&apos;t added any items yet. Treat your furry friend to something special!
                        </p>

                        <div className="flex flex-col w-full max-w-xs gap-3">
                            <Link href="/pharmacy" className="w-full">
                                <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all">
                                    <ShoppingBag size={18} />
                                    Browse the Pharmacy
                                </button>
                            </Link>

                            <Link href="/dashboard" className="w-full">
                                <button className="w-full py-4 bg-white text-slate-600 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2 active:scale-95 transition-all">
                                    Get AI Recommendations
                                    <ArrowRight size={18} className="text-slate-400" />
                                </button>
                            </Link>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Cart;