import React from 'react';
import { DayPicker } from 'react-day-picker';
import './Booking.css'

const BookingCalendar = ({ selectedDate, handleDateSelect, today, twoDaysFromNow, availableTimes, handleTimeSelect, selectedTime }) => {

    return (
        <div className="calendar bg-white ">
            <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={[
                    { before: today },
                    { after: twoDaysFromNow },
                    { dayOfWeek: [0, 6] }
                ]}
                className="rdp-custom text-center"
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
        </div>
    );
};

export default BookingCalendar;