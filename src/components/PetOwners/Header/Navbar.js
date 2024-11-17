"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiCalendar, HiDocumentText, HiHome, HiOutlineBuildingOffice2, HiOutlineCalendar, HiOutlineDocumentText, HiOutlineHome, HiOutlinePlus, HiOutlineShoppingCart, HiPlus, HiShoppingCart } from 'react-icons/hi2';
import { CgPill } from "react-icons/cg";
import { LuPill } from "react-icons/lu";

const Navbar = () => {
    const pathname = usePathname();
    const navs = [
        { title: "Home", path: "/", icon: pathname == '/' ? <HiHome /> : <HiOutlineHome /> },
        { title: "Shop", path: "/shop", icon: pathname.startsWith('/shop') ? <HiShoppingCart /> : <HiOutlineShoppingCart /> },
        { title: "Pharmacy", path: "/pharmacy", icon: pathname.startsWith('/pharmacy') ? <CgPill /> : <LuPill /> },
        { title: "Appointments", path: "/appointments", icon: pathname.startsWith('/appointments') ? <HiCalendar /> : <HiOutlineCalendar /> }
    ]
    return (
        <ul className='flex items-center gap-8 text-primary'>
            {
                navs.map((nav, index) => <li key={index}>
                    <Link href={nav.path} className='flex gap-1 items-center'>
                        <span className='text-lg'>{nav.icon}</span>
                        <span>{nav.title}</span>
                    </Link>
                </li>)
            }
        </ul>
    );
};

export default Navbar;