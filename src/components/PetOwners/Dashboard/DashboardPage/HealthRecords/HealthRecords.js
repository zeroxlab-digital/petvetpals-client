import React, { useState } from 'react';
import Button from '@/components/Common/Button/Button';
import { HiDocument, HiEllipsisHorizontal, HiOutlineDocument, HiOutlineDocumentText, HiPlus } from 'react-icons/hi2';

const HealthRecords = ({ }) => {
    const medicalRecords = [
        {
            id: 1,
            date: "2024-02-15",
            type: "Check-up",
            doctor: "Dr. Smith",
            clinic: "Happy Paws Veterinary",
            diagnosis: "Healthy",
            treatment: "None required",
            notes: "Regular health check - All normal",
            files: ["health_report_feb2024.pdf"],
        },
        {
            id: 2,
            date: "2024-02-01",
            type: "Vaccination",
            doctor: "Dr. Johnson",
            clinic: "Pet Care Center",
            diagnosis: "N/A",
            treatment: "Annual boosters",
            notes: "Annual boosters completed",
            files: ["vaccination_record_feb2024.pdf"],
        },
        {
            id: 3,
            date: "2024-01-20",
            type: "Dental",
            doctor: "Dr. Williams",
            clinic: "Happy Paws Veterinary",
            diagnosis: "Mild tartar buildup",
            treatment: "Dental cleaning",
            notes: "Teeth cleaning and check",
            files: ["dental_report_jan2024.pdf", "dental_xrays_jan2024.zip"],
        },
        {
            id: 4,
            date: "2023-12-05",
            type: "Illness",
            doctor: "Dr. Smith",
            clinic: "Happy Paws Veterinary",
            diagnosis: "Mild digestive upset",
            treatment: "Prescription diet for 7 days",
            notes: "Likely caused by dietary indiscretion",
            files: ["treatment_plan_dec2023.pdf"],
        },
    ]
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
                <div className='border p-4 rounded-md bg-white overflow-x-auto'>
                    <h3 className='font-medium text-lg mb-5'>Medical Records</h3>
                    <table className="w-full border-collapse ">
                        <thead>
                            <tr className="text-left text-xs md:text-sm text-gray-500 border-b bg-gray-50">
                                <th className="p-3">Date</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Doctor</th>
                                <th className="p-3">Diagnosis</th>
                                <th className="p-3">Treatment</th>
                                <th className="p-3">Files</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {medicalRecords.slice(0, 3).map((record, index) => (
                                <tr key={record.index} className="border-b hover:bg-gray-50 ">
                                    <td className="p-3 text-sm">{record.date}</td>
                                    <td className="p-3 text-sm">{record.type}</td>
                                    <td className="p-3 text-sm">{record.doctor}</td>
                                    <td className="p-3 text-sm">{record.diagnosis}</td>
                                    <td className="p-3 text-sm">{record.treatment}</td>
                                    <td className="p-3 text-sm">
                                        {/* {record.files.map(file => file)} */}
                                        <HiOutlineDocumentText className='text-base' />
                                    </td>
                                    <td className="p-3 text-sm flex justify-end"><button><HiEllipsisHorizontal className='text-xl' /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {activeHealthRecordsTab === "vaccinations" && (
                <div className='border p-4 rounded-md bg-white overflow-x-auto'>
                    <h3 className='font-medium text-lg mb-5'>Vaccinations</h3>
                    <table className="w-full border-collapse ">
                        <thead>
                            <tr className="text-left text-xs md:text-sm text-gray-500 border-b bg-gray-50">
                                <th className="p-3">Vaccine</th>
                                <th className="p-3">Date Given</th>
                                <th className="p-3">Next Due</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Provider</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {vaccinations.slice(0, 3).map((vaccine, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50 ">
                                    <td className="p-3 text-sm">{vaccine.name}</td>
                                    <td className="p-3 text-sm">{vaccine.lastDate}</td>
                                    <td className="p-3 text-sm">{vaccine.nextDue}</td>
                                    <td className="p-3 text-sm">{vaccine.status}</td>
                                    <td className="p-3 text-sm">{vaccine.provider}</td>
                                    <td className="p-3 text-sm flex justify-end"><button><HiEllipsisHorizontal className='text-xl' /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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