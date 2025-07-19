import React, { useEffect, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import BookingDetails from './BookingDetails';
import BookingPayment from './BookingPayment';
import Confirmation from './Confirmation';

const ConfirmBookingModal = ({ setShowModal, appt }) => {
    const [bookingStage, setBookingState] = useState("pet-details");
    const [selectedPet, setSelectedPet] = useState(null);
    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        }
    }, [])
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="relative w-[95%] max-w-[30rem] bg-white shadow-lg rounded-lg overflow-hidden hide-scrollbar">

                <div className='overflow-auto hide-scrollbar h-[35rem] p-4'>
                    {
                        bookingStage == "pet-details" ?
                            <BookingDetails apptId={appt._id} setBookingState={setBookingState} selectedPet={selectedPet} setSelectedPet={setSelectedPet} />
                            :
                            bookingStage == "confirmation" ?
                                <Confirmation appt={appt} setBookingState={setBookingState} selectedPet={selectedPet} />
                                :
                                bookingStage == "payment-details" ?
                                    <BookingPayment apptId={appt._id} setShowModal={setShowModal} selectedPet={selectedPet} />
                                    :
                                    null
                    }
                </div>

                <button
                    className="absolute top-2 right-2 sm:right-2 sm:top-2 max-sm:right-2 max-sm:top-2 w-7 h-7 flex items-center justify-center bg-red-500 bg-opacity-80 hover:bg-opacity-100 duration-200 text-white rounded-full"
                    onClick={() => setShowModal(false)}
                >
                    <HiXMark size={20} />
                </button>
            </div>
        </div>
    );
};

export default ConfirmBookingModal;