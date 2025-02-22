"use client";
import Header from '@/components/PetOwners/Header/Header';
import React, { useState } from 'react';
import DashboardSidebar from '../../components/PetOwners/Dashboard/Sidebar/Sidebar';
import { HiBars3, HiBars3BottomLeft, HiChevronDoubleRight, HiChevronRight, HiOutlineChevronDoubleRight } from 'react-icons/hi2';
import { HiX } from 'react-icons/hi';
import ProtectedPage from '@/components/Common/ProtectedPage/ProtectedPage';

const DashboardLayout = ({ children }) => {
    const [responsiveToggle, setResponsiveToggle] = useState(false);
    console.log("API BASE:", process.env.NEXT_PUBLIC_API_BASE);
    return (
        <>
            <Header />
            <div className='app-container h-[calc(100vh-5.1rem)] grid grid-cols-10 py-5 bg-gray-100 bg-opacity-50'>
                {/* Toggle Button for Mobile */}
                <div className={`lg:hidden fixed top-20 left-2 z-10 ${responsiveToggle && 'hidden'}`}>
                    <button 
                        onClick={() => setResponsiveToggle(true)}
                        className='text-primary p-1'
                    >
                        {/* {responsiveToggle ? <HiX className='w-6 h-6' /> : <HiBars3 className='w-6 h-6' />} */}
                        <HiChevronDoubleRight className='text-2xl' />
                    </button>
                </div>

                {/* Sidebar */}
                <div 
                    className={`col-span-2 max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:h-full max-lg:z-40 max-lg:transform ${
                        responsiveToggle ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'
                    } transition-transform duration-300 ease-in-out`}
                >
                    <DashboardSidebar setResponsiveToggle={setResponsiveToggle} />
                </div>

                {/* Overlay for Mobile */}
                {responsiveToggle && (
                    <div 
                        className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30'
                        onClick={() => setResponsiveToggle(false)}
                    />
                )}

                {/* Main Content */}
                <div className='col-span-8 max-lg:col-span-12 lg:p-5 lg:bg-white lg:border border-l-0 rounded-md rounded-l-none overflow-auto hide-scrollbar'>
                    {children}
                </div>
            </div>
        </>
    );
};

export default ProtectedPage(DashboardLayout);