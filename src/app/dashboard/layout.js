"use client";
import Header from '@/components/PetOwners/Header/Header';
import React, { useState } from 'react';
import DashboardSidebar from '../../components/PetOwners/Dashboard/Sidebar/Sidebar';
import { HiBars3, HiBars3BottomLeft, HiChevronDoubleRight, HiChevronRight, HiOutlineChevronDoubleRight } from 'react-icons/hi2';
import { HiX } from 'react-icons/hi';
import ProtectedPage from '@/components/Common/ProtectedPage/ProtectedPage';
import { ToastContainer } from 'react-toastify';
import BottomNavigation from '@/components/Common/BottomNavigation/BottomNavigation';

const DashboardLayout = ({ children }) => {
    const [responsiveToggle, setResponsiveToggle] = useState(false);
    return (
        <div className='dashboard relative'>
            <Header />
            <div className='app-container lg:h-[calc(100vh-5.1rem)] grid grid-cols-10 py-5 max-lg:pb-20'>
                {/* Toggle Button for Mobile */}
                {/* <div className={`lg:hidden fixed top-20 left-2 z-10 ${responsiveToggle && 'hidden'}`}>
                    <button 
                        onClick={() => setResponsiveToggle(true)}
                        className='text-primary p-1'
                    >
                        <HiChevronDoubleRight className='text-2xl' />
                    </button>
                </div> */}

                {/* Sidebar */}
                <div 
                    className={`col-span-2 max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:h-full max-lg:z-40 max-lg:transform ${
                        responsiveToggle ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'
                    } transition-transform duration-300 ease-in-out`}
                >
                    <DashboardSidebar setResponsiveToggle={setResponsiveToggle} />
                </div>

                {/* Overlay for Mobile */}
                {/* {responsiveToggle && (
                    <div 
                        className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30'
                        onClick={() => setResponsiveToggle(false)}
                    />
                )} */}

                {/* Bottom Nav */}
                <BottomNavigation />

                {/* Main Content */}
                <div className='col-span-8 max-lg:col-span-12 p-3 lg:p-5 bg-gray-50/40 lg:border border-l-0 rounded-md rounded-l-none sm:overflow-auto hide-scrollbar'>
                    {children}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ProtectedPage(DashboardLayout);