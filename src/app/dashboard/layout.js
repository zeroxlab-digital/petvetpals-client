"use client";
import Header from '@/components/PetOwners/Header/Header';
import React from 'react';
import Sidebar from '../../components/PetOwners/Dashboard/Sidebar/Sidebar';
import { FaCalendar, FaCartShopping, FaHouse, FaPaw, FaRegHeart, FaRegMessage, FaUser } from 'react-icons/fa6';
import { Stethoscope } from 'lucide-react';
import ProtectedPage from '@/components/Common/ProtectedPage/ProtectedPage';
import { ToastContainer } from 'react-toastify';
import BottomNavigation from '@/components/Common/BottomNavigation/BottomNavigation';

const DashboardLayout = ({ children }) => {
    const links = [
        { title: "Dashboard", link: "/dashboard", icon: <FaHouse /> },
        { title: "Pet Profiles", link: "/dashboard/pets", icon: <FaPaw /> },
        { title: "Vet GPT", link: "/dashboard/vet-gpt", icon: <Stethoscope size={20} /> },
        { title: "Appointments", link: "/dashboard/appointments", icon: <FaCalendar /> },
        { title: "Messages", link: "/dashboard/messages", icon: <FaRegMessage /> },
        { title: "Wishlist", link: "/dashboard/wishlist", icon: <FaRegHeart /> },
        { title: "Order History", link: "/dashboard/orders", icon: <FaCartShopping /> },
        { title: "User Profile", link: "/dashboard/account", icon: <FaUser /> }
    ];
    return (
        <div className='dashboard relative'>
            <Header />
            <div className='app-container lg:h-[calc(100vh-5.1rem)] grid grid-cols-10 py-5 max-lg:pb-20'>
                
                {/* Sidebar for desktop */}
                <div className={`col-span-2 max-lg:hidden`}>
                    <Sidebar links={links} />
                </div>

                {/* Bottom navigatin bar for mobile devices */}
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