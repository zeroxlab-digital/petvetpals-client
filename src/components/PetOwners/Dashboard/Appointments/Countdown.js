import React, { useState, useEffect } from 'react';
import { HiClock, HiOutlineClock } from 'react-icons/hi2';

const Countdown = ({ date_time }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const diff = date_time - now;

            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateCountdown(); // Call initially to avoid 1s delay
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [date_time]);

    return (
        <div className='bg-gray-50 border rounded-md text-gray-900 text-base flex items-center gap-2 justify-center w-44 max-md:w-full h-12'>
            <HiOutlineClock size={20} /> In {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
        </div>
    );
};

export default Countdown;
