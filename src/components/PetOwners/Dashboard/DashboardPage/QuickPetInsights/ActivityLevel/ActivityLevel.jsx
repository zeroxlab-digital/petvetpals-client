import { PawPrint } from 'lucide-react';
import React from 'react';

const ActivityLevel = ({ activityLevel }) => {
    
    let latestActivityLevel = null;
    if (activityLevel.length > 0) {
        latestActivityLevel = activityLevel.reduce((latest, current) => {
            return new Date(current.date) > new Date(latest.date) ? current : latest
        }).value || 0;
    }
    const getActivityMessage = (value) => {
        if (value >= 80) return "High activity – very active!";
        if (value >= 50) return "Normal – consistent with breed standard.";
        if (value >= 30) return "Slightly low – monitor activity.";
        return "Low activity – may need attention.";
    }
    const activityMessage = getActivityMessage(latestActivityLevel || 0);

    return (
        <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-2">
                <h3 className="text-sm font-medium text-gray-600">Activity Level</h3>
                <PawPrint className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold">{latestActivityLevel || 0}%</div>
            <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${latestActivityLevel || 0}%` }}
                ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{activityMessage}</p>
        </div>
    );
};

export default ActivityLevel;