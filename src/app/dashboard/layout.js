import DashboardSidebar from '@/components/PetOwners/DashboardSidebar/DashboardSidebar';
import Header from '@/components/PetOwners/Header/Header';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className='grid grid-cols-10 gap-5 px-20 py-7 bg-gray-100 bg-opacity-50 h-screen'>
                <DashboardSidebar />
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;