import React, { useEffect, useState } from 'react';
import { HiCalendar, HiOutlineClock, HiXMark } from "react-icons/hi2";
import { format, addDays } from 'date-fns';
import BookingCalendar from './BookingCalendar';
import Button from '@/components/Common/Button/Button';
import { toast } from 'react-toastify';
import { useBookAppointmentMutation, useUpdateAppointmentMutation } from '@/redux/services/appointmentApi';
import { usePathname } from 'next/navigation';

const BookingPopup = ({ appointment = () => { }, setShowModal = () => { }, setApptReschedule = () => { }, foundVet }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const today = new Date();
    const twoDaysFromNow = addDays(today, 5);

    const availableTimes = [
        '12:30 PM', '1:00 PM', '5:00 PM', '5:30 PM', '6:00 PM', '7:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '11:30 PM'
    ];

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleTimeSelect = (time) => {
        const [hours, minutesPart] = time.split(':');
        const minutes = parseInt(minutesPart.slice(0, 2));
        const period = minutesPart.slice(-2);

        let hours24 = parseInt(hours);
        if (period === 'PM' && hours24 !== 12) {
            hours24 += 12;
        } else if (period === 'AM' && hours24 === 12) {
            hours24 = 0;
        }

        const newDateWithTime = new Date(selectedDate);
        newDateWithTime.setHours(hours24, minutes, 0);

        setSelectedDate(newDateWithTime);
        setSelectedTime(time);
    };
    const notify = (message, type) => {
        toast(message, { type, autoClose: 1000 })
    }

    const pathname = usePathname();
    const [bookAppointment] = useBookAppointmentMutation();
    const [updateAppointment] = useUpdateAppointmentMutation();
    const handleBookingConfirm = async () => {
        try {
            if (pathname.startsWith('/dashboard')) {
                const response = await updateAppointment({ id: appointment._id, date: selectedDate.toISOString(), status: 'pending' }).unwrap();
                notify("Appointment rescheduled!", "success");
            } else if (pathname.startsWith('/appointments')) {
                const response = await bookAppointment({ id: foundVet?._id, date: selectedDate.toISOString() }).unwrap();
                notify("Appointment booked!", "success");
            }
            setShowModal(false);
            setApptReschedule(false);
        } catch (error) {
            console.log(error);
            notify("error");
        }
    }

    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-[90%] max-w-[50rem] h-[80%] lg:h-[30rem] bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-[3fr_6fr] ">

                <div className="bg-primary p-4 lg:rounded-s-lg text-left">
                    <h3 className="text-white font-bold text-xl lg:text-2xl mb-4">{pathname.startsWith('/dashboard') ? 'Reschedule' : 'Book'} Your Appointment</h3>
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

                <div className="relative overflow-auto hide-scrollbar bg-white">
                    <div className="px-4 py-4 mt-5">
                        <BookingCalendar
                            selectedDate={selectedDate}
                            handleDateSelect={handleDateSelect}
                            today={today}
                            twoDaysFromNow={twoDaysFromNow}
                            availableTimes={availableTimes}
                            handleTimeSelect={handleTimeSelect}
                            selectedTime={selectedTime}
                        />
                        <div >
                            <Button onClick={handleBookingConfirm} variant={"primary"} classNames={`w-full mt-5 ${selectedTime ? '' : 'opacity-50 cursor-not-allowed'}`} disabled={!selectedTime}>Continue</Button>
                        </div>
                    </div>
                </div>

                <button
                    className="absolute sm:top-2 right-2 max-sm:right-0 w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 duration-200 text-gray-700 hover:text-gray-800 rounded-full"
                    onClick={() => setShowModal(false) || setApptReschedule(false)}
                >
                    <HiXMark size={20} />
                </button>
            </div>
        </div>
    );
};

export default BookingPopup;
