"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiCalendar, HiDocumentText, HiHome, HiOutlineBuildingOffice2, HiOutlineCalendar, HiOutlineDocumentText, HiOutlineHome, HiOutlinePlus, HiOutlineShoppingCart, HiPlus, HiShoppingCart } from 'react-icons/hi2';
import { CgPill } from "react-icons/cg";
import { LuPill } from "react-icons/lu";

const Navbar = ({ setResponsiveMenu = () => { } }) => {
    const pathname = usePathname();
    const navs = [
        { title: "Home", path: "/", icon: pathname == '/' ? <HiHome /> : <HiOutlineHome /> },
        { title: "Shop", path: "/shop", icon: pathname.startsWith('/shop') ? <HiShoppingCart /> : <HiOutlineShoppingCart /> },
        { title: "Pharmacy", path: "/pharmacy", icon: pathname.startsWith('/pharmacy') ? <CgPill /> : <LuPill /> },
        { title: "Appointments", path: "/appointments", icon: pathname.startsWith('/appointments') ? <HiCalendar /> : <HiOutlineCalendar /> }
    ]
    return (
        <ul className='flex items-center lg:gap-7 max-lg:flex-col max-lg:items-start text-primary'>
            {
                navs.map((nav, index) => <li key={index} className='max-lg:w-full max-lg:border-b last:border-none' onClick={() => setResponsiveMenu(false)}>
                    <Link href={nav.path} className='flex gap-1 max-lg:gap-3 items-center max-lg:py-6'>
                        <span className='text-lg'>{nav.icon}</span>
                        <span className='text-base'>{nav.title}</span>
                    </Link>
                </li>)
            }
        </ul>
    );
};

export default Navbar;