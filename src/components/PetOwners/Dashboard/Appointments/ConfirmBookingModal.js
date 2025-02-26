import React, { useEffect, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import BookingDetails from './BookingDetails';
import BookingPayment from './BookingPayment';

const ConfirmBookingModal = ({ setShowModal, apptId }) => {
    const [bookingStage, setBookingState] = useState("pet-details")
    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        }
    }, [])
    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className="relative w-[95%] max-w-[50rem] bg-white shadow-lg rounded-lg overflow-hidden hide-scrollbar">

                <div className='overflow-auto hide-scrollbar h-[80%] lg:h-max p-4'>
                    {
                        bookingStage == "pet-details" ?
                            <BookingDetails apptId={apptId} setBookingState={setBookingState} />
                            :
                            bookingStage == "payment-details" ?
                                <BookingPayment apptId={apptId} setShowModal={setShowModal} />
                                :
                                null
                    }
                </div>

                <button
                    className="absolute top-2 right-2 sm:right-2 sm:top-2 max-sm:right-2 max-sm:top-2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-700"
                    onClick={() => setShowModal(false)}
                >
                    <HiXMark size={25} />
                </button>
            </div>
        </div>
    );
};

export default ConfirmBookingModal;