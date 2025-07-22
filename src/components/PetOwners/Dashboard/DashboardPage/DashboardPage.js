"use client";
import { useGetPetsQuery } from '@/redux/services/petApi';
import React, { useEffect, useState } from 'react';
import InitialDashboard from './InitialDashboard';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import Image from 'next/image';
import { Calendar, ChevronDown, ChevronUp, MessageSquare, Syringe, Check, Heart, PawPrint, PillIcon as Pills, Plus, Thermometer, Weight, Zap, Filter, MoreHorizontal, Activity, AlertCircle } from 'lucide-react';
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useRouter } from 'next/navigation';
import HealthRecords from './HealthRecords/HealthRecords';
import Medications from './Medications/Medications';
import DietActivity from './DietActivity/DietActivity';

// Sample data for charts and displays
const healthData = [
    { name: "Week 1", weight: 32.5, activity: 75, heartRate: 72, temperature: 38.2 },
    { name: "Week 2", weight: 32.8, activity: 82, heartRate: 74, temperature: 38.3 },
    { name: "Week 3", weight: 32.6, activity: 78, heartRate: 71, temperature: 38.1 },
    { name: "Week 4", weight: 32.5, activity: 85, heartRate: 73, temperature: 38.2 },
    { name: "Week 5", weight: 32.4, activity: 88, heartRate: 72, temperature: 38.0 },
    { name: "Week 6", weight: 32.5, activity: 85, heartRate: 70, temperature: 38.1 },
]

const medicalRecords = [
    {
        id: 1,
        date: "2024-02-15",
        type: "Check-up",
        doctor: "Dr. Smith",
        clinic: "Happy Paws Veterinary",
        diagnosis: "Healthy",
        treatment: "None required",
        notes: "Regular health check - All normal",
        files: ["health_report_feb2024.pdf"],
    },
    {
        id: 2,
        date: "2024-02-01",
        type: "Vaccination",
        doctor: "Dr. Johnson",
        clinic: "Pet Care Center",
        diagnosis: "N/A",
        treatment: "Annual boosters",
        notes: "Annual boosters completed",
        files: ["vaccination_record_feb2024.pdf"],
    },
    {
        id: 3,
        date: "2024-01-20",
        type: "Dental",
        doctor: "Dr. Williams",
        clinic: "Happy Paws Veterinary",
        diagnosis: "Mild tartar buildup",
        treatment: "Dental cleaning",
        notes: "Teeth cleaning and check",
        files: ["dental_report_jan2024.pdf", "dental_xrays_jan2024.zip"],
    },
    {
        id: 4,
        date: "2023-12-05",
        type: "Illness",
        doctor: "Dr. Smith",
        clinic: "Happy Paws Veterinary",
        diagnosis: "Mild digestive upset",
        treatment: "Prescription diet for 7 days",
        notes: "Likely caused by dietary indiscretion",
        files: ["treatment_plan_dec2023.pdf"],
    },
]

const notifications = [
    {
        id: 1,
        type: "medication",
        icon: <Pills className="h-5 w-5 text-blue-500" />,
        title: "Medication Reminder",
        message: "Time for evening medication",
        time: "10 minutes ago",
    },
    {
        id: 2,
        type: "message",
        icon: <MessageSquare className="h-5 w-5 text-green-500" />,
        title: "Message from Dr. Smith",
        message: "Max is doing great! Keep up with the current routine...",
        time: "2 hours ago",
    },
    {
        id: 3,
        type: "health",
        icon: <Activity className="h-5 w-5 text-purple-500" />,
        title: "Weight Updated",
        message: "New weight recorded: 32.5 kg",
        time: "Yesterday",
    },
    {
        id: 4,
        type: "appointment",
        icon: <Calendar className="h-5 w-5 text-orange-500" />,
        title: "Appointment Reminder",
        message: "Check-up with Dr. Smith tomorrow at 10:00 AM",
        time: "Yesterday",
    },
    {
        id: 5,
        type: "alert",
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        title: "Vaccination Due Soon",
        message: "Bordetella vaccination due in 15 days",
        time: "2 days ago",
    },
]

