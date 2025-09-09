import { PawPrint } from 'lucide-react';
import React from 'react';

const ActivityLevel = () => {
    return (
        <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-2">
                <h3 className="text-sm font-medium text-gray-600">Activity Level</h3>
                <PawPrint className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold">85%</div>
            <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-500"
                    style={{ width: "85%" }}
                ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Above average for breed</p>
        </div>
    );
};

export default ActivityLevel;