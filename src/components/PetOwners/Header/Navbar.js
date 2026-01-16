"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiCalendar, HiDocumentText, HiHome, HiOutlineBuildingOffice2, HiOutlineCalendar, HiOutlineDocumentText, HiOutlineHome, HiOutlinePlus, HiOutlineShoppingCart, HiPlus, HiShoppingCart } from 'react-icons/hi2';
import { CgPill } from "react-icons/cg";
import { LuPill, LuStethoscope } from "react-icons/lu";
import { Stethoscope, StethoscopeIcon } from 'lucide-react';
import { FaStethoscope } from 'react-icons/fa6';

const Navbar = ({ setResponsiveMenu = () => { } }) => {
    const pathname = usePathname();
    const navs = [
        // { title: "Home", path: "/", icon: pathname == '/' ? <HiHome /> : <HiOutlineHome /> },
        // { title: "Shop", path: "/shop", icon: pathname.startsWith('/shop') ? <HiShoppingCart /> : <HiOutlineShoppingCart /> },
        { title: "Vet Appointment", path: "/vet-appointment", icon: pathname.startsWith('/vet-appointment') ? <LuStethoscope /> : <LuStethoscope /> },
        { title: "Pharmacy", path: "/pharmacy", icon: pathname.startsWith('/pharmacy') ? <CgPill /> : <LuPill /> },
    ]
    return (
        <ul className='max-lg:px-5 flex items-center lg:gap-7 max-lg:flex-col max-lg:items-start text-primary'>
            {
                navs.map((nav, index) => <li key={index} className='max-lg:w-full' onClick={() => setResponsiveMenu(false)}>
                    <Link href={nav.path} className='flex gap-2 max-lg:gap-3 items-center max-lg:py-5'>
                        <span className='text-lg'>{nav.icon}</span>
                        <span className='text-base'>{nav.title}</span>
                    </Link>
                </li>)
            }
        </ul>
    );
};

export default Navbar;