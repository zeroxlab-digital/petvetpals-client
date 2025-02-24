import Input from '@/components/Common/Form/Input';
import Label from '@/components/Common/Form/Label';
import SelectOptions from '@/components/Common/SelectOptions/SelectOptions';
import React, { useState } from 'react';
import { HiOutlineLockClosed } from 'react-icons/hi2';
import CreditCard from '/public/images/cr.png';
import Paypal from '/public/images/paypal.png';
import ApplePay from '/public/images/applepay.png';
import Gpay from '/public/images/gpay.png';
import Image from 'next/image';
import axios from 'axios';

const BookingPayment = ({ apptId, setShowModal }) => {
    const expirationMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const expirationYear = ['2024', '2025', '2026', '2027', '2028', '2029']
    const paymentOptions = [
        { logo: CreditCard, title: 'Card' },
        { logo: Paypal, title: 'PayPal' },
        { logo: ApplePay, title: 'Apple Pay' },
        { logo: Gpay, title: 'Google Pay' }
    ]
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('Card');
    
    const handleCompleteBooking = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE}/api/appointment/update-appointment/${apptId}`, { payment_status: true, status: "confirmed" }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (res.status === 200) {
                alert("Booking completed!")
                setShowModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='text-left'>
            <h3 className='font-bold text-xl text-gray-800 '>Payment Details</h3>
            <p className='text-gray-600 font-light'>Please provide your payment information and pay <span className='text-gray-800 font-[500]'>$35.00</span> to complete the booking</p>
            <div className='grid grid-cols-4 max-sm:grid-cols-3 gap-2 text-left mt-7'>
                {paymentOptions.map((option, index) => <button key={index} onClick={() => setSelectedPaymentOption(option.title)} className={`${selectedPaymentOption === option.title && ' border-gray-400 bg-gray-100 bg-opacity-60'} border rounded text-left px-2 py-1 max-sm:last:hidden`}>
                    <Image src={option.logo} alt="Logo" width={30} height={30} />
                    <p className='font-semibold text-sm text-gray-600 mt-1'>{option.title}</p>
                </button>)}
            </div>
            <form onClick={handleCompleteBooking} className='mt-7'>
                <div className='mb-7'>
                    <Label htmlFor="nameoncard">Name on Card</Label>
                    <Input type="text" id="nameoncard" placeholder="Enter the name on your card" classNames="py-2 w-full" />
                </div>
                <div className='mb-7'>
                    <Label htmlFor="cardnumber">Card Number</Label>
                    <Input type="number" id="cardnumber" placeholder="Enter your card number" classNames="py-2 w-full" />
                </div>
                <div className='grid grid-cols-3 gap-3'>
                    <div>
                        <Label htmlFor="exmonth">Exp. Month</Label>
                        <SelectOptions options={expirationMonth} placeholder={"Month"} />
                    </div>
                    <div>
                        <Label htmlFor="exyear">Exp. Year</Label>
                        <SelectOptions options={expirationYear} placeholder={"Year"} />
                    </div>
                    <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input type="number" id="cvv" placeholder="CVV" classNames="py-2 w-full" />
                    </div>
                </div>
                <div className='mt-5 flex items-center justify-start  gap-2'>
                    <Input type="checkbox" id="terms" classNames="w-4 h-4 relative -top-[2px] cursor-pointer" />
                    <Label htmlFor="terms" classNames="cursor-pointer">I agree with terms and contidion</Label>
                </div>
                <input type="submit" value="Complete Booking" className={`bg-primary rounded-full text-white cursor-pointer py-3 w-full mt-5`} />
            </form>
            <div className='mt-4'>
                <p className='flex justify-center items-center gap-1 text-gray-700 '><HiOutlineLockClosed /> Payments are secure and encrypted</p>
            </div>
        </div>
    );
};

export default BookingPayment;