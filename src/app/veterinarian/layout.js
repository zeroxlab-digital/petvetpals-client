import Sidebar from '@/components/Veterinarians/Sidebar/Sidebar';

const VetLayout = ({ children }) => {
    return (
        <div className='grid grid-cols-10 gap-5 bg-gray-100 bg-opacity-50 h-screen'>
            <Sidebar />
            {children}
        </div>
    );
};

export default VetLayout;