const DashboardPage = () => {
    const { data: { pets } = {}, isLoading, error } = useGetPetsQuery();
    const [selectedPet, setSelectedPet] = useState({})
    const [showPetMenu, setShowPetMenu] = useState(false)
    const router = useRouter();
    const [mounted, setMounted] = useState(false)
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        setMounted(true)
    }, [])
    useEffect(() => {
        if (pets?.length > 0) {
            setSelectedPet(pets[0])
        }
    }, [pets])

    if (isLoading) {
        return (
            <PetSpinner />
        )
    }

    if (pets?.length < 1) {
        return <InitialDashboard />
    }

    return (
        <div className='min-h-screen'>
            {/* Pet Selector and Actions */}
            <div className="flex flex-col gap-4 max-md:gap-6 md:flex-row md:items-center md:justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16">
                        <Image
                            src={selectedPet.image || "/images/paw-heart.webp"}
                            alt="Pet avatar"
                            width={64}
                            height={64}
                            priority
                            unoptimized
                            className="rounded-full w-full h-full object-cover border-2 border-white shadow-sm"
                        />
                        <span className="absolute -bottom-1 right-0 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
                            Active
                        </span>
                    </div>
                    <div>
                        <div className="relative mb-1">
                            <button
                                onClick={() => setShowPetMenu(!showPetMenu)}
                                className="flex items-center gap-1 text-lg font-semibold rounded-lg transition-colors"
                            >
                                {selectedPet.name} <span className="text-gray-500 text-base font-normal">({selectedPet.breed})</span>
                                {showPetMenu ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </button>
                            {showPetMenu && (
                                <div className="absolute top-full left-0 mt-1 w-[15rem] bg-white rounded-lg shadow-lg border p-1 z-10 max-h-60 overflow-auto ">
                                    {pets.map((pet) => (
                                        <button
                                            key={pet._id}
                                            onClick={() => {
                                                setSelectedPet(pet), setShowPetMenu(false)
                                            }}
                                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                                        >
                                            <span>{pet.name}</span> <span className="text-sm">({pet.breed})</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <p className="text-sm text-gray-500">
                            {selectedPet.age} years old • {selectedPet.gender} • {selectedPet.weight} kg
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => router.push("/appointments")}
                        className="flex items-center bg-primary hover:bg-primaryHover duration-200 text-white px-4 max-sm:px-2 py-2 rounded-lg transition-colors"
                    >
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Appointment
                    </button>
                    <button onClick={() => router.push("/dashboard/messages")} className="flex items-center border border-gray-300 px-4 max-sm:px-2 py-2 rounded-lg hover:bg-gray-100 duration-200 transition-colors">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat with Vet
                    </button>
                </div>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex space-x-6 overflow-x-auto mb-7 border-b">
                <button
                    onClick={() => setActiveTab("overview")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === "overview"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab("health")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === "health"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Health Records
                </button>
                <button
                    onClick={() => setActiveTab("medications")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === "medications"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Medications
                </button>
                <button
                    onClick={() => setActiveTab("diet")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === "diet"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Diet & Activity
                </button>
            </div>

            {/* OverView Tab */}
            {activeTab === "overview" && (
                <div className="space-y-5">
                    {/* Health Overview Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between pb-2">
                                <h3 className="text-sm font-medium text-gray-600">Overall Health</h3>
                                <Activity className="h-4 w-4 text-gray-500" />
                            </div>
                            <div className="text-2xl font-bold text-green-500">Excellent</div>
                            <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-green-500 transition-all duration-500"
                                    style={{ width: "92%" }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Last check-up: 2 weeks ago</p>
                        </div>

                        <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between pb-2">
                                <h3 className="text-sm font-medium text-gray-600">Weight Tracking</h3>
                                <Weight className="h-4 w-4 text-gray-500" />
                            </div>
                            <div className="text-2xl font-bold">32.5 kg</div>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-500 border border-green-200 flex items-center">
                                    <Check className="h-3 w-3 mr-1" />
                                    Healthy range
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Target: 30-34 kg</p>
                        </div>

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

                        <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between pb-2">
                                <h3 className="text-sm font-medium text-gray-600">Next Vaccination</h3>
                                <Syringe className="h-4 w-4 text-gray-500" />
                            </div>
                            <div className="text-2xl font-bold">15</div>
                            <p className="text-xs text-gray-500 mt-2">Days until Bordetella shot</p>
                            <button className="text-xs text-blue-500 mt-1 hover:underline">View vaccination schedule</button>
                        </div>
                    </div>

                    {/* Additional Health Metrics */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between pb-2">
                                <h3 className="text-sm font-medium text-gray-600">Symptom Checker</h3>
                                <Heart className="h-4 w-4 text-red-500" />
                            </div>
                            <div className="text-2xl font-bold">
                                No Issues
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Last check: 3 days ago</p>
                        </div>

                        <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between pb-2">
                                <h3 className="text-sm font-medium text-gray-600">Behavior Score</h3>
                                <Thermometer className="h-4 w-4 text-green-500" />
                            </div>
                            <div className="text-2xl font-bold">
                                Good
                            </div>
                            <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-green-500 transition-all duration-500"
                                    style={{ width: "90%" }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Based on recent observations</p>
                        </div>

                        <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between pb-2">
                                <h3 className="text-sm font-medium text-gray-600">Energy Level</h3>
                                <Zap className="h-4 w-4 text-yellow-500" />
                            </div>
                            <div className="text-2xl font-bold">High</div>
                            <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-yellow-500 transition-all duration-500"
                                    style={{ width: "90%" }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Consistent with breed standard</p>
                        </div>
                    </div>

                    {/* Health Trends and Upcoming */}
                    <div className="grid gap-4 md:grid-cols-7">
                        <div className="bg-white rounded-xl border shadow-sm md:col-span-4">
                            <div className="p-4 border-b">
                                <h3 className="text-lg font-semibold">Health Trends</h3>
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
                                                stroke="#8884d8"
                                                strokeWidth={2}
                                                name="Weight (kg)"
                                                activeDot={{ r: 8 }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="activity"
                                                stroke="#82ca9d"
                                                strokeWidth={2}
                                                name="Activity Level (%)"
                                                activeDot={{ r: 8 }}
                                            />
                                        </RechartsLineChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                            <div className="p-4 border-t">
                                <div className="flex gap-4 text-sm">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-[#8884d8] mr-1"></div>
                                        <span>Weight</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-[#82ca9d] mr-1"></div>
                                        <span>Activity</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border shadow-sm md:col-span-3">
                            <div className="p-4 border-b">
                                <h3 className="text-lg font-semibold">Upcoming</h3>
                                <p className="text-sm text-gray-500">Next appointments and reminders</p>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                                    <Calendar className="h-8 w-8 text-blue-500" />
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium">Regular Check-up</p>
                                        <p className="text-xs text-gray-500">Tomorrow at 10:00 AM</p>
                                        <p className="text-xs text-gray-500">with Dr. Smith</p>
                                    </div>
                                    <button className="border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                                        Reschedule
                                    </button>
                                </div>
                                <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                                    <Pills className="h-8 w-8 text-blue-500" />
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium">Heartworm Medicine Due</p>
                                        <p className="text-xs text-gray-500">In 3 days</p>
                                    </div>
                                    <button className="border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                                        Mark Done
                                    </button>
                                </div>
                                <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                                    <Syringe className="h-8 w-8 text-blue-500" />
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium">Bordetella Vaccination</p>
                                        <p className="text-xs text-gray-500">In 15 days</p>
                                    </div>
                                    <button className="border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                                        Schedule
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 border-t">
                                <button className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
                                    View All Upcoming →
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 grid-cols-1 md:grid-cols-7 overflow-hidden">
                        {/* Medical History */}
                        <div className="bg-white rounded-xl border shadow-sm md:col-span-4 flex flex-col">
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">Medical History</h3>
                                <p className="text-sm text-gray-500">Recent medical records</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="text-left text-xs md:text-sm text-gray-500 border-b py-2">
                                            <th className="p-4">Date</th>
                                            <th className="p-4">Type</th>
                                            <th className="p-4">Doctor</th>
                                            <th className="p-4">Diagnosis</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {medicalRecords.slice(0, 3).map((record, index) => (
                                            <tr key={record.id} className="border-b last:border-none hover:bg-gray-50 ">
                                                <td className="p-4 text-sm">{record.date}</td>
                                                <td className="p-4 text-sm">{record.type}</td>
                                                <td className="p-4 text-sm">{record.doctor}</td>
                                                <td className="p-4 text-sm">{record.diagnosis}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t mt-auto">
                                <button className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
                                    View Complete History →
                                </button>
                            </div>
                        </div>

                        {/* Recent Updates */}
                        <div className="bg-white rounded-xl border shadow-sm md:col-span-3">
                            <div className="p-4 border-b">
                                <h3 className="text-lg font-semibold">Recent Updates</h3>
                                <p className="text-sm text-gray-500">Latest activities and notifications</p>
                            </div>
                            <div className="p-0">
                                <div className="space-y-1">
                                    {notifications.slice(0, 3).map((notification) => (
                                        <div
                                            key={notification.id}
                                            className="flex gap-4 items-start p-4 hover:bg-gray-50 transition-colors border-b last:border-0"
                                        >
                                            <div className="mt-0.5">{notification.icon}</div>
                                            <div>
                                                <p className="text-sm font-medium">{notification.title}</p>
                                                <p className="text-sm text-gray-600">{notification.message}</p>
                                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 border-t ">
                                <button className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
                                    View All Updates →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === "health" && (
                <HealthRecords petId={selectedPet?._id} />
            )}
            {activeTab === "medications" && (
                <Medications petId={selectedPet?._id} />
            )}
            {activeTab === "diet" && (
                <DietActivity />
            )}
        </div>
    );
};

export default DashboardPage;