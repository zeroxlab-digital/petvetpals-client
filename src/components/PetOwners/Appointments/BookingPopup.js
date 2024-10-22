import React, { useState } from 'react';
import { HiCalendar, HiOutlineClock, HiXMark } from "react-icons/hi2";
import { DayPicker } from 'react-day-picker';
import { format, addDays } from 'date-fns';
import './Booking.css'
import Button from '@/components/Common/Button/Button';

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
                    <div className="calendar bg-white px-4 mt-4">
                        <DayPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            disabled={[
                                { before: today },
                                { after: twoDaysFromNow },
                                { dayOfWeek: [0, 6] }
                            ]}
                            className="rdp-custom text-center" // center-aligns the calendar
                        />
                        {selectedDate && (
                            <div className="">
                                <div className="grid grid-cols-3 gap-4">
                                    {availableTimes.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => handleTimeSelect(time)}
                                            className={`py-2 px-4 transition duration-300 text-sm font-medium ${selectedTime === time
                                                ? 'bg-primary text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <Button variant={"primary"} classNames={`w-full mt-5 ${selectedTime ? '' : 'opacity-50 cursor-not-allowed'}`} disabled={!selectedTime}>Continue</Button>
                        <button className=''></button>
                    </div>
                </div>

            </div>
        </div>


    );
};

export default BookingPopup;