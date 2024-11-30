"use client";
import Link from "next/link";
import Navbar from "./Navbar";
import { HiBars3CenterLeft, HiMagnifyingGlass, HiOutlineUser, HiOutlineUserPlus, HiXMark } from "react-icons/hi2";
import Image from "next/image";
import CartCount from "./CartCount";
import PetsoliLogo1 from '../../../../public/images/petsoli-1.png'
import PetsoliLogo22 from '../../../../public/images/petsoli-22.png'
import PetsoliLogo33 from '../../../../public/images/petsoli-33.png'
import { useEffect, useState } from "react";

const Header = () => {
    const [responsiveMenu, setResponsiveMenu] = useState(false)
    // Disable scroll on body when the menu is open
    useEffect(() => {
        if (responsiveMenu) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => document.body.classList.remove("overflow-hidden"); // Cleanup on unmount
    }, [responsiveMenu]);
    return (
        <header className="shadow-md py-5 sticky top-0  bg-white z-10 xl:px-20 px-3">
            <div className="flex items-center justify-between container mx-auto">
                <div className="flex items-center gap-16 max-lg:gap-3">
                    {responsiveMenu ? <button onClick={() => setResponsiveMenu(false)} className="lg:hidden"><HiXMark className="text-2xl text-primary" /></button> : <button onClick={() => setResponsiveMenu(true)} className="lg:hidden"><HiBars3CenterLeft className="text-2xl text-primary" /></button>}
                    {responsiveMenu &&
                        <div
                            className={`lg:hidden bg-white absolute top-0 left-0 z-10 w-full h-screen px-3 py-4 flex flex-col`}
                        >
                            <div className="flex items-center justify-between mb-5 border-b pb-5">
                                <h2 className="text-primary font-bold text-2xl">Petsoli</h2>
                                <button
                                    onClick={() => setResponsiveMenu(false)}
                                    className="lg:hidden"
                                >
                                    <HiXMark className="text-2xl text-primary" />
                                </button>
                            </div>
                            <Navbar setResponsiveMenu={setResponsiveMenu} />
                            <div className="flex items-center gap-5 justify-center mt-auto">
                                <Link href="/signin">
                                    <button className="w-40 border border-[#58294E] text-primary h-11 rounded-full flex items-center gap-2 justify-center font-[500]">
                                        <HiOutlineUser className="text-xl" />
                                        Sign In
                                    </button>
                                </Link>
                                <Link href="/signup">
                                    <button className="w-40 border border-[#58294E] text-white bg-primary h-11 rounded-full flex items-center gap-2 justify-center font-[500]">
                                        <HiOutlineUserPlus className="text-xl" />
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        </div>

                    }
                    <Link href="/">
                        {/* <Image src={PetsoliLogo22} alt="Petsoli Logo" className="max-w-32" /> */}
                        <h2 className="text-primary font-bold text-2xl">Petsoli</h2>
                    </Link>
                    <div className="max-lg:hidden">
                        <Navbar />
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <form action="#" className="">
                        <div className="flex gap-1 border rounded border-[#58294E] max-2xl:hidden">
                            <input type="text" placeholder="Search products" id="search" className="font-light w-72 outline-none p-2 rounded-lg " />
                            <label htmlFor="search" className=" cursor-pointer  flex items-center justify-center w-12 text-primary border-l border-[#58294E]"><HiMagnifyingGlass className="text-xl" /></label>
                        </div>
                        <div className="2xl:hidden">
                            <HiMagnifyingGlass className="text-xl text-primary" />
                        </div>
                    </form>
                    <CartCount />
                    <div className="flex items-center ">
                        <Link href="/signin"><button className="max-sm:hidden w-28 text-primary h-11 rounded-full flex items-center gap-2 justify-center font-[500]"><HiOutlineUser className="text-xl" />Sign In</button></Link>
                        <Link href="/signup"><button className="max-sm:hidden w-32 border border-[#58294E] text-white bg-primary h-11 rounded-full flex items-center gap-2 justify-center font-[500]"><HiOutlineUserPlus className="text-xl" />Sign Up</button></Link>
                        <Link href="/signup"><button className="sm:hidden"><HiOutlineUser className="text-xl text-primary" /></button></Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;