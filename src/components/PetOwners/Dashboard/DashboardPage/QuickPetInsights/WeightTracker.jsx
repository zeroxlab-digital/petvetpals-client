import PetWeightBadge from '@/components/Common/PetWeightBadge/PetWeightBadge';
import { Weight } from 'lucide-react';
import React from 'react';

const WeightTracker = ({ selectedPet }) => {
    return (
        <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-2">
                <h3 className="text-sm font-medium text-gray-600">Weight Tracking</h3>
                <Weight className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">
                {
                    selectedPet?.weight?.reduce((latest, current) => {
                        return new Date(current.date) > new Date(latest.date) ? current : latest;
                    }).value || 0
                }
                (lbs)
            </div>
            <div className="flex items-center gap-1 mt-1 max-sm:mt-2">
                <PetWeightBadge pet={selectedPet} />
            </div>
            <p className="text-xs text-gray-500 mt-2">
                Last input: {
                    selectedPet?.weight?.length > 0
                        ? (() => {
                            const latestEntry = selectedPet.weight.reduce((latest, current) => {
                                return new Date(current.date) > new Date(latest.date) ? current : latest;
                            });
                            return new Date(latestEntry.date).toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric',
                                day: 'numeric',
                            });
                        })()
                        : "No weight records"
                }
            </p>
        </div>
    );
};

export default WeightTracker;