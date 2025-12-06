import { Heart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const RecentSymptoms = ({ symptom_history }) => {
    return (
        <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-2">
                <h3 className="text-sm font-medium text-gray-600">Recent Symptom</h3>
                <Heart className="h-4 w-4 text-red-500" />
            </div>
            <div className="text-2xl">
                {symptom_history?.length > 0
                    ? [...symptom_history]
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .slice(0, 1)
                        .map((item, i) => (
                            <div key={i}>
                                <span className="capitalize font-medium">
                                    {item.symptoms
                                        .map(symptom => symptom.bodyPart.replace(/_/g, ' '))
                                        .join(', ')}
                                </span>
                                <p className="text-xs text-gray-500 mt-2 capitalize">
                                    {item.symptoms
                                        .map(symptom =>
                                            Array.isArray(symptom.symptoms)
                                                ? symptom.symptoms
                                                    .map(s => s.replace(/_/g, ' '))
                                                    .join(', ')
                                                : symptom.symptoms.replace(/_/g, ' ')
                                        )
                                        .join(', ')}
                                </p>
                                <p className="text-xs font-normal text-gray-500 mt-2">{new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}</p>
                            </div>
                        ))
                    :
                    <div>
                        <h2>No Recent Issue</h2>
                        <p className='font-normal text-xs text-gray-500 mt-2'>Try <Link className='text-blue-600' href="/dashboard/vet-gpt">Vet GPT</Link> to get professional symptom analysis</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default RecentSymptoms;