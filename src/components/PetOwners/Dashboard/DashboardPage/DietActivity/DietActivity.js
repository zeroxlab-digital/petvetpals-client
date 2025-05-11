import React, { useState } from 'react';
import Button from '@/components/Common/Button/Button';
import { HiPlus } from 'react-icons/hi2';

const DietActivity = () => {
    const foodIntakeData = [
        { name: "Mon", amount: 350 },
        { name: "Tue", amount: 320 },
        { name: "Wed", amount: 340 },
        { name: "Thu", amount: 360 },
        { name: "Fri", amount: 330 },
        { name: "Sat", amount: 350 },
        { name: "Sun", amount: 340 },
    ]
    const [activeDietTab, setActiveDietTab] = useState("diet-tracking");
    return (
        <div className='space-y-5'>
            <div className='flex items-center justify-between'>
                <h2 className='font-semibold text-lg'>Diet & Activity</h2>
                <div>
                    <Button variant={'primary'}><HiPlus /> Log Entry</Button>
                </div>
            </div>

            <div className='health-records-tabs flex space-x-5 overflow-x-auto border-b'>
                <button
                    onClick={() => setActiveDietTab("diet-tracking")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeDietTab === "diet-tracking"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Diet Tracking
                </button>
                <button
                    onClick={() => setActiveDietTab("activity-tracking")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeDietTab === "activity-tracking"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Activity Tracking
                </button>
                <button
                    onClick={() => setActiveDietTab("weight-history")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeDietTab === "weight-history"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Weight History
                </button>
            </div>

            {activeDietTab === "diet-tracking" && (
                <div>Diet Tracking</div>
            )}
            {activeDietTab === "activity-tracking" && (
                <div>Activity Tracking</div>
            )}
            {activeDietTab === "weight-history" && (
                <div>Weight History</div>
            )}
        </div>
    );
};

export default DietActivity;
