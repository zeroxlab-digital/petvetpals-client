import React from 'react';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { HiOutlineTrash } from 'react-icons/hi2';

const ScheduleAndReminders = ({ activeTab, scheduledDoses }) => {
    return (
        <div>
            {activeTab === "schedule-reminders" && (
                <div className='border rounded-md bg-white overflow-x-auto'>
                    <table className="w-full border-collapse p-5">
                        <thead>
                            <tr className="text-left text-xs md:text-sm text-gray-500 border-b ">
                                <th className="p-5">Date</th>
                                <th className="p-5">Time</th>
                                <th className="p-5">Medication</th>
                                <th className="p-5">Dosage</th>
                                <th className="p-5">Instructions</th>
                                <th className="p-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scheduledDoses.map(dose => (
                                <tr key={dose.id} className="border-b last:border-none hover:bg-gray-50">
                                    <td className="p-5 text-sm">{dose.date}</td>
                                    <td className="p-5 text-sm">{dose.timeOfDay}</td>
                                    <td className="p-5 text-sm">{dose.medicationName}</td>
                                    <td className="p-5 text-sm">{dose.dosage}</td>
                                    <td className="p-5 text-sm">{dose.instructions}</td>
                                    <td className="p-5 text-sm flex justify-end space-x-4">
                                        <button
                                            className={`px-3 py-1 text-xs rounded-full font-medium ${dose.isGiven ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                                        >
                                            {dose.isGiven ? 'Given' : 'Mark as Given'}
                                        </button>
                                        <button
                                        >
                                            <HiOutlinePencilAlt className='text-blue-500 hover:text-blue-600 text-2xl' />
                                        </button>
                                        <button
                                        >
                                            <HiOutlineTrash className='text-red-500 hover:text-red-600 text-2xl' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ScheduleAndReminders;