"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaCalendar, FaCartShopping, FaHouse, FaPaw, FaPills, FaRegHeart, FaRegMessage, FaUser } from 'react-icons/fa6';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import { PawPrint } from 'lucide-react';
import { useLogoutUserMutation } from '@/redux/services/userApi';

const DashboardSidebar = ({ setResponsiveToggle }) => {

    const links = [
        { title: "Dashboard", link: "/dashboard", icon: <FaHouse /> },
        { title: "Pet Profiles", link: "/dashboard/pets", icon: <FaPaw /> },
        { title: "Appointments", link: "/dashboard/appointments", icon: <FaCalendar /> },
        { title: "Messages", link: "/dashboard/messages", icon: <FaRegMessage /> },
        { title: "Symptom Checker", link: "/dashboard/symptom-checker", icon: <FaPills /> },
        { title: "Wishlist", link: "/dashboard/wishlist", icon: <FaRegHeart /> },
        { title: "Order History", link: "/dashboard/orders", icon: <FaCartShopping /> },
        { title: "User Profile", link: "/dashboard/account", icon: <FaUser /> }
    ];
    const pathname = usePathname();
    const router = useRouter();

    const notify = (message, type) => {
        toast(message, { type: type, autoClose: 1500 });
    }
    const [logoutUser] = useLogoutUserMutation();
    const handleUserLogout = async () => {
        try {
            const res = await logoutUser({});
            console.log(res);
            if (res.data?.success) {
                notify("Logout successfull!", "success");
                localStorage.clear();
                router.push("/signin");
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className=' flex flex-col  border border-r-0 bg-white p-3 rounded-md rounded-r-none sticky top-20 h-full overflow-auto '>
            {/* <h2 className="lg:hidden text-primary font-bold text-xl mb-3 border-b pb-3">User Profile</h2> */}
            <div className="flex items-center gap-2 lg:hidden text-primary mb-4 border-b pb-4">
                <PawPrint className="w-6 h-6" />
                <span className="text-[22px]  font-bold">PetVetPals</span>
            </div>
            <ul className='flex flex-col gap-1'>
                {links.map((link, index) => <Link href={link.link} key={index} onClick={() => setResponsiveToggle(false)}><li className={`${link.link === pathname && 'bg-gray-100'} hover:bg-gray-50/70 duration-150 px-3 py-3 rounded-md flex items-center gap-3`}>
                    <span>{link.icon}</span>{link.title}
                </li></Link>)}
            </ul>
            <button onClick={handleUserLogout} className="mt-auto w-full  text-left  rounded-md h-12 px-3 text-red-500  font-medium bg-red-500/5 hover:bg-red-500/10 duration-200 flex items-center gap-2 "><HiArrowRightOnRectangle className='text-xl' /> Log out</button>
        </div>
    );
};

export default DashboardSidebar;