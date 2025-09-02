"use client";
import { Dna, Scale } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import HealthRecords from '../DashboardPage/HealthRecords/HealthRecords';
import Medications from '../DashboardPage/Medications/Medications';
import { useGetPetsQuery } from '@/redux/services/petApi';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';

const PetDetails = ({ petId }) => {
    const { data, isLoading, isError, error } = useGetPetsQuery();

    const pet = data?.pets?.find(pet => pet._id === petId);

    const [activeTab, setActiveTab] = useState("Health Records");
    const tabs = ["Health Records", "Medications", "Diet & Activity"];

    if (isLoading) {
        return <PetSpinner />
    }
    return (
        <div>
            <div className='mb-5 bg-primary p-3 sm:p-5 rounded-lg flex items-center gap-3 sm:gap-5'>
                <div>
                    <Image src={pet.image || "/images/no-image.png"} alt={`${pet.name}'s image`} width={100} height={100} className='w-24 h-24 sm:w-40 sm:h-40 rounded-full object-cover border-2 border-white' />
                </div>
                <div>
                    <ul>
                        <li className='mb-2 flex items-center gap-1 text-lg font-semibold text-white capitalize'>
                            <h4>{pet.name}</h4>
                            <span className='text-sm font-normal '>• {pet.type} • {pet.age} years old</span>
                        </li>
                        <li className='mb-1 flex items-center  gap-5 text-sm capitalize text-white'><span className='flex items-center gap-2'><Dna size={17} className='' /> Breed</span> {pet.breed}</li>
                        <li className='mb-2 flex items-center gap-5 text-sm text-white'><span className='flex items-center gap-2 '><Scale size={17} className='' /> Weight (lbs)</span>
                            {
                                pet.weight.reduce((latest, current) => {
                                    return new Date(current.date) > new Date(latest.date) ? current : latest;
                                }).value || 0
                            }
                            </li>
                        <span className={`rounded-full px-2 py-[2px] text-xs font-medium flex items-center gap-1 max-w-max ${pet.gender == 'male' ? 'bg-[#DBEAFE] text-blue-500' : 'bg-[#FCE7F3] text-pink-500'}`}>
                            <span>{pet.gender == 'male' ? '♂' : '♀'}</span>
                            {pet.gender}
                        </span>
                    </ul>
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

            {/* Example: Render content based on activeTab */}
            <div className="mt-4">
                {activeTab === "Health Records" && <HealthRecords petId={pet._id} />}
                {activeTab === "Medications" && <Medications petId={pet._id} />}
                {activeTab === "Diet & Activity" && <div>Coming soon...</div>}
            </div>
        </div>
    );
};

export default PetDetails;
