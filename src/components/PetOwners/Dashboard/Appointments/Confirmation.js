import { CheckCircle, CheckSquare2Icon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { HiOutlineCalendar, HiOutlineClock, HiOutlineCreditCard, HiOutlineSparkles, HiSparkles } from 'react-icons/hi2';

const Confirmation = ({ setBookingState, appt }) => {
    console.log(appt);
    const handleContinue = () => {
        setBookingState("payment-details");
    }
    return (
        <div className=''>
            <div className='flex flex-col items-center justify-center text-center mt-10 mb-5'>
                <CheckCircle size={40} className='text-primary text-2xl mb-3' />
                <p className='text-gray-700'>You&apos;re almost there! Just confirm your appointment details below.</p>
            </div>
            <div className='rounded-lg border border-[#672e5b79] bg-[#672e5b48] py-5 px-10 mb-5'>
                <h4 className='flex items-center gap-2 text-primary text-lg font-bold mb-4'><HiOutlineSparkles className='text-2xl' /> Appointment Details</h4>
                <div className='mt-7 border rounded-lg p-3 mb-3 bg-white border-[#672e5b67] flex items-center gap-4'>
                    <Image src={appt.pet?.image || '/images/user.jpg'} alt={`pet image`} height={70} width={70} className='rounded-full w-16 h-16 object-cover' />
                    <div>
                        <h3 className='text-base font-semibold'>{appt.pet?.name}</h3>
                        <p className='text-sm text-gray-700'>{appt.pet?.breed} • {appt.pet?.age} years old • {appt.pet?.gender}</p>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    <div className='border border-[#672e5b67] bg-white rounded-lg p-3'>
                        <p className='flex items-center gap-2 font-medium text-gray-900 mb-1'><HiOutlineCalendar className='text-primary text-lg' /> Date</p>
                        <p className='text-gray-700 text-sm'>{new Date(appt.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}</p>
                    </div>
                    <div className='border border-[#672e5b67] bg-white rounded-lg p-3'>
                        <p className='flex items-center gap-2 font-medium text-gray-900 mb-1'><HiOutlineClock className='text-primary text-lg' /> Time</p>
                        <p className='text-gray-700 text-sm'>{new Date(appt.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
                    </div>
                </div>
                <div className='border border-[#672e5b67] bg-white rounded-lg p-3 mt-3'>
                    <p className='flex items-center gap-2 font-medium text-gray-900 mb-1'><HiOutlineCreditCard className='text-primary text-lg' /> Payment</p>
                    <div className='flex items-center justify-between'>
                        <p className='text-gray-700 text-sm'>Consultation Fee</p>
                        <p className='rounded-full px-2 bg-green-500 bg-opacity-20 text-sm text-green-700'>$50.00</p>
                    </div>
                </div>
            </div>
            <button
                onClick={handleContinue}
                className={` bg-primary hover:bg-primaryHover rounded-lg text-white font-medium py-4 w-full transition-colors duration-200 flex items-center justify-center gap-2 `}
            >
                Confirm & Pay $50
            </button>
        </div>
    );
};

export default Confirmation;