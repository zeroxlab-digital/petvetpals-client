"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import NoPhoto from '/public/images/vet.png'
import { HiChevronDown, HiClock, HiCurrencyDollar, HiMapPin, HiOutlineClock, HiOutlineCurrencyDollar, HiOutlineMapPin, HiVideoCamera } from 'react-icons/hi2';
import { LuCat, LuDog, LuRat } from 'react-icons/lu';

const Appointments = () => {
    const appointments = [
        {
            month: "June",
            day: "Wednesday",
            date: "21",
            starts_at: "9:00 PM",
            ends_at: "9:30 PM",
            location: "Online",
            vet_details: {
                _id: "vet001",
                name: "Dr. Emily Carter",
                image: "https://example.com/images/vet001.jpg"
            },
            consultation_type: "General Checkup",
            consultation_fee: 50,
            pet_details: {
                name: "Mittens",
                type: "Cat"
            },
            pet_owner: "John Doe",
            starts_in_countdown: "1 day 3 hours",
            join_consultation_meet: "https://meet.google.com/abc-defg",
            status: "upcoming"
        },
        {
            month: "June",
            day: "Friday",
            date: "23",
            starts_at: "10:00 AM",
            ends_at: "10:45 AM",
            location: "Vet Clinic",
            vet_details: {
                _id: "vet002",
                name: "Dr. Mark Wilson",
                image: "https://example.com/images/vet002.jpg"
            },
            consultation_type: "Vaccination",
            consultation_fee: 30,
            pet_details: {
                name: "Buddy",
                type: "Dog"
            },
            pet_owner: "Jane Smith",
            starts_in_countdown: "2 days 5 hours",
            join_consultation_meet: "",
            status: "upcoming"
        },
        {
            month: "June",
            day: "Monday",
            date: "19",
            starts_at: "3:00 PM",
            ends_at: "3:30 PM",
            location: "Online",
            vet_details: {
                _id: "vet003",
                name: "Dr. Anna Lee",
                image: "https://example.com/images/vet003.jpg"
            },
            consultation_type: "Dental Checkup",
            consultation_fee: 60,
            pet_details: {
                name: "Max",
                type: "Rabbit"
            },
            pet_owner: "Alex Brown",
            starts_in_countdown: "",
            join_consultation_meet: "https://meet.google.com/xyz-uvwx",
            status: "past"
        },
        {
            month: "June",
            day: "Monday",
            date: "19",
            starts_at: "3:00 PM",
            ends_at: "3:30 PM",
            location: "Online",
            vet_details: {
                _id: "vet003",
                name: "Dr. Anna Lee",
                image: "https://example.com/images/vet003.jpg"
            },
            consultation_type: "Dental Checkup",
            consultation_fee: 60,
            pet_details: {
                name: "Max",
                type: "Rabbit"
            },
            pet_owner: "Alex Brown",
            starts_in_countdown: "",
            join_consultation_meet: "https://meet.google.com/xyz-uvwx",
            status: "past"
        },
        {
            month: "June",
            day: "Monday",
            date: "19",
            starts_at: "3:00 PM",
            ends_at: "3:30 PM",
            location: "Online",
            vet_details: {
                _id: "vet003",
                name: "Dr. Anna Lee",
                image: "https://example.com/images/vet003.jpg"
            },
            consultation_type: "Dental Checkup",
            consultation_fee: 60,
            pet_details: {
                name: "Max",
                type: "Rabbit"
            },
            pet_owner: "Alex Brown",
            starts_in_countdown: "",
            join_consultation_meet: "https://meet.google.com/xyz-uvwx",
            status: "past"
        },
        {
            month: "June",
            day: "Saturday",
            date: "24",
            starts_at: "12:00 PM",
            ends_at: "12:30 PM",
            location: "Home Visit",
            vet_details: {
                _id: "vet004",
                name: "Dr. Susan Clark",
                image: "https://example.com/images/vet004.jpg"
            },
            consultation_type: "Behavioral Therapy",
            consultation_fee: 80,
            pet_details: {
                name: "Luna",
                type: "Dog"
            },
            pet_owner: "Michael Johnson",
            starts_in_countdown: "3 days 2 hours",
            join_consultation_meet: "",
            status: "cancelled"
        },
        {
            month: "June",
            day: "Saturday",
            date: "24",
            starts_at: "12:00 PM",
            ends_at: "12:30 PM",
            location: "Home Visit",
            vet_details: {
                _id: "vet004",
                name: "Dr. Susan Clark",
                image: "https://example.com/images/vet004.jpg"
            },
            consultation_type: "Behavioral Therapy",
            consultation_fee: 80,
            pet_details: {
                name: "Luna",
                type: "Dog"
            },
            pet_owner: "Michael Johnson",
            starts_in_countdown: "3 days 2 hours",
            join_consultation_meet: "",
            status: "past"
        }
    ];

    const status_tabs = ["upcoming", "past", "cancelled"];
    const [active_status_tab, set_active_status_tab] = useState(status_tabs[0]);

    const filtered_appointments = appointments.filter(appointment => appointment.status === active_status_tab);
    console.log(filtered_appointments)

    return (
        <div>
            <div className='mb-5'>
                <h2 className='font-bold text-2xl mb-1'>Appointments</h2>
                <p className='text-gray-500 '>See your scheduled and all other appointments</p>
            </div>
            <ul className='bg-gray-100 bg-opacity-50 p-2 rounded-md flex items-center gap-2 mb-10'>
                {status_tabs.map((tab, index) => <li key={index} onClick={() => set_active_status_tab(tab)} className={`${active_status_tab === tab ? 'bg-gray-700 text-gray-100' : 'text-gray-800'}  text-sm py-2 w-32 text-center rounded-md cursor-pointer capitalize`}>{tab}</li>)}
            </ul>
            <div>
                {filtered_appointments.map((appointment, index) => (
                    <div key={index} className='grid grid-cols-12 items-center gap-5 border rounded-md p-5 mb-3 last:mb-0'>
                        <div className='text-center col-span-1'>
                            <p className='text-gray-600 font-semibold text-sm'>{appointment.day.slice(0, 3)}</p>
                            <h4 className='font-bold text-3xl text-gray-700 mt-1'>{appointment.date}</h4>
                            <p className='text-gray-600 text-sm'>{appointment.month.slice(0, 3)} 2024</p>
                        </div>
                        <div className='flex items-center gap-3 col-span-3'>
                            <Image src={NoPhoto} alt='vet_img' width={200} height={200} className='w-14 h-auto rounded-full' />
                            <div>
                                <h5 className='font-semibold text-lg mb-1'>{appointment?.vet_details?.name}</h5>
                                <p className='text-sm text-gray-500'>{appointment.consultation_type}</p>
                            </div>
                        </div>
                        <div className='col-span-3'>
                            <p className='text-gray-600 flex items-center gap-2 mb-2'><HiOutlineClock className='text-lg' /> {appointment.starts_at} - {appointment.ends_at}</p>
                            <p className='text-gray-600 flex items-center gap-2'><HiOutlineMapPin className='text-lg' /> {appointment.location}</p>
                        </div>
                        <div className='col-span-2'>
                            <p className='text-gray-600 flex items-center gap-2 mb-2'>{appointment.pet_details.type == 'Dog' ? <LuDog className='text-lg' /> : appointment.pet_details.type == 'Cat' ? <LuCat className='text-lg' /> : appointment.pet_details.type == 'Rabbit' ? <LuRat className='text-lg' /> : 'Ops'} {appointment.pet_details.name}<span className='text-sm'>(2y/o)</span></p>
                            <p className='text-gray-600 flex items-center gap-2'><HiOutlineCurrencyDollar className='text-lg' /> ${appointment.consultation_fee.toFixed(2)}</p>
                        </div>
                        <div className='flex items-center gap-4 col-span-3'>
                            <button className='flex items-center gap-2 bg-white px-5 py-3 rounded-lg text-gray-900 border text-sm'>Edit <HiChevronDown /></button>
                            <button className='flex items-center gap-2 bg-primary px-5 py-3 rounded-lg text-white text-sm'>Join Now <HiVideoCamera /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Appointments;