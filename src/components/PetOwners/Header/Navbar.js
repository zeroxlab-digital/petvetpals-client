"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiBuildingOffice2, HiCalendar, HiDocumentText, HiHome, HiOutlineBuildingOffice2, HiOutlineCalendar, HiOutlineDocumentText, HiOutlineHome, HiOutlineShoppingCart, HiShoppingCart } from 'react-icons/hi2';

const Navbar = () => {
    const pathname = usePathname();
    const navs = [
        { title: "Home", path: "/", icon: pathname == '/' ? <HiHome /> : <HiOutlineHome /> },
        { title: "Shop", path: "/shop", icon: pathname == '/shop' ? <HiShoppingCart /> : <HiOutlineShoppingCart /> },
        { title: "Appointments", path: "/appointments", icon: pathname == '/appointments' ? <HiCalendar /> : <HiOutlineCalendar /> },
        { title: "Blogs", path: "/blogs", icon: pathname == '/blogs' ? <HiDocumentText /> : <HiOutlineDocumentText /> },
        { title: "About Us", path: "/about", icon: pathname == '/about' ? <HiBuildingOffice2 /> : <HiOutlineBuildingOffice2 /> }
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