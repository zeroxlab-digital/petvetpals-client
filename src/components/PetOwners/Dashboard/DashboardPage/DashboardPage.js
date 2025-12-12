"use client";
import { useGetMedicalHistoryQuery, useGetPetDataQuery, useGetPetsQuery } from '@/redux/services/petApi';
import React, { useEffect, useRef, useState } from 'react';
import InitialDashboard from './InitialDashboard';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import Image from 'next/image';
import { Calendar, ChevronDown, ChevronUp, Syringe, PawPrint, PillIcon as Pills, CalendarClock, Stethoscope, HeartPulse } from 'lucide-react';
import { useRouter } from 'next/navigation';
import HealthRecords from './HealthRecords/HealthRecords';
import Medications from './Medications/Medications';
import DietActivity from './DietActivity/DietActivity';
import { useGetSymptomHistoryQuery } from '@/redux/services/symptomApi';
import { displayValue } from '@/utils/displayValue';
import TinySpinner from '@/components/Common/Loader/TinySpinner';
import SmartReminder from './SmartReminder/SmartReminder';
import ActivityLevel from './QuickPetInsights/ActivityLevel';
import EnergyLevel from './QuickPetInsights/EnergyLevel';
import { useUpdateUserTimezone } from '../../../../../hooks/useUpdateUserTimezone';
import OverallHealth from './QuickPetInsights/OverallHealth';
import WeightTracker from './QuickPetInsights/WeightTracker';
import NextVaccination from './QuickPetInsights/NextVaccination';
import RecentSymptoms from './QuickPetInsights/RecentSymptoms';
import HealthTrends from './HealthTrends/HealthTrends';

const DashboardPage = () => {

    // Updates the user timezone on mount if different than the previous timezone
    useUpdateUserTimezone();

    const { data: { pets } = {}, isLoading, error } = useGetPetsQuery();
    const [selectedPet, setSelectedPet] = useState({});
    // console.log("Selected pet:", selectedPet);

    const [showPetMenu, setShowPetMenu] = useState(false)
    const petListContainerRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (petListContainerRef.current && !petListContainerRef.current.contains(e.target)) {
                setShowPetMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const router = useRouter();

    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        if (pets?.length > 0) {
            setSelectedPet(pets[0])
        }
    }, [pets])

    const { data: petData, isLoading: petLoading } = useGetPetDataQuery({ id: selectedPet._id }, { skip: !selectedPet._id });
    // console.log("pet data:", petData);
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
                                {selectedPet.name} <span className="text-gray-500 text-base font-normal capitalize">({selectedPet.breed})</span>
                                {showPetMenu ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </button>
                            {showPetMenu && (
                                <div ref={petListContainerRef} className="absolute top-full left-0 mt-1 w-[15rem] bg-white rounded-lg shadow-lg border p-1 z-10 max-h-60 overflow-auto ">
                                    {pets.map((pet) => (
                                        <button
                                            key={pet._id}
                                            onClick={() => {
                                                setSelectedPet(pet), setShowPetMenu(false)
                                            }}
                                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                                        >
                                            <span>{pet.name}</span> <span className="text-sm capitalize">({pet.breed})</span>
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
                <div className="flex items-center gap-2 text-center max-sm:w-full">
                    <button
                        onClick={() => router.push("/dashboard/vet-gpt")}
                        className="flex justify-center items-center 
               w-fit max-sm:w-1/2 px-4 max-sm:px-3 py-[9px] 
               rounded-lg sm:font-semibold text-white 
               bg-primary hover:bg-primaryHover
               duration-200 transition-colors"
                    >
                        <HeartPulse className="mr-2 h-4 w-4" />
                        AI Health Tools
                    </button>

                    <button
                        onClick={() => router.push("/vet-appointment")}
                        className="flex justify-center items-center 
               w-fit max-sm:w-1/2 px-4 max-sm:px-3 py-[9px] 
               rounded-lg sm:font-semibold text-white 
               bg-secondary hover:bg-secondaryHover
               duration-200 transition-colors"
                    >
                        <Calendar className="mr-2 h-4 w-4" />
                        Vet Appointment
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
                        <OverallHealth overall_health={petData?.overall_health} />
                        <WeightTracker selectedPet={selectedPet} />
                        <NextVaccination petData={petData} />
                    </div>

                    {/* Additional Health Metrics */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <RecentSymptoms symptom_history={symptom_history} />
                        <ActivityLevel petId={selectedPet?._id} activityLevel={petActivityLevel} />
                        <EnergyLevel petId={selectedPet?._id} energyLevel={petEnergyLevel} />
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
                                                {/* <button className="border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                                                    Reschedule
                                                </button> */}
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
                                                                timeZone: 'UTC'
                                                            })}
                                                    </p>
                                                </div>
                                                {/* <button className="border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                                                    Mark Done
                                                </button> */}
                                            </div>
                                        }
                                        {petData?.upcoming_vaccination &&
                                            <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                                                <Syringe className="h-8 w-8 text-primary" />
                                                <div className="flex-1 space-y-1">
                                                    <p className="text-sm font-medium">{petData?.upcoming_vaccination?.vaccine}</p>
                                                    <p className="text-xs text-gray-500">{new Date(petData?.upcoming_vaccination?.next_due).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })}</p>
                                                </div>
                                                {/* <button className="border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                                                    Schedule
                                                </button> */}
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
                        </div>
                    </div>

                    {/* Health Trends and Upcoming */}
                    <HealthTrends healthData={healthData} />
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