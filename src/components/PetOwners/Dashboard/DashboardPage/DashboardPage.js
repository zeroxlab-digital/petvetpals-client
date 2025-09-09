"use client";
import { useGetMedicalHistoryQuery, useGetPetDataQuery, useGetPetsQuery } from '@/redux/services/petApi';
import React, { useEffect, useState } from 'react';
import InitialDashboard from './InitialDashboard';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import Image from 'next/image';
import { Calendar, ChevronDown, ChevronUp, MessageSquare, Syringe, Check, Heart, PawPrint, PillIcon as Pills, Plus, Thermometer, Weight, Zap, Filter, MoreHorizontal, Activity, AlertCircle, CalendarClock, Stethoscope, HeartPulse } from 'lucide-react';
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useRouter } from 'next/navigation';
import HealthRecords from './HealthRecords/HealthRecords';
import Medications from './Medications/Medications';
import DietActivity from './DietActivity/DietActivity';
import { useGetSymptomHistoryQuery } from '@/redux/services/symptomApi';
import Link from 'next/link';
import PetWeightBadge from '@/components/Common/PetWeightBadge/PetWeightBadge';
import { displayValue } from '@/utils/displayValue';
import TinySpinner from '@/components/Common/Loader/TinySpinner';
import SmartReminder from './SmartReminder/SmartReminder';
import ActivityLevel from './QuickPetInsights/ActivityLevel/ActivityLevel';
import EnergyLevel from './QuickPetInsights/EnergyLevel/EnergyLevel';

