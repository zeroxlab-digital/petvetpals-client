import React, { useState } from 'react';
import Button from '@/components/Common/Button/Button';
import { HiPlus } from 'react-icons/hi2';

const Medications = ({ }) => {
    const medications = [
        {
            id: 1,
            name: "Heartworm Prevention",
            dosage: "1 tablet",
            frequency: "Monthly",
            nextDue: "2024-03-15",
            instructions: "Give with food",
            remainingDoses: 5,
        },
        {
            id: 2,
            name: "Joint Supplement",
            dosage: "2 tablets",
            frequency: "Daily",
            nextDue: "2024-02-28",
            instructions: "Morning and evening with meals",
            remainingDoses: 14,
        },
        {
            id: 3,
            name: "Flea & Tick",
            dosage: "1 application",
            frequency: "Monthly",
            nextDue: "2024-03-10",
            instructions: "Apply to back of neck",
            remainingDoses: 2,
        },
    ]
    const [activeMedicationsTab, setActiveMedicationsTab] = useState("current-medications");
    return (

        <div className='space-y-5'>
            <div className='flex items-center justify-between'>
                <h2 className='font-semibold text-lg'>Medications & Treatment</h2>
                <div>
                    <Button variant={'primaryOutline'} classNames={'text-sm'}><HiPlus className='text-lg' /> Add Medication</Button>
                </div>
            </div>
            <div className='health-records-tabs flex space-x-5 overflow-x-auto border-b'>
                <button
                    onClick={() => setActiveMedicationsTab("current-medications")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeMedicationsTab === "current-medications"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Current Medications
                </button>
                <button
                    onClick={() => setActiveMedicationsTab("medication-history")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeMedicationsTab === "medication-history"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Medication History
                </button>
                <button
                    onClick={() => setActiveMedicationsTab("medication-schedule")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeMedicationsTab === "medication-schedule"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Medication Schedule
                </button>
                <button
                    onClick={() => setActiveMedicationsTab("reminders")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeMedicationsTab === "reminders"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Reminders
                </button>
            </div>
            {activeMedicationsTab === "current-medications" && (
                <div>Current Medications</div>
            )}
            {activeMedicationsTab === "medication-history" && (
                <div>Medication History</div>
            )}
            {activeMedicationsTab === "medication-schedule" && (
                <div>Medication Schedule</div>
            )}
            {activeMedicationsTab === "reminders" && (
                <div>Reminders</div>
            )}
        </div>
    );
};

export default Medications;