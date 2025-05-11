import React, { useState } from 'react';
import Button from '@/components/Common/Button/Button';
import { HiPlus } from 'react-icons/hi2';

const HealthRecords = ({ }) => {
    const vaccinations = [
        {
            id: 1,
            name: "Rabies",
            lastDate: "2023-08-15",
            nextDue: "2024-08-15",
            status: "Up to date",
            provider: "Dr. Smith",
        },
        {
            id: 2,
            name: "DHPP",
            lastDate: "2023-06-10",
            nextDue: "2024-06-10",
            status: "Up to date",
            provider: "Dr. Johnson",
        },
        {
            id: 3,
            name: "Bordetella",
            lastDate: "2023-11-20",
            nextDue: "2024-03-15",
            status: "Due soon",
            provider: "Dr. Williams",
        },
        {
            id: 4,
            name: "Leptospirosis",
            lastDate: "2023-05-05",
            nextDue: "2024-05-05",
            status: "Up to date",
            provider: "Dr. Smith",
        },
    ]
    const [activeHealthRecordsTab, setActiveHealthRecordTab] = useState("medical-records");
    return (
        <div className='space-y-5'>
            <div className='flex items-center justify-between'>
                <h2 className='font-semibold text-lg'>Health Records</h2>
                <div>
                    <Button variant={'primary'} ><HiPlus /> Add Record</Button>
                </div>
            </div>
            <div className='health-records-tabs flex space-x-5 overflow-x-auto border-b'>
                <button
                    onClick={() => setActiveHealthRecordTab("medical-records")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeHealthRecordsTab === "medical-records"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Medical Records
                </button>
                <button
                    onClick={() => setActiveHealthRecordTab("vaccinations")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeHealthRecordsTab === "vaccinations"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Vaccinations
                </button>
                <button
                    onClick={() => setActiveHealthRecordTab("vital-history")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeHealthRecordsTab === "vital-history"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Vital History
                </button>
                <button
                    onClick={() => setActiveHealthRecordTab("allergies-conditions")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeHealthRecordsTab === "allergies-conditions"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Allergies Conditions
                </button>
            </div>
            {activeHealthRecordsTab === "medical-records" && (
                <div>Medical Records</div>
            )}
            {activeHealthRecordsTab === "vaccinations" && (
                <div>Vaccinations</div>
            )}
            {activeHealthRecordsTab === "vital-history" && (
                <div>Vital History</div>
            )}
            {activeHealthRecordsTab === "allergies-conditions" && (
                <div>Allergies & Conditions</div>
            )}
        </div>

    );
};

export default HealthRecords;