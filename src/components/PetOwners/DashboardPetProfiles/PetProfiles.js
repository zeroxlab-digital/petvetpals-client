"use client";
import Button from '@/components/Common/Button/Button';
import Image from 'next/image';
import React, { useState } from 'react';
import PetProfileModal from './PetProfileModal';
import useFetchPets from '../../../../hooks/useFetchPets';

const PetProfiles = () => {
    const pets = useFetchPets();
    
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

    return (
        <div className='grid grid-cols-3 gap-5 auto-rows-fr'>
            {pets.map( pet  => (
                <div key={pet._id} className='border rounded-md bg-white '>
                    <Image src={pet.image || "/images/cat-cute.jpg"} alt="pet's-img" width={200} height={200} className='object-cover w-full h-56 rounded-t-md rounded-b-3xl' />
                    <div className='p-3 mt-3'>
                        <ul className='text-gray-600 flex flex-col gap-3 mb-7'>
                            <li className='flex items-center justify-between text-sm capitalize'><span>Type</span>{pet.type}</li>
                            <li className='flex items-center justify-between text-sm capitalize'><span>Name</span>{pet.name}</li>
                            <li className='flex items-center justify-between text-sm capitalize'><span>Age</span>{pet.age}</li>
                            <li className='flex items-center justify-between text-sm capitalize'><span>Breed</span>{pet.breed}</li>
                            <li className='flex items-center justify-between text-sm capitalize'><span>Gender</span>{pet.gender}</li>
                            <li className='flex items-center justify-between text-sm capitalize'><span>Weight</span>{pet.weight}</li>
                        </ul>
                        <Button onClick={() => handleShowModal("update", pet)} variant={"primary"} classNames={"!w-full !text-base !font-normal"}>Update Profile</Button>
                    </div>
                </div>
            ))}
            <div className='min-h-full border-dashed border-2 rounded-md flex items-center justify-center'>
                <button onClick={() => handleShowModal("add")} className='text-gray-500 text-lg w-full h-full'><span className='text-xl'>+</span> Add new profile</button>
            </div>
            {modalType && <PetProfileModal modalType={modalType} setModalType={setModalType} petProfile={petProfile} setPetProfile={setPetProfile} updatePet={updatePet} />}
        </div>
    );
};

export default PetProfiles;