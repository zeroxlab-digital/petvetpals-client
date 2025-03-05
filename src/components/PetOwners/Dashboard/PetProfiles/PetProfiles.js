"use client";
import Button from '@/components/Common/Button/Button';
import Image from 'next/image';
import React, { useState } from 'react';
import PetProfileModal from './PetProfileModal';
import useFetchPets from '../../../../../hooks/useFetchPets';
import { PetSpinner } from '@/components/Common/Loader/PetSpinner';

const PetProfiles = () => {
    const { pets, isLoading, error } = useFetchPets();

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
                {pets.map(pet => (
                    <div key={pet._id} className=' rounded-lg bg-white shadow-xl hover:shadow-2xl duration-200'>
                        <Image src={pet.image || "/images/no-image.jpg"} alt="pet's-img" width={200} height={200} className='object-cover w-full h-56 rounded-lg' />
                        <div className='p-4'>
                            <ul className='text-gray-600 flex flex-col gap-3 mb-5'>
                                <li className='flex items-center justify-between text-sm capitalize'><span>Type</span>{pet.type}</li>
                                <li className='flex items-center justify-between text-sm capitalize'><span>Name</span>{pet.name}</li>
                                <li className='flex items-center justify-between text-sm capitalize'><span>Age</span>{pet.age}</li>
                                <li className='flex items-center justify-between text-sm capitalize'><span>Breed</span>{pet.breed}</li>
                                <li className='flex items-center justify-between text-sm capitalize'><span>Gender</span>{pet.gender}</li>
                                <li className='flex items-center justify-between text-sm capitalize'><span>Weight</span>{pet.weight}</li>
                            </ul>
                            <Button onClick={() => handleShowModal("update", pet)} variant={"primaryOutline"} classNames={"!w-full !text-base !font-semibold"}>Update profile</Button>
                        </div>
                    </div>
                ))}
                <div className='h-full border-dashed border-[#58294e98] border-2 rounded-md flex items-center justify-center'>
                    <button onClick={() => handleShowModal("add")} className='text-primary text-lg w-full h-full font-semibold'><span className='text-xl'>+</span> Add new profile</button>
                </div>
                {modalType && <PetProfileModal modalType={modalType} setModalType={setModalType} petProfile={petProfile} setPetProfile={setPetProfile} updatePet={updatePet} />}
            </div>
        </div>
    );
};

export default PetProfiles;