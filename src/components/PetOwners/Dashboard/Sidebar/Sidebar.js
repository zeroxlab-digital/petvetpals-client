"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { HiLogout } from "react-icons/hi";
import { FaCalendar, FaCartShopping, FaHouse, FaPaw, FaPills, FaRegHeart, FaRegMessage, FaUser } from 'react-icons/fa6';
import axios from 'axios';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';

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

    const handleUserLogout = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/api/user/logout`, { },  {
                withCredentials: true,
            })
            if(res.status === 200){
                localStorage.clear();
                router.push("/signin");
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className=' flex flex-col  border bg-white p-3 rounded-md rounded-r-none sticky top-20 h-full overflow-auto '>
            <h2 className="lg:hidden text-primary font-bold text-xl mb-3 border-b pb-3">User Profile</h2>
            <ul className='flex flex-col gap-1'>
                {links.map((link, index) => <Link href={link.link} key={index} onClick={() => setResponsiveToggle(false)}><li className={`${link.link === pathname && 'bg-primary text-white'} hover:bg-[#7b376ce0] hover:text-white duration-150 px-3 py-3 rounded-md flex items-center gap-3`}>
                    <span>{link.icon}</span>{link.title}
                </li></Link>)}
            </ul>
            <button onClick={handleUserLogout} className="mt-auto w-full rounded-md border border-red-500 text-left  h-12 px-3 text-red-500 flex items-center gap-2 "><HiArrowRightOnRectangle className='text-xl' /> Log out</button>
        </div>
    );
};

export default DashboardSidebar;