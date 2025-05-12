import React, { useState } from 'react';
import Button from '@/components/Common/Button/Button';
import { HiEllipsisHorizontal, HiPlus } from 'react-icons/hi2';

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
                <div className='border rounded-md bg-white overflow-x-auto'>
                    {/* <h3 className='font-medium text-lg mb-5'>Current Medications</h3> */}
                    <table className="w-full border-collapse p-5">
                        <thead>
                            <tr className="text-left text-xs md:text-sm text-gray-500 border-b ">
                                <th className="p-5">Medication</th>
                                <th className="p-5">Dosage</th>
                                <th className="p-5">Freequency</th>
                                <th className="p-5">Next Due</th>
                                <th className="p-5">Remaining</th>
                                <th className="p-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {medications.slice(0, 3).map((medication, index) => (
                                <tr key={index} className="border-b last:border-none hover:bg-gray-50 ">
                                    <td className="p-5 text-sm">{medication.name}</td>
                                    <td className="p-5 text-sm">{medication.dosage}</td>
                                    <td className="p-5 text-sm">{medication.frequency}</td>
                                    <td className="p-5 text-sm">{medication.nextDue}</td>
                                    <td className="p-5 text-sm">{medication.remainingDoses}</td>
                                    <td className="p-5 text-sm flex justify-end"><button><HiEllipsisHorizontal className='text-xl' /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {activeMedicationsTab === "medication-history" && (
                <div className='border rounded-md bg-white overflow-x-auto'>
                    {/* <h3 className='font-medium text-lg mb-5'>Current Medications</h3> */}
                    <table className="w-full border-collapse p-5">
                        <thead>
                            <tr className="text-left text-xs md:text-sm text-gray-500 border-b ">
                                <th className="p-5">Medication</th>
                                <th className="p-5">Dosage</th>
                                <th className="p-5">Freequency</th>
                                <th className="p-5">Start Date</th>
                                <th className="p-5">End Date</th>
                                <th className="p-5">Reason</th>
                                <th className="p-5 text-right">Prescribed By</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {medications.slice(0, 3).map((medication, index) => (
                                <tr key={index} className="border-b last:border-none hover:bg-gray-50 ">
                                    <td className="p-5 text-sm">{medication.name}</td>
                                    <td className="p-5 text-sm">{medication.dosage}</td>
                                    <td className="p-5 text-sm">{medication.frequency}</td>
                                    <td className="p-5 text-sm">{medication.startDate || "N/A"}</td>
                                    <td className="p-5 text-sm">{medication.endDate || "N/A"}</td>
                                    <td className="p-5 text-sm">{medication.reason || "N/A"}</td>
                                    <td className="p-5 text-sm flex justify-end">{medication.prescribedBy || "N/A"}</td>
                                    {/* <td className="p-5 text-sm flex justify-end"><button><HiEllipsisHorizontal className='text-xl' /></button></td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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