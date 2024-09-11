import VetFilterSidebar from '@/components/PetOwners/Appointments/VetFilterSidebar';

const AppointmentsLayout = ({ children }) => {
    return (
        <div className="container py-10 grid grid-cols-[2fr_7fr] gap-14">
            <VetFilterSidebar />
            <div>
                {children}
            </div>
        </div>
    );
};

export default AppointmentsLayout;