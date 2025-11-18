import { HeartPulse } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const HealthTrends = ({ healthData }) => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    return (
        <div className="bg-white rounded-xl border shadow-sm md:col-span-4">
            <div className="p-4 border-b">
                <h3 className="flex items-center text-lg font-semibold text-green-500">
                    <HeartPulse className="mr-2 h-5 w-5" />
                    Health Trends
                </h3>
                <p className="text-sm text-gray-500">Weight and activity level over time</p>
            </div>
            <div className="p-4">
                {mounted && (
                    <ResponsiveContainer width="100%" height={300}>
                        <RechartsLineChart data={healthData}>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "white",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "0.5rem",
                                    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="weight"
                                stroke="#22C55E"
                                strokeWidth={2}
                                name="Weight (lbs)"
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="activity"
                                stroke="#3B82F6"
                                strokeWidth={2}
                                name="Activity Level (%)"
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="energy"
                                stroke="#f0be1b"
                                strokeWidth={2}
                                name="Energy Level (%)"
                                activeDot={{ r: 8 }}
                            />
                        </RechartsLineChart>
                    </ResponsiveContainer>
                )}
            </div>
            <div className="p-4 border-t">
                <div className="flex gap-4 text-sm">
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#22C55E] mr-1"></div>
                        <span>Weight</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#3B82F6] mr-1"></div>
                        <span>Activity</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#f0be1b] mr-1"></div>
                        <span>Energy</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthTrends;