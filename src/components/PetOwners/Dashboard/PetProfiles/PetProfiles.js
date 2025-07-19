"use client";
import Button from '@/components/Common/Button/Button';
import Image from 'next/image';
import React, { useState } from 'react';
import PetProfileModal from './PetProfileModal';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import { useGetPetsQuery } from '@/redux/services/petApi';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Dna, Plus, Scale } from 'lucide-react';

const PetProfiles = () => {
    const { data, isLoading, isError, error } = useGetPetsQuery();

    const [petProfile, setPetProfile] = useState({
        type: '',
        name: '',
        image: null,
        age: 0,
        breed: '',
        gender: '',
        weight: 0,
    })

    const [modalType, setModalType] = useState(null);
    const [updatePet, setUpdatePet] = useState(null);
    const handleShowModal = (type, pet) => {
        setModalType(type);
        setUpdatePet(pet);
    }
    if (isLoading) {
        return <PetSpinner />
    }
    return (
        <div>
            <div className='mb-5'>
                <h2 className='font-bold text-2xl mb-1'>Pet profiles</h2>
                <p className='text-gray-500'>Add and modify your furry pet&apos;s profiles</p>
            </div>
            <div className='grid grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-7 auto-rows-fr'>
                {data?.pets.map(pet => (
                    <div key={pet._id} className=' rounded-lg bg-white shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2 duration-300'>
                        <div className='relative'>
                            <Image src={pet.image || "/images/no-image.png"} alt="pet's-img" width={200} height={200} className='object-cover w-full h-56 rounded-lg' />
                            <div className='absolute top-2 left-3 right-3 flex items-center justify-between'>
                                <p className={`rounded-full px-2 py-[2px] text-xs font-medium flex items-center gap-1 max-w-max ${pet.gender == 'male' ? 'bg-[#DBEAFE] text-blue-500' : 'bg-[#FCE7F3] text-pink-500'}`}>
                                    <span>{pet.gender == 'male' ? '♂' : '♀'}</span>
                                    {pet.gender}
                                </p>
                                <p className='text-xl'>
                                    {
                                        pet.type == "Dog" ? "🐕" : pet.type == "Cat" ? "🐱" : "🐾"
                                    }
                                </p>
                            </div>
                        </div>
                        <div className='p-3'>
                            <ul className='text-gray-600 flex flex-col gap-2 mb-4'>
                                <li className='mb-2 flex items-center gap-1 text-lg font-semibold text-gray-700 capitalize'>
                                    <span>{pet.name}</span>
                                    <span className='text-sm font-normal text-gray-600 '>• {pet.type} • {pet.age} years old</span>
                                </li>
                                <li className='flex items-center justify-between text-sm capitalize'><span className='flex items-center gap-2'><Dna size={17} className='text-primary' /> Breed</span> {pet.breed}</li>
                                <li className='flex items-center justify-between text-sm'><span className='flex items-center gap-2'><Scale size={17} className='text-primary' /> Weight</span> {pet.weight} lbs</li>
                            </ul>
                            <div className='flex items-center gap-2'>
                                <Button onClick={() => handleShowModal("update", pet)} variant={"primaryOutline"} classNames={"!w-full text-sm"}><HiOutlinePencilAlt /> Update pet</Button>
                                <Button variant={"primary"} classNames={"!w-full text-sm"}>View details</Button>
                            </div>
                        </div>
                    </div>
                ))}
                <button onClick={() => handleShowModal("add")} className='group h-full w-full border-dashed border-[#58294e2e] hover:border-[#58294e41] bg-[#58294e0d] hover:bg-[#58294e18] hover:shadow-lg transition-transform transform hover:-translate-y-2 duration-300 border-2 rounded-md flex flex-col items-center justify-center p-5'>
                    <div className='p-3 text-sm text-white bg-gradient-to-r from-[#58294ef0] to-pink-500 rounded-full group-hover:scale-110 transition-transform duration-300 text-center flex items-center justify-center'>
                        <Plus size={28} />
                    </div>
                    <p className='text-gray-900 text-lg font-semibold mt-4 mb-2'>Add New Pet</p>
                    <p className='text-gray-600'>Create a profile for your new furry family member</p>
                </button>
                {modalType && <PetProfileModal modalType={modalType} setModalType={setModalType} petProfile={petProfile} setPetProfile={setPetProfile} updatePet={updatePet} />}
            </div>
        </div>
    );
};

export default PetProfiles;