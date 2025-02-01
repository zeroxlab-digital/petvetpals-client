"use client";
import Button from '@/components/Common/Button/Button';
import Image from 'next/image';
import React, { useState } from 'react';
import PetProfileModal from './PetProfileModal';

const PetProfiles = () => {
    const profiles = [
        {
            _id: "1",
            image: "/images/cat-cute.jpg",
            type: "Cat",
            name: "Buddy",
            age: "3 years",
            breed: "Golden Retriever",
            gender: "Male",
            weight: "30 kg",
            // vaccinationRecords: [
            //     { date: "2023-12-01", type: "Rabies", nextDue: "2024-12-01" }
            // ],
            // medicalHistory: [
            //     {
            //         visitDate: "2023-10-10",
            //         diagnosis: "Allergy",
            //         treatment: "Antihistamines",
            //         vetName: "Dr. Smith",
            //         clinic: "Happy Paws Clinic"
            //     }
            // ],
            // prescriptions: [
            //     { medication: "Antihistamines", dosage: "1 tablet daily", duration: "7 days" }
            // ],
            // appointments: [
            //     { appointmentDate: "2024-01-10", purpose: "Checkup", vetName: "Dr. Smith", clinic: "Happy Paws Clinic" }
            // ],
            // documents: [
            //     { type: "X-ray", uploadDate: "2023-11-15", url: "https://example.com/xray.pdf" }
            // ],
            notes: "Loves peanut butter treats!",
        },
        {
            _id: "2",
            image: "/images/cute-dog.jpg",
            type: "Dog",
            name: "Buddy",
            age: "3 years",
            breed: "Golden Retriever",
            gender: "Male",
            weight: "30 kg",
            // vaccinationRecords: [
            //     { date: "2023-12-01", type: "Rabies", nextDue: "2024-12-01" }
            // ],
            // medicalHistory: [
            //     {
            //         visitDate: "2023-10-10",
            //         diagnosis: "Allergy",
            //         treatment: "Antihistamines",
            //         vetName: "Dr. Smith",
            //         clinic: "Happy Paws Clinic"
            //     }
            // ],
            // prescriptions: [
            //     { medication: "Antihistamines", dosage: "1 tablet daily", duration: "7 days" }
            // ],
            // appointments: [
            //     { appointmentDate: "2024-01-10", purpose: "Checkup", vetName: "Dr. Smith", clinic: "Happy Paws Clinic" }
            // ],
            // documents: [
            //     { type: "X-ray", uploadDate: "2023-11-15", url: "https://example.com/xray.pdf" }
            // ],
            notes: "Loves peanut butter treats!",
        },
    ]
    const [modalType, setModalType] = useState(null);
    const handleShowModal = (type) => {
        setModalType(type);
    }
    return (
        <div className='grid grid-cols-3 gap-5 '>
            {profiles.map(({ _id, type, name, image, age, breed, gender, weight }) => (
                <div key={_id} className='border rounded-md bg-white '>
                    <Image src={image} alt="pet's-img" width={200} height={200} className='object-cover w-full h-56 rounded-t-md rounded-b-3xl' />
                    <div className='p-3 mt-3'>
                        <ul className='text-gray-600 flex flex-col gap-3 mb-7'>
                            <li className='flex items-center justify-between text-sm'><span>Type</span>{type}</li>
                            <li className='flex items-center justify-between text-sm'><span>Name</span>{name}</li>
                            <li className='flex items-center justify-between text-sm'><span>Age</span>{age}</li>
                            <li className='flex items-center justify-between text-sm'><span>Breed</span>{breed}</li>
                            <li className='flex items-center justify-between text-sm'><span>Gender</span>{gender}</li>
                            <li className='flex items-center justify-between text-sm'><span>Weight</span>{weight}</li>
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