// Sample data for charts and displays
// const healthData = [
//     { name: "Week 1", weight: 32.5, activity: 75, heartRate: 72, temperature: 38.2 },
//     { name: "Week 2", weight: 32.8, activity: 82, heartRate: 74, temperature: 38.3 },
//     { name: "Week 3", weight: 32.6, activity: 78, heartRate: 71, temperature: 38.1 },
//     { name: "Week 4", weight: 32.5, activity: 85, heartRate: 73, temperature: 38.2 },
//     { name: "Week 5", weight: 32.4, activity: 88, heartRate: 72, temperature: 38.0 },
//     { name: "Week 6", weight: 32.5, activity: 85, heartRate: 70, temperature: 38.1 },
// ]

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
    const [selectedPet, setSelectedPet] = useState({});
    console.log(selectedPet);
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

    const { data: petData, isLoading: petLoading } = useGetPetDataQuery({ id: selectedPet._id }, { skip: !selectedPet._id });
    console.log("pet data:", petData);
    const confirmed_appointment = petData?.confirmed_appointment;
    const pending_appointments = petData?.pending_appointments;

    const { data: symptom_history = [] } = useGetSymptomHistoryQuery(selectedPet._id, { skip: !selectedPet._id })

    const { data: medicalHistory = [], isLoading: medicalHistoryLoading } = useGetMedicalHistoryQuery({ petId: selectedPet._id }, { skip: !selectedPet._id });

    const petWeights = selectedPet?.weight || [];
    const petActivityLevel = selectedPet?.activity_level || [];
    const petEnergyLevel = selectedPet?.energy_level || [];

    const healthMap = {};

    const addToMap = (arr, key) => {
        arr.forEach(({ date, value }) => {
            const dateKey = new Date(date).toDateString();
            if (!healthMap[dateKey]) healthMap[dateKey] = { name: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }), weight: 0, activity: 0, energy: 0 };
            healthMap[dateKey][key] = value;
        });
    };
    // Merge all arrays
    addToMap(petWeights, 'weight');
    addToMap(petActivityLevel, 'activity');
    addToMap(petEnergyLevel, 'energy');
    // Convert map to array sorted by date
    const healthData = Object.values(healthMap).sort((a, b) => new Date(a.name) - new Date(b.name));


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
                            width={60}
                            height={60}
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
                        <p className="text-sm text-gray-500 capitalize">
                            {selectedPet.age} years old • {selectedPet.gender} •
                            <span className='ml-1 normal-case'>{
                                selectedPet?.weight?.reduce((latest, current) => {
                                    return new Date(current.date) > new Date(latest.date) ? current : latest;
                                }).value || 0
                            }
                                (lbs)
                            </span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-center">
                    <button
                        onClick={() => router.push("/vet-appointment")}
                        className=" flex justify-center items-center bg-primary hover:bg-primaryHover duration-200 text-white max-sm:w-max w-fit px-4 max-sm:px-3 py-[9px] rounded-lg transition-colors"
                    >
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Appointment
                    </button>
                    <button onClick={() => router.push("/dashboard/vet-gpt")} className=" flex justify-center items-center border border-gray-300 max-sm:w-max w-fit px-4 max-sm:px-3 py-[9px] rounded-lg hover:bg-gray-100 duration-200 transition-colors">
                        <HeartPulse className="mr-2 h-4 w-4" />
                        AI Health Tools
                    </button>
                </div>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex space-x-6 max-sm:space-x-5 overflow-x-auto mb-7 border-b">
                <button
                    onClick={() => setActiveTab("overview")}
                    className={`py-2 px-1 border-b-[3px] font-semibold text-base whitespace-nowrap ${activeTab === "overview"
                        ? "border-[#672e5b] text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab("health")}
                    className={`py-2 px-1 border-b-[3px] font-semibold text-base whitespace-nowrap ${activeTab === "health"
                        ? "border-[#672e5b] text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Health Records
                </button>
                <button
                    onClick={() => setActiveTab("medications")}
                    className={`py-2 px-1 border-b-[3px] font-semibold text-base whitespace-nowrap ${activeTab === "medications"
                        ? "border-[#672e5b] text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Medications
                </button>
                <button
                    onClick={() => setActiveTab("diet")}
                    className={`py-2 px-1 border-b-[3px] font-semibold text-base whitespace-nowrap ${activeTab === "diet"
                        ? "border-[#672e5b] text-primary"
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
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between pb-2">
                                <h3 className="text-sm font-medium text-gray-600">Overall Health</h3>
                                <Activity className="h-4 w-4 text-gray-500" />
                            </div>
                            <div className="text-2xl font-bold text-green-500">Excellent</div>
                            <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-green-500 transition-all duration-500"
                                    style={{ width: "80%" }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Based on recent observation</p>
                        </div>

                        <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between pb-2">
                                <h3 className="text-sm font-medium text-gray-600">Weight Tracking</h3>
                                <Weight className="h-4 w-4 text-gray-500" />
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



                        <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between pb-2">
                                <h3 className="text-sm font-medium text-gray-600">Next Vaccination</h3>
                                <Syringe className="h-4 w-4 text-gray-500" />
                            </div>
                            {petData?.upcoming_vaccination ?
                                <>
                                    <div className="text-2xl font-bold">
                                        {(() => {
                                            const nextDueDate = new Date(petData?.upcoming_vaccination?.next_due);
                                            const now = new Date();
                                            const diffMs = nextDueDate - now;
                                            const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
                                            return <span>{daysLeft}</span>;
                                        })()}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Days until {petData?.upcoming_vaccination?.vaccine} shot</p>
                                    <button className="text-xs text-blue-500 mt-1 hover:underline">View vaccination schedule</button>
                                </>
                                :
                                <div className='text-2xl font-bold'>
                                    <h2>No Vaccination</h2>
                                    <p className='font-normal text-xs text-gray-500 mt-2'>Add a new vaccination from health record to get started</p>
                                </div>
                            }
                        </div>
                    </div>

                    {/* Additional Health Metrics */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between pb-2">
                                <h3 className="text-sm font-medium text-gray-600">Recent Symptom</h3>
                                <Heart className="h-4 w-4 text-red-500" />
                            </div>
                            <div className="text-2xl font-bold">
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

                        <ActivityLevel activityLevel={petActivityLevel} />
                        <EnergyLevel energyLevel={petEnergyLevel} />

                    </div>

                    {/* Smart Reminder */}
                    <SmartReminder selectedPet={selectedPet} />

                    <div className="grid gap-4 grid-cols-1 md:grid-cols-7 overflow-hidden">
                        {/* Medical History */}
                        <div className="bg-white rounded-xl border shadow-sm md:col-span-4 flex flex-col max-md:order-2">
                            <div className="p-4 border-b">
                                <h3 className="flex items-center text-lg font-semibold text-blue-600">
                                    <Stethoscope className="mr-2 h-5 w-5 " />
                                    Medical Records
                                </h3>
                                <p className="text-sm text-gray-500">Recent medical records</p>
                            </div>
                            {
                                medicalHistoryLoading ?
                                    <TinySpinner />
                                    :
                                    medicalHistory?.medicalHistory?.length > 0 ?
                                        <>
                                            <div className="overflow-x-auto">
                                                <table className="w-full border-collapse">
                                                    <thead>
                                                        <tr className="text-left text-xs md:text-sm text-gray-500 border-b py-2">
                                                            <th className="p-4">Date</th>
                                                            <th className="p-4">Type</th>
                                                            {/* <th className="p-4">Doctor</th> */}
                                                            <th className="p-4">Diagnosis</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="">
                                                        {
                                                            medicalHistory.medicalHistory.slice(0, 3).map((record, index) => (
                                                                <tr key={index} className="border-b last:border-none hover:bg-gray-50 ">
                                                                    <td className="px-5 py-3 text-sm">{new Date(record.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}</td>
                                                                    <td className="px-5 py-3 text-sm">{displayValue(record.type)}</td>
                                                                    {/* <td className="px-5 py-3 text-sm">{displayValue(record.vet.fullName)}</td> */}
                                                                    <td className="px-5 py-3 text-sm">{displayValue(record.diagnosis)}</td>
                                                                </tr>
                                                            ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/* <div className="p-4 border-t mt-auto">
                                                <button className="text-sm text-primary hover:text-primaryHover transition-colors">
                                                    View Complete History →
                                                </button>
                                            </div> */}
                                        </>
                                        :
                                        <div className='flex flex-col items-center justify-center gap-3 h-full py-4 text-gray-600'>
                                            <PawPrint size={24} />
                                            <h4 className='font-medium '>No Medical History Found!</h4>
                                        </div>
                            }
                        </div>

                        {/* Upcoming */}
                        <div className="bg-white rounded-xl border shadow-sm md:col-span-3 max-md:order-1">
                            <div className="p-4 border-b">
                                <h3 className="flex items-center text-lg font-semibold text-primary">
                                    <CalendarClock className="mr-2 h-5 w-5" />
                                    Upcoming
                                </h3>
                                <p className="text-sm text-gray-500">Next appointments and reminders</p>
                            </div>
                            <div className="p-4 space-y-4">
                                {confirmed_appointment || petData?.next_reminder?.length > 0 || petData?.upcoming_vaccination ?
                                    <>
                                        {confirmed_appointment &&
                                            <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                                                <Calendar className="h-8 w-8 text-primary" />
                                                <div className="flex-1 space-y-1">
                                                    <p className="text-sm font-medium">{confirmed_appointment?.reason || 'Regular Check-up'}</p>
                                                    <p className="text-xs text-gray-500">On {new Date(confirmed_appointment?.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })}</p>
                                                    <p className="text-xs text-gray-500">with Dr. {confirmed_appointment?.vet?.fullName}</p>
                                                </div>
                                                <button className="border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                                                    Reschedule
                                                </button>
                                            </div>
                                        }
                                        {petData?.next_reminder?.length > 0 &&
                                            <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                                                <Pills className="h-8 w-8 text-primary" />
                                                <div className="flex-1 space-y-1">
                                                    <p className="text-sm font-medium capitalize">{petData.next_reminder[0].medication?.medication} due</p>
                                                    <p className="text-xs text-gray-500">
                                                        On {new Date(petData.next_reminder[0].reminder_datetime)
                                                            .toLocaleString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                                hour: 'numeric',
                                                                minute: '2-digit',
                                                                hour12: true,
                                                            })}
                                                    </p>
                                                </div>
                                                <button className="border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                                                    Mark Done
                                                </button>
                                            </div>
                                        }
                                        {petData?.upcoming_vaccination &&
                                            <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                                                <Syringe className="h-8 w-8 text-primary" />
                                                <div className="flex-1 space-y-1">
                                                    <p className="text-sm font-medium">{petData?.upcoming_vaccination?.vaccine}</p>
                                                    <p className="text-xs text-gray-500">{new Date(petData?.upcoming_vaccination?.next_due).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })}</p>
                                                </div>
                                                <button className="border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                                                    Schedule
                                                </button>
                                            </div>
                                        }
                                    </>
                                    :
                                    <div className='flex flex-col items-center justify-center gap-3 h-full py-4 text-gray-600'>
                                        <PawPrint size={24} />
                                        <h4 className='font-medium'>Nothing&apos;s Upcoming!</h4>
                                    </div>
                                }
                            </div>
                            {/* <div className="p-4 border-t">
                                <button className="text-sm text-primary hover:text-primaryHover transition-colors">
                                    View All Upcoming →
                                </button>
                            </div> */}
                        </div>
                    </div>

                    {/* Health Trends and Upcoming */}
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
                                            stroke="#8884d8"
                                            strokeWidth={2}
                                            name="Weight (lbs)"
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
                                    <div className="w-3 h-3 rounded-full bg-[#8884d8] mr-1"></div>
                                    <span>Weight</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-[#82ca9d] mr-1"></div>
                                    <span>Activity</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-[#f0be1b] mr-1"></div>
                                    <span>Energy</span>
                                </div>
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