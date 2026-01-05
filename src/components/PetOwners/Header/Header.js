"use client";
import Link from "next/link";
import Navbar from "./Navbar";
import { HiBars3CenterLeft, HiOutlineUser, HiOutlineUserCircle, HiOutlineUserPlus, HiXMark } from "react-icons/hi2";
import { useEffect, useState } from "react";
import Search from "./Search";
import { PawPrint } from "lucide-react";
import { useUserAuthenticated } from "../../../../hooks/useUserAuthenticated";
import { usePathname } from "next/navigation";
import Image from "next/image";
import CartCount from "@/components/E-commerce/Cart/CartCount";

const Header = () => {
    const pathname = usePathname();
    const { isAuthenticated: authUser } = useUserAuthenticated();

    const [responsiveMenu, setResponsiveMenu] = useState(false)

    // Disables scroll on body when the menu is open
    useEffect(() => {
        if (responsiveMenu) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => document.body.classList.remove("overflow-hidden");
    }, [responsiveMenu]);

    return (
        <header className={`py-5 shadow-md ${!pathname.startsWith('/dashboard') ? 'sticky top-0 bg-white z-20 max-sm:py-[17px]' : 'max-sm:py-[15px]'} z-30`}>
            <div className="flex items-center justify-between app-container ">
                <div className="flex items-center gap-10 max-lg:gap-3">
                    {/* Menu Button */}
                    <button onClick={() => setResponsiveMenu(true)} className="lg:hidden">
                        <HiBars3CenterLeft className="text-[26px] text-primary" />
                    </button>

                    {/* Responsive Menu with Animation */}
                    <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-500 ease-in-out 
                    ${responsiveMenu ? "opacity-100 visible" : "opacity-0 invisible"}`}
                        onClick={() => setResponsiveMenu(false)}
                    ></div>

                    <div className={`fixed top-0 left-0 w-3/4 h-screen bg-white z-40 flex flex-col 
                    transform transition-transform duration-500 ease-in-out 
                    ${responsiveMenu ? "translate-x-0" : "-translate-x-full"}`}>

                        {/* Menu Header */}
                        <div className="flex items-center justify-between p-5 text-primary border-b border-[#672e5b]">
                            <Link href="/" className="flex items-center gap-2">
                                {/* <PawPrint className="w-7 h-7" /> */}
                                <Image src={"/images/temp-logo-pvp.jpg"} alt="logo" width={55} height={55} priority className="" />
                                <h2 className="text-2xl font-bold">PetVetPals</h2>
                            </Link>
                            <button onClick={() => setResponsiveMenu(false)}>
                                <HiXMark className="text-[26px]" />
                            </button>
                        </div>

                        {/* Navbar Links */}
                        <Navbar setResponsiveMenu={setResponsiveMenu} />

                        {/* Auth Buttons */}
                        <div className="mt-auto mb-10 px-5">
                            {!authUser ?
                                <div className="flex items-center gap-3 justify-center ">
                                    <Link href="/signin" className="w-full">
                                        <button className="w-full border border-[#58294E] text-primary h-11 rounded-full flex items-center gap-2 justify-center font-[500]">
                                            <HiOutlineUser className="text-xl" />
                                            Sign In
                                        </button>
                                    </Link>
                                    <Link href="/signup" className="w-full">
                                        <button className="w-full border border-[#58294E] text-white bg-primary h-11 rounded-full flex items-center gap-2 justify-center font-[500]">
                                            <HiOutlineUserPlus className="text-xl" />
                                            Sign Up
                                        </button>
                                    </Link>
                                </div>
                                :
                                <div>
                                    <p className="text-gray-700 text-sm">&copy; All rights reserved by - PetVetPals</p>
                                </div>
                            }
                        </div>
                    </div>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 text-primary">
                        {/* <PawPrint className="w-7 h-7 max-lg:hidden" /> */}
                        <Image src={"/images/temp-logo-pvp.jpg"} alt="logo" width={55} height={55} priority className="max-lg:hidden" />
                        <h2 className="text-2xl font-bold">PetVetPals</h2>
                    </Link>

                    {/* Desktop Navbar */}
                    <div className="max-lg:hidden">
                        <Navbar />
                    </div>
                </div>

                {/* Right Side Icons */}
                {pathname.startsWith('/dashboard') ?
                    <div className={`flex items-center gap-6`}>
                        <div className="sm:order-1 max-sm:order-3"><Search /></div>
                        <div className="sm:order-2 max-sm:order-2 relative mt-1"><CartCount /></div>
                        <button className="sm:order-3  flex items-center gap-1 text-primary max-sm:hidden">
                            <HiOutlineUserCircle className="text-[21px] " />My account
                        </button>
                    </div>
                    :
                    <div className={`flex items-center gap-6`}>
                        <Search />
                        <CartCount />
                        {authUser ? (
                            <Link href="/dashboard" >
                                <button className="flex items-center gap-1 text-primary max-sm:hidden">
                                    <HiOutlineUserCircle className="text-[21px] " />My account
                                </button>
                                <button className={`flex items-center gap-1 sm:hidden`}>
                                    <HiOutlineUserCircle className="text-2xl text-primary" />
                                </button>
                            </Link>
                        ) : (
                            <>
                                <div className="flex items-center gap-2 max-sm:hidden">
                                    <Link href="/signin">
                                        <button className="px-2 w-max text-primary h-11 rounded-full flex items-center gap-2 justify-center font-[500]">
                                            <HiOutlineUser className="text-xl" />Sign In
                                        </button>
                                    </Link>
                                    <Link href="/signup">
                                        <button className="w-32 border border-[#58294E] text-white bg-primary h-11 rounded-full flex items-center gap-2 justify-center font-[500]">
                                            <HiOutlineUserPlus className="text-xl" />Sign Up
                                        </button>
                                    </Link>
                                </div>
                                <Link href="/signup" className="sm:hidden">
                                    <button className="relative top-1">
                                        <HiOutlineUserCircle className="text-2xl " />
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                }

            </div>
        </header>
    );
};

export default Header;