import React, { useState } from 'react';
import Button from '@/components/Common/Button/Button';
import { HiEllipsisHorizontal, HiOutlineDocumentText, HiOutlineTrash, HiPlus } from 'react-icons/hi2';
import { HiOutlinePencilAlt, HiPencilAlt, HiTrash } from 'react-icons/hi';

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
    const allergies = [
        { title: "Chicken", description: "Food allergy - Causes mild skin irritation" },
        { title: "Certain Grasses", description: "Environmental - Seasonal symptoms" },
    ]
    const medical_conditions = [
        { title: "Mild Hip Dysplasia", description: "Diagnosed on 2023-05-10 - Managed with supplements" }
    ]
    const [activeHealthRecordsTab, setActiveHealthRecordTab] = useState("medical-records");
    return (
        <div className='space-y-5'>
            <div className='flex items-center justify-between'>
                <h2 className='font-semibold text-lg'>Health Records</h2>
                <div>
                    {activeHealthRecordsTab === 'medical-records' ? (
                        <Button variant={'primaryOutline'} classNames={'text-sm'}>
                            <HiPlus className='text-lg' /> Add Medical Record
                        </Button>
                    )
                        :
                        activeHealthRecordsTab === 'vaccinations' && (
                            <Button variant={'primaryOutline'} classNames={'text-sm'}>
                                <HiPlus className='text-lg' /> Add Vaccination
                            </Button>
                        )}
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
                    Medical History
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
                    onClick={() => setActiveHealthRecordTab("allergies-conditions")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeHealthRecordsTab === "allergies-conditions"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Allergies & Conditions
                </button>
            </div>
            {activeHealthRecordsTab === "medical-records" && (
                <div className='border rounded-md bg-white overflow-x-auto'>
                    {/* <h3 className='font-medium text-lg mb-5'>Medical Records</h3> */}
                    <table className="w-full border-collapse p-5">
                        <thead>
                            <tr className="text-left text-xs md:text-sm text-gray-500 border-b ">
                                <th className="p-5">Date</th>
                                <th className="p-5">Type</th>
                                <th className="p-5">Doctor</th>
                                <th className="p-5">Diagnosis</th>
                                <th className="p-5">Treatment</th>
                                <th className="p-5">Files</th>
                                <th className="p-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {medicalRecords.slice(0, 3).map((record, index) => (
                                <tr key={index} className="border-b last:border-none hover:bg-gray-50 ">
                                    <td className="p-5 text-sm">{record.date}</td>
                                    <td className="p-5 text-sm">{record.type}</td>
                                    <td className="p-5 text-sm">{record.doctor}</td>
                                    <td className="p-5 text-sm">{record.diagnosis}</td>
                                    <td className="p-5 text-sm">{record.treatment}</td>
                                    <td className="p-5 text-sm">
                                        {/* {record.files.map(file => file)} */}
                                        <HiOutlineDocumentText className='text-base' />
                                    </td>
                                    <td className="p-5 text-sm flex justify-end"><button><HiEllipsisHorizontal className='text-xl' /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {activeHealthRecordsTab === "vaccinations" && (
                <div className='border rounded-md bg-white overflow-x-auto'>
                    {/* <h3 className='font-medium text-lg mb-5'>Vaccinations</h3> */}
                    <table className="w-full border-collapse ">
                        <thead>
                            <tr className="text-left text-xs md:text-sm text-gray-500 border-b">
                                <th className="p-5">Vaccine</th>
                                <th className="p-5">Date Given</th>
                                <th className="p-5">Next Due</th>
                                <th className="p-5">Status</th>
                                <th className="p-5">Provider</th>
                                <th className="p-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {vaccinations.slice(0, 3).map((vaccine, index) => (
                                <tr key={index} className="border-b last:border-none hover:bg-gray-50 ">
                                    <td className="p-5 text-sm">{vaccine.name}</td>
                                    <td className="p-5 text-sm">{vaccine.lastDate}</td>
                                    <td className="p-5 text-sm">{vaccine.nextDue}</td>
                                    <td className="p-5 text-sm">{vaccine.status}</td>
                                    <td className="p-5 text-sm">{vaccine.provider}</td>
                                    <td className="p-5 text-sm flex justify-end"><button><HiEllipsisHorizontal className='text-xl' /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {activeHealthRecordsTab === "allergies-conditions" && (
                <div className='bg-white rounded-md border p-4'>
                    <h2 className='text-xl mb-1 font-medium'>Allergies & Medical Conditions</h2>
                    <p className='text-gray-600 text-sm'>Manage your pet&apos;s allergies and ongoing conditions</p>
                    <div className='mt-8 space-y-5'>
                        <div>
                            <h4 className='font-medium mb-2'>Known Allergies</h4>
                            <ul className='space-y-3 mb-5'>
                                {allergies.map((allergy, index) => <li key={index} className='border p-3 rounded-md flex items-center justify-between'>
                                    <div>
                                        <h6 className='font-semibold text-sm'>{allergy.title}</h6>
                                        <p className='text-gray-600 text-sm'>{allergy.description}</p>
                                    </div>
                                    <div className='flex item-center gap-2 max-sm:gap-0'>
                                        <Button size={'small'}><HiOutlinePencilAlt className='text-primary text-xl' /></Button>
                                        <Button size={'small'}><HiOutlineTrash className='text-primary text-xl' /></Button>
                                    </div>
                                </li>)}
                            </ul>
                            <Button variant={'primary'} size={'small'} classNames={'text-sm border !px-3 !py-2 rounded-md font-medium'}><HiPlus className='text-lg' /> Add Allergy</Button>
                        </div>
                        <hr />
                        <div>
                            <h4 className='font-medium mb-2'>Medical Conditions</h4>
                            <ul className='space-y-3 mb-5'>
                                {medical_conditions.map((condition, index) => <li key={index} className='border p-3 rounded-md flex items-center justify-between'>
                                    <div>
                                        <h6 className='font-semibold text-sm'>{condition.title}</h6>
                                        <p className='text-gray-600 text-sm'>{condition.description}</p>
                                    </div>
                                    <div className='flex item-center gap-2 max-sm:gap-0'>
                                        <Button size={'small'}><HiOutlinePencilAlt className='text-primary text-xl' /></Button>
                                        <Button size={'small'}><HiOutlineTrash className='text-primary text-xl' /></Button>
                                    </div>
                                </li>)}
                            </ul>
                            <Button variant={'primary'} size={'small'} classNames={'text-sm border !px-3 !py-2 rounded-md font-medium'}><HiPlus className='text-lg' /> Add Condition</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HealthRecords;