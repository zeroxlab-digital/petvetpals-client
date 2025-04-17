"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCalendar, FaCartShopping, FaDollarSign, FaHouse, FaPaw, FaPills, FaRegHeart, FaRegMessage, FaShield, FaUser } from 'react-icons/fa6';
import { HiArrowRightStartOnRectangle } from 'react-icons/hi2';

const Sidebar = () => {
    const links = [
        { title: "Dashboard", link: "/veterinarian", icon: <FaHouse /> },
        {
            title: "Appointments",
            link: "/veterinarian/appointments",
            icon: <FaCalendar />
        },
        {
            title: "Messages",
            link: "/veterinarian/messages",
            icon: <FaRegMessage />
        },
        {
            title: "Patient Records",
            link: "/veterinarian/patients",
            icon: <FaPaw />
        },
        {
            title: "Treatments History",
            link: "/veterinarian/treatments",
            icon: <FaPills />
        },
        {
            title: "Order Requests",
            link: "/veterinarian/orders",
            icon: <FaCartShopping />
        },
        {
            title: "Insurance Claims",
            link: "/veterinarian/insurance",
            icon: <FaShield />
        },
        {
            title: "Earnings & Payouts",
            link: "/veterinarian/earnings",
            icon: <FaDollarSign />
        },
        {
            title: "User Profile",
            link: "/veterinarian/account",
            icon: <FaUser />
        }
    ];

    const pathname = usePathname();
    
    return (
        <div className='col-span-2 bg-white border-r p-5 rounded-md flex flex-col items-start justify-between'>
            <div className='w-full'>
                <h2 className="text-primary font-extrabold text-3xl mb-3 pb-3 border-b">Petsoli</h2>
                <ul className='flex flex-col gap-1  '>
                    {links.map((link, index) => <Link href={link.link} key={index}><li className={`${link.link === pathname && 'bg-primary text-white'} hover:bg-[#8a417ad5] hover:text-white duration-150 px-3 py-3 rounded-md flex items-center gap-3`}>
                        <span>{link.icon}</span>{link.title}
                    </li></Link>)}
                </ul>
            </div>
            <button className='px-3 py-3 rounded-md flex items-center gap-2 w-full text-red-500'><HiArrowRightStartOnRectangle className='text-xl' /> Log out</button>
        </div>
    );
};

export default Sidebar;