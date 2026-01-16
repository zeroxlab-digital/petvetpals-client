"use client";
import { Activity, BatteryCharging, HeartPulse, Scale } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import HealthRecords from '../DashboardPage/HealthRecords/HealthRecords';
import Medications from '../DashboardPage/Medications/Medications';
import { useGetPetsQuery } from '@/redux/services/petApi';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import { getPetAge } from '@/utils/getPetAge';

const PetDetails = ({ petId }) => {
    const { data, isLoading, isError, error } = useGetPetsQuery();

    const pet = data?.pets?.find(pet => pet._id === petId);
    console.log(pet)
    const [activeTab, setActiveTab] = useState("Health Records");
    const tabs = ["Health Records", "Medications", "Diet & Activity"];

    if (isLoading) {
        return <PetSpinner />
    }
    return (
        <div>
            <div className="relative mb-6">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#671455] to-[#672e5b]"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-xl p-5 sm:p-7 flex flex-col sm:flex-row gap-6">

                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 w-full sm:w-auto">

                        {/* Pet image */}
                        <div className="relative w-full sm:w-auto">
                            <Image
                                src={pet.image || "/images/no-image.png"}
                                width={200}
                                height={200}
                                alt={pet.name}
                                className="
                                rounded-2xl shadow-xl  object-cover object-center
                                w-full h-56              /* MOBILE: big image */
                                sm:w-40 sm:h-40          /* DESKTOP: normal size */
                                "
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
                        </div>
                        <div className="sm:hidden text-white flex justify-between mt-2 w-full">
                            <div>
                                <h1 className="text-xl font-semibold tracking-tight capitalize">
                                    {pet.name}
                                </h1>

                                <p className="text-white/90 text-sm mb-1 capitalize">{pet.breed}</p>

                                <p className="text-xs text-white/90">
                                    {pet.type} • {getPetAge(pet.date_of_birth)}
                                </p>
                            </div>

                            <div
                                className={`capitalize mt-1 text-xs font-medium px-3 py-1 h-max rounded-full flex items-center gap-1 w-max ${pet.gender === "male"
                                    ? "bg-blue-400/10 text-blue-500"
                                    : "bg-pink-400/10 text-pink-500"
                                    }`}
                            >
                                {pet.gender === "male" ? "♂" : "♀"} {pet.gender}
                            </div>
                        </div>

                    </div>

                    <div className="flex-1 text-white w-full">

                        <div className="hidden sm:flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight capitalize">
                                {pet.name}
                            </h1>

                            <span
                                className={`capitalize text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 w-max ${pet.gender === "male"
                                    ? "bg-blue-500/20 text-blue-300"
                                    : "bg-pink-500/20 text-pink-300"
                                    }`}
                            >
                                {pet.gender === "male" ? "♂" : "♀"} {pet.gender}
                            </span>
                        </div>

                        <p className="hidden sm:block text-sm text-white/90 mt-1 capitalize">
                            {pet.type} • {getPetAge(pet.date_of_birth)} • {pet.breed}
                        </p>

                        {/* STATS */}
                        <div className="mt-5 max-sm:mt-1 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">

                            {/* Weight */}
                            <div className="bg-white/10 border border-white/10 rounded-xl p-3 flex flex-col items-center shadow-inner">
                                <Scale className="w-5 h-5 opacity-80 mb-1" />
                                <span className="text-[11px] text-white/80">Weight</span>
                                <span className="font-semibold text-white sm:text-lg mt-0.5 leading-none">
                                    {
                                        pet.weight.reduce((a, b) =>
                                            new Date(b.date) > new Date(a.date) ? b : a
                                        ).value
                                    } lbs
                                </span>
                            </div>

                            {/* Activity */}
                            <div className="bg-white/10 border border-white/10 rounded-xl p-3 flex flex-col items-center shadow-inner">
                                <Activity className="w-5 h-5 opacity-80 mb-1" />
                                <span className="text-[11px] text-white/80">Activity</span>
                                <span className="font-semibold text-white sm:text-lg mt-0.5 leading-none">
                                    { pet.activity_level.length > 0 ?
                                        pet.activity_level.reduce((a, b) =>
                                            new Date(b.date) > new Date(a.date) ? b : a
                                        ).value
                                        :
                                        'N/A'
                                    }%
                                </span>
                            </div>

                            {/* Energy */}
                            <div className="bg-white/10 border border-white/10 rounded-xl p-3 flex flex-col items-center shadow-inner">
                                <BatteryCharging className="w-5 h-5 opacity-80 mb-1" />
                                <span className="text-[11px] text-white/80">Energy</span>
                                <span className="font-semibold text-white sm:text-lg mt-0.5 leading-none">
                                    { pet.energy_level.length > 0 ?
                                        pet.energy_level.reduce((a, b) =>
                                            new Date(b.date) > new Date(a.date) ? b : a
                                        ).value
                                        :
                                        'N/A'
                                    }%
                                </span>
                            </div>

                            {/* Health */}
                            <div className="bg-white/10 border border-white/10 rounded-xl p-3 flex flex-col items-center shadow-inner">
                                <HeartPulse className="w-5 h-5 opacity-80 mb-1" />
                                <span className="text-[11px] text-white/80">Health</span>
                                <span className="font-semibold text-white sm:text-lg mt-0.5 leading-none">
                                    {pet.overall_health}%
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <ul className='grid grid-cols-3 gap-2 max-sm:gap-0'>
                {tabs.map((tab, index) => {
                    const isActive = activeTab === tab;
                    return (
                        <li
                            key={index}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                ${isActive ? 'border-b-2 border-[#672e5b] pb-2 text-primary' : 'text-gray-800'}
                                font-semibold
                                text-sm cursor-pointer py-2 text-center
                            `}
                        >
                            {tab}
                        </li>
                    );
                })}
            </ul>

            {/* Render content based on activeTab */}
            <div className="mt-4">
                {activeTab === "Health Records" && <HealthRecords petId={pet._id} />}
                {activeTab === "Medications" && <Medications petId={pet._id} />}
                {activeTab === "Diet & Activity" && <div>Coming soon...</div>}
            </div>
        </div>
    );
};

export default PetDetails;