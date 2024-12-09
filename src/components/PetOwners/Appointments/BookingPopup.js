import React, { useEffect, useState } from 'react';
import { HiCalendar, HiOutlineClock, HiXMark } from "react-icons/hi2";
import { format, addDays } from 'date-fns';
import BookingCalendar from './BookingCalendar';
import BookingDetails from './BookingDetails';
import BookingPayment from './BookingPayment';

const BookingPopup = ({ setShowBookingModal }) => {
    const [selectedDate, setSelectedDate] = useState(undefined);
    const [selectedTime, setSelectedTime] = useState(null);

    const today = new Date();
    const twoDaysFromNow = addDays(today, 5);

    const availableTimes = [
        '06:00', '07:00', '08:30', '09:00', '09:30', '10:00', '11:00', '11:30', '12:00'
    ];

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const [stage, setStage] = useState('calendar');

    useEffect(() => {
        // Add scroll lock to the body
        document.body.classList.add('overflow-hidden');

        // Cleanup on unmount
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-[90%] max-w-[50rem] h-[80%] lg:h-[30rem] bg-white shadow-lg rounded-lg grid grid-cols-1 lg:grid-cols-[2fr_5fr] overflow-hidden">
                {/* Left Section */}
                <div className="bg-primary p-4 lg:rounded-s-lg text-left">
                    <h3 className="text-white font-bold text-xl lg:text-2xl mb-4">Book Your Appointment</h3>
                    <p className="text-gray-200 text-sm lg:text-base mb-6">Select a date and time for your session.</p>
                    <ul>
                        <li className="flex items-center gap-2 text-white mb-2 text-sm lg:text-base">
                            <HiCalendar />
                            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
                        </li>
                        <li className="flex items-center gap-2 text-white text-sm lg:text-base">
                            <HiOutlineClock />
                            {selectedTime || 'Select a time'}
                        </li>
                    </ul>
                    <p className="text-gray-200 opacity-50 mt-16 lg:mt-48 text-xs lg:text-sm">
                        All the times are according to your devices local time.
                    </p>
                </div>

                {/* Right Section */}
                <div className="relative overflow-auto hide-scrollbar bg-white">
                    <button
                        className="absolute sm:top-2 right-2 max-sm:right-0 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                        onClick={() => setShowBookingModal(false)}
                    >
                        <HiXMark size={25} />
                    </button>
                    <div className="px-4 py-4 mt-5">
                        {stage === 'calendar' ? (
                            <BookingCalendar
                                selectedDate={selectedDate}
                                handleDateSelect={handleDateSelect}
                                today={today}
                                twoDaysFromNow={twoDaysFromNow}
                                availableTimes={availableTimes}
                                handleTimeSelect={handleTimeSelect}
                                selectedTime={selectedTime}
                                setStage={setStage}
                            />
                        ) : stage === 'details' ? (
                            <BookingDetails setStage={setStage} />
                        ) : stage === 'payment' ? (
                            <BookingPayment />
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPopup;
