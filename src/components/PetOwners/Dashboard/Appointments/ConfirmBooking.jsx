import React, { useEffect, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import BookingDetails from './BookingDetails';
import BookingPayment from './BookingPayment';
import Confirmation from './Confirmation';

const ConfirmBooking = ({ setShowModal, appt }) => {
    const [bookingStage, setBookingState] = useState("pet-details");
    const [selectedPet, setSelectedPet] = useState(null);
    return (
        <div>
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
    );
};

export default ConfirmBooking;