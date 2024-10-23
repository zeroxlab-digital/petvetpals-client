import Button from '@/components/Common/Button/Button';
import React from 'react';

const BookingDetails = ({ setStage }) => {
    let inputFilled = true;
    return (
        <div>
            Booking details
            <div onClick={() => setStage('payment')}>
                <Button variant={"primary"} classNames={`w-full mt-5 ${inputFilled ? '' : 'opacity-50 cursor-not-allowed'}`}>Continue to pay</Button>
            </div>
        </div>
    );
};

export default BookingDetails;