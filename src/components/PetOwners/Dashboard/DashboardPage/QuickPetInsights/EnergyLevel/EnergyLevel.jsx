import { Zap } from 'lucide-react';
import React from 'react';

const EnergyLevel = ({ energyLevel }) => {

    let latestEnergyLevel = null;
    if (energyLevel.length > 0) {
        latestEnergyLevel = energyLevel.reduce((latest, current) => {
            return new Date(current.date) - new Date(latest.date) ? current : latest;
        }).value || 0;
    }

    const getEnergyMessage = (value) => {
        if (value >= 80) return "High energy – very active!";
        if (value >= 50) return "Normal – consistent with breed standard.";
        if (value >= 30) return "Slightly low – monitor activity.";
        return "Low energy – may need attention.";
    }
    const energyMessage = getEnergyMessage(latestEnergyLevel || 0);
    
    return (
        <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-2">
                <h3 className="text-sm font-medium text-gray-600">Energy Level</h3>
                <Zap className="h-4 w-4 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold">{latestEnergyLevel || 0}%</div>
            <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                    className="h-full rounded-full bg-yellow-500 transition-all duration-500"
                    style={{ width: `${latestEnergyLevel || 0}%` }}
                ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{energyMessage}</p>
        </div>
    );
};

export default EnergyLevel;