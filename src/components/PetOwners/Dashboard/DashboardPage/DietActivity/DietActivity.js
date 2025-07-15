import React, { useState } from 'react';
import Button from '@/components/Common/Button/Button';
import { HiPlus, HiTrash } from 'react-icons/hi2';

const DietActivity = () => {
    const [activeDietTab, setActiveDietTab] = useState("diet-tracking");

    // Diet entries state
    const [dietEntries, setDietEntries] = useState([
        // example
        { id: 1, meal: "Breakfast - Eggs", calories: 300, date: "2025-07-14", notes: "2 eggs and toast" },
    ]);
    // Activity entries state
    const [activityEntries, setActivityEntries] = useState([
        { id: 1, activity: "Walk", duration: 30, date: "2025-07-14", notes: "Morning walk in park" },
    ]);
    // Weight history state
    const [weightEntries, setWeightEntries] = useState([
        { id: 1, date: "2025-07-01", weight: 70 },
        { id: 2, date: "2025-07-14", weight: 69.5 },
    ]);

    // Form state and visibility
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [formType, setFormType] = useState(""); // "diet" | "activity" | "weight"

    const openForm = (type) => {
        setFormType(type);
        setFormData({});
        setFormOpen(true);
    };

    const closeForm = () => setFormOpen(false);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Submit form based on type
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formType === "diet") {
            const newEntry = { id: Date.now(), ...formData };
            newEntry.calories = Number(newEntry.calories) || 0;
            setDietEntries(prev => [newEntry, ...prev]);
        } else if (formType === "activity") {
            const newEntry = { id: Date.now(), ...formData };
            newEntry.duration = Number(newEntry.duration) || 0;
            setActivityEntries(prev => [newEntry, ...prev]);
        } else if (formType === "weight") {
            const newEntry = { id: Date.now(), ...formData };
            newEntry.weight = Number(newEntry.weight) || 0;
            setWeightEntries(prev => [newEntry, ...prev]);
        }
        closeForm();
    };

    // Delete handlers
    const deleteDiet = (id) => setDietEntries(prev => prev.filter(e => e.id !== id));
    const deleteActivity = (id) => setActivityEntries(prev => prev.filter(e => e.id !== id));
    const deleteWeight = (id) => setWeightEntries(prev => prev.filter(e => e.id !== id));
    return <div>Coming soon...</div>
    return (
        <div className='space-y-5'>
            <div className='flex items-center justify-between'>
                <h2 className='font-semibold text-lg'>Diet & Activity</h2>
                <div>
                    <Button onClick={() => openForm(activeDietTab)} variant={'primaryOutline'} classNames={'text-sm'}>
                        <HiPlus className='text-lg' /> Log Entry
                    </Button>
                </div>
            </div>

            <div className='health-records-tabs flex space-x-5 overflow-x-auto border-b'>
                <button
                    onClick={() => setActiveDietTab("diet-tracking")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeDietTab === "diet-tracking"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Diet Tracking
                </button>
                <button
                    onClick={() => setActiveDietTab("activity-tracking")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeDietTab === "activity-tracking"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Activity Tracking
                </button>
                <button
                    onClick={() => setActiveDietTab("weight-history")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeDietTab === "weight-history"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Weight History
                </button>
            </div>

            {/* --- Diet Tracking Tab --- */}
            {activeDietTab === "diet-tracking" && (
                <div>
                    {dietEntries.length === 0 ? (
                        <p className="text-gray-500 mt-4">No diet entries logged yet.</p>
                    ) : (
                        <ul className="divide-y border rounded-md mt-4">
                            {dietEntries.map(entry => (
                                <li key={entry.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                    <div>
                                        <p className="font-semibold">{entry.meal}</p>
                                        <p className="text-sm text-gray-600">{entry.date} — {entry.calories} kcal</p>
                                        {entry.notes && <p className="text-sm italic text-gray-500">{entry.notes}</p>}
                                    </div>
                                    <button onClick={() => deleteDiet(entry.id)} className="text-red-500 hover:text-red-700">
                                        <HiTrash className="text-xl" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* --- Activity Tracking Tab --- */}
            {activeDietTab === "activity-tracking" && (
                <div>
                    {activityEntries.length === 0 ? (
                        <p className="text-gray-500 mt-4">No activity entries logged yet.</p>
                    ) : (
                        <ul className="divide-y border rounded-md mt-4">
                            {activityEntries.map(entry => (
                                <li key={entry.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                    <div>
                                        <p className="font-semibold">{entry.activity}</p>
                                        <p className="text-sm text-gray-600">{entry.date} — {entry.duration} min</p>
                                        {entry.notes && <p className="text-sm italic text-gray-500">{entry.notes}</p>}
                                    </div>
                                    <button onClick={() => deleteActivity(entry.id)} className="text-red-500 hover:text-red-700">
                                        <HiTrash className="text-xl" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* --- Weight History Tab --- */}
            {activeDietTab === "weight-history" && (
                <div>
                    {weightEntries.length === 0 ? (
                        <p className="text-gray-500 mt-4">No weight entries logged yet.</p>
                    ) : (
                        <ul className="divide-y border rounded-md mt-4">
                            {weightEntries
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .map(entry => (
                                    <li key={entry.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                        <div>
                                            <p className="font-semibold">{entry.weight} kg</p>
                                            <p className="text-sm text-gray-600">{entry.date}</p>
                                        </div>
                                        <button onClick={() => deleteWeight(entry.id)} className="text-red-500 hover:text-red-700">
                                            <HiTrash className="text-xl" />
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
            )}

            {/* --- Form Modal --- */}
            {formOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">
                            {formType === "diet" && "Log Diet Entry"}
                            {formType === "activity" && "Log Activity Entry"}
                            {formType === "weight" && "Log Weight Entry"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {formType === "diet" && (
                                <>
                                    <input
                                        type="text"
                                        name="meal"
                                        placeholder="Meal Name (e.g. Breakfast - Eggs)"
                                        value={formData.meal || ''}
                                        onChange={handleChange}
                                        required
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                    <input
                                        type="number"
                                        name="calories"
                                        placeholder="Calories (kcal)"
                                        value={formData.calories || ''}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded"
                                        min="0"
                                    />
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date || ''}
                                        onChange={handleChange}
                                        required
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                    <textarea
                                        name="notes"
                                        placeholder="Notes (optional)"
                                        value={formData.notes || ''}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                </>
                            )}

                            {formType === "activity" && (
                                <>
                                    <input
                                        type="text"
                                        name="activity"
                                        placeholder="Activity Type (e.g. Walk, Run)"
                                        value={formData.activity || ''}
                                        onChange={handleChange}
                                        required
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                    <input
                                        type="number"
                                        name="duration"
                                        placeholder="Duration (minutes)"
                                        value={formData.duration || ''}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded"
                                        min="0"
                                        required
                                    />
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date || ''}
                                        onChange={handleChange}
                                        required
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                    <textarea
                                        name="notes"
                                        placeholder="Notes (optional)"
                                        value={formData.notes || ''}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                </>
                            )}

                            {formType === "weight" && (
                                <>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date || ''}
                                        onChange={handleChange}
                                        required
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                    <input
                                        type="number"
                                        step="0.1"
                                        name="weight"
                                        placeholder="Weight (kg)"
                                        value={formData.weight || ''}
                                        onChange={handleChange}
                                        required
                                        className="w-full border px-3 py-2 rounded"
                                        min="0"
                                    />
                                </>
                            )}

                            <div className="flex justify-end space-x-3 pt-4">
                                <button type="button" onClick={closeForm} className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DietActivity;