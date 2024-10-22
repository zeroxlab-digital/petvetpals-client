import React, { useState } from 'react';
import { HiCalendar, HiOutlineClock, HiXMark } from "react-icons/hi2";
import { DayPicker } from 'react-day-picker';
import { format, addDays } from 'date-fns';
import './Booking.css'
import BookingCalendar from './BookingCalendar';

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
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-[50rem] h-[30rem] bg-white shadow-lg rounded-lg grid grid-cols-[2fr_5fr]">
                <div className="text-left bg-primary p-4 rounded-s-lg">
                    <h3 className="text-white font-bold text-2xl mb-4">Book Your Appointment</h3>
                    <p className="text-gray-200 text-base mb-7">Select a date and time for your session.</p>
                    <ul>
                        <li className="flex items-center gap-2 text-white mb-2">
                            <HiCalendar />
                            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
                        </li>
                        <li className="flex items-center gap-2 text-white">
                            <HiOutlineClock />
                            {selectedTime || 'Select a time'}
                        </li>
                    </ul>
                    <p className='text-gray-200 opacity-50 mt-48 text-sm'>All the times are according to your device's local time.</p>
                </div>
                <div className='overflow-auto hide-scrollbar rounded-lg'>
                    <button className="absolute top-0 right-0 w-8 h-8 leading-8 flex items-center justify-center" onClick={() => setShowBookingModal(false)}><HiXMark /></button>
                    <BookingCalendar selectedDate={selectedDate} handleDateSelect={handleDateSelect} today={today} twoDaysFromNow={twoDaysFromNow} availableTimes={availableTimes} handleTimeSelect={handleTimeSelect} selectedTime={selectedTime} />
                </div>

            </div>
        </div>


    );
};

export default BookingPopup;