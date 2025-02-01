"use client";
import Button from '@/components/Common/Button/Button';
import Image from 'next/image';
import React, { useState } from 'react';
import PetProfileModal from './PetProfileModal';
import useFetchPets from '../../../../hooks/useFetchPets';

const PetProfiles = () => {

    const pets = useFetchPets();
    console.log("pets:", pets);

    const [modalType, setModalType] = useState(null);
    const handleShowModal = (type) => {
        setModalType(type);
    }

    return (
        <div className='grid grid-cols-3 gap-5 '>
            {pets.map(({ _id, type, name, image, age, breed, gender, weight }) => (
                <div key={_id} className='border rounded-md bg-white '>
                    <Image src={image || "/images/cat-cute.jpg"} alt="pet's-img" width={200} height={200} className='object-cover w-full h-56 rounded-t-md rounded-b-3xl' />
                    <div className='p-3 mt-3'>
                        <ul className='text-gray-600 flex flex-col gap-3 mb-7'>
                            <li className='flex items-center justify-between text-sm capitalize'><span>Type</span>{type}</li>
                            <li className='flex items-center justify-between text-sm capitalize'><span>Name</span>{name}</li>
                            <li className='flex items-center justify-between text-sm capitalize'><span>Age</span>{age}</li>
                            <li className='flex items-center justify-between text-sm capitalize'><span>Breed</span>{breed}</li>
                            <li className='flex items-center justify-between text-sm capitalize'><span>Gender</span>{gender}</li>
                            <li className='flex items-center justify-between text-sm capitalize'><span>Weight</span>{weight}</li>
                        </ul>
                        <Button onClick={() => handleShowModal("update")} variant={"primary"} classNames={"!w-full !text-base !font-normal"}>Update Profile</Button>
                    </div>
                </div>
            ))}
            <div className=' border-dashed border-2 rounded-md flex items-center justify-center'>
                <button onClick={() => handleShowModal("add")} className='text-gray-500 text-lg'><span className='text-xl'>+</span> Add new profile</button>
                {modalType && <PetProfileModal modalType={modalType} setModalType={setModalType} />}
            </div>
        </div>
    );
};

export default PetProfiles;