"use client";
import React from 'react';
import Header from '@/components/PetOwners/Header/Header';
import Sidebar from '../../components/PetOwners/Dashboard/Sidebar/Sidebar';
import { CalendarClock, Heart, Home, MessageCircle, PawPrint, ShoppingCart, Stethoscope, User } from 'lucide-react';
import ProtectedPage from '@/components/Common/ProtectedPage/ProtectedPage';
import { ToastContainer } from 'react-toastify';
import BottomNavigation from '@/components/Common/BottomNavigation/BottomNavigation';

// export const metadata = {
//     title: "PetVetPals Dashboard – AI Pet Health & Care Management",
//     description: "Manage your pets' health effortlessly with PetVetPals Dashboard. Track medications, monitor symptoms, get AI-powered recommendations, and access virtual vet support anytime."
// }

const DashboardLayout = ({ children }) => {
    const links = [
        { title: "Dashboard", link: "/dashboard", icon: <Home size={20} /> },
        { title: "Pet Profiles", link: "/dashboard/pets", icon: <PawPrint size={20} /> },
        { title: "Vet GPT", link: "/dashboard/vet-gpt", icon: <Stethoscope size={20} /> },
        { title: "Appointments", link: "/dashboard/appointments", icon: <CalendarClock size={20} /> },
        { title: "Messages", link: "/dashboard/messages", icon: <MessageCircle size={20} /> },
        { title: "Wishlist", link: "/dashboard/wishlist", icon: <Heart size={20} /> },
        { title: "Order History", link: "/dashboard/orders", icon: <ShoppingCart size={20} /> },
        { title: "User Profile", link: "/dashboard/account", icon: <User size={20} /> }
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

export default ProtectedPage(DashboardLayout, "user");