"use client";
import Sidebar from '@/components/PetOwners/Dashboard/Sidebar/Sidebar';
import {
    Home,
    Calendar,
    MessageCircle,
    Pill,
    DollarSign,
    User,
    Stethoscope,
    PawPrint
} from "lucide-react";
import { useState } from 'react';
import { HiBars3CenterLeft } from 'react-icons/hi2';
import ProtectedPage from '@/components/Common/ProtectedPage/ProtectedPage';

const VetLayout = ({ children }) => {
    const [responsiveToggle, setResponsiveToggle] = useState(false);
    const links = [
        {
            title: "Dashboard",
            link: "/veterinarian/dashboard",
            icon: <Home size={20} />
        },
        {
            title: "Appointments",
            link: "/veterinarian/dashboard/appointments",
            icon: <Calendar size={20} />
        },
        {
            title: "Messages",
            link: "/veterinarian/dashboard/messages",
            icon: <MessageCircle size={20} />
        },
        {
            title: "Patient Records",
            link: "/veterinarian/dashboard/patients",
            icon: <PawPrint size={20} />
        },
        {
            title: "Treatments History",
            link: "/veterinarian/dashboard/treatments",
            icon: <Pill size={20} />
        },
        {
            title: "Earnings & Payouts",
            link: "/veterinarian/dashboard/earnings",
            icon: <DollarSign size={20} />
        },
        {
            title: "Vet Profile",
            link: "/veterinarian/dashboard/profile",
            icon: <User size={20} />
        }
    ];
    return (
        <div className='lg:grid grid-cols-10 gap-0 max-h-screen'>

            {/* Toggle Button for Mobile */}
            <div className={`lg:hidden p-3 flex flex-row-reverse items-center justify-between ${responsiveToggle && 'hidden'}`}>
                <button
                    onClick={() => setResponsiveToggle(true)}
                    className='text-primary'
                >
                    <HiBars3CenterLeft className='text-3xl' />
                </button>
                <div className="flex items-center gap-2 text-primary">
                    <Stethoscope className="w-6 h-6 text-blue-500" />
                    <span className="text-2xl  font-bold">Pet<span className='text-blue-500'>Vet</span>Pals</span>
                </div>
            </div>

            {/* Sidebar */}
            <div className={`lg:h-[calc(100vh-5.1rem)] col-span-2 bg-white rounded-md max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:h-full max-lg:z-40 max-lg:transform ${responsiveToggle ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'
                } transition-transform duration-300 ease-in-out`}>
                <div className="flex items-center gap-2 max-lg:hidden text-primary border-b lg:p-5 p-3">
                    <Stethoscope className="w-6 h-6 text-blue-500" />
                    <span className="text-2xl  font-bold">Pet<span className='text-blue-500'>Vet</span>Pals</span>
                </div>
                <Sidebar links={links} setResponsiveToggle={setResponsiveToggle} />
            </div>

            {/* Overlay for Mobile */}
            {responsiveToggle && (
                <div
                    className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30'
                    onClick={() => setResponsiveToggle(false)}
                />
            )}

            {/* Main Content */}
            <div className='col-span-8 max-lg:col-span-12 max-lg:h-[calc(100vh-3.5rem)] h-screen p-3 lg:p-5 bg-gray-50/40 border-l rounded-md rounded-l-none sm:overflow-auto hide-scrollbar'>
                {children}
            </div>
        </div>
    );
};

export default ProtectedPage(VetLayout, "vet");