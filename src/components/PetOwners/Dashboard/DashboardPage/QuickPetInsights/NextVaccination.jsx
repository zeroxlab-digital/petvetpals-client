import { Syringe } from 'lucide-react';
import React from 'react';

const NextVaccination = ({ petData }) => {
    return (
        <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-2">
                <h3 className="text-sm font-medium text-gray-600">Next Vaccination</h3>
                <Syringe className="h-4 w-4 text-violet-500" />
            </div>
            {petData?.upcoming_vaccination ?
                <>
                    <div className="text-2xl font-bold">
                        {(() => {
                            const nextDueDate = new Date(petData?.upcoming_vaccination?.next_due);
                            const now = new Date();
                            const diffMs = nextDueDate - now;
                            const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
                            return <span>{daysLeft}</span>;
                        })()}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Days until {petData?.upcoming_vaccination?.vaccine} shot</p>
                    <button className="text-xs text-blue-500 mt-1 hover:underline">View vaccination schedule</button>
                </>
                :
                <div className='text-2xl font-bold'>
                    <h2>No Vaccination</h2>
                    <p className='font-normal text-xs text-gray-500 mt-2'>Add a new vaccination from health record to get started</p>
                </div>
            }
        </div>
    );
};

export default NextVaccination;