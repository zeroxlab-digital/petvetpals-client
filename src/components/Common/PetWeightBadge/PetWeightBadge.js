import { getWeightBadge } from '@/utils/getWeightBadge';
import { Check, AlertTriangle, AlertOctagon } from 'lucide-react';
import React from 'react';

const PetWeightBadge = ({ pet }) => {
    const badge = getWeightBadge(pet);

    // Chosing icon based on badge.label
    const getIcon = () => {
        switch (badge.label) {
            case 'Healthy':
                return <Check className="h-3 w-3" />;
            case 'Underweight':
                return <AlertTriangle className="h-3 w-3" />;
            case 'Overweight':
                return <AlertOctagon className="h-3 w-3" />;
            default:
                return null;
        }
    };

    return (
        <span
            className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 border
                text-${badge.color}-500 border-${badge.color}-300
                bg-${badge.color}-500 bg-opacity-10`}
        >
            {getIcon()}
            {badge.label || 'N/A'}
            {badge.idealRange ? ` — Ideal: ${badge.idealRange}` : ''}
        </span>
    );
};

export default PetWeightBadge;