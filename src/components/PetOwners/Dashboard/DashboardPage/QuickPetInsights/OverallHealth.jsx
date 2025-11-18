import { Activity } from 'lucide-react';
import React from 'react';

const OverallHealth = ({ petData }) => {
    const healthStatus = () => {
        const health_score = petData?.overall_health;
        switch (true) {
            case health_score < 30:
                return "Unhealthy"
            case health_score < 50:
                return "Moderate"
            case health_score < 80:
                return "Healthy"
            case health_score < 100:
                return "Excellent"
            default:
                return "Unknown"
        }
    }
    console.log(healthStatus())
    return (
        <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-2">
                <h3 className="text-sm font-medium text-gray-600">Overall Health</h3>
                <Activity className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-500">
                {healthStatus()}
            </div>
            <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                    className="h-full rounded-full bg-green-500 transition-all duration-500"
                    style={{ width: `${petData?.overall_health}%` }}
                ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Based on recent observation</p>
        </div>
    );
};

export default OverallHealth;