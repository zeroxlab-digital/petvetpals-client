"use client";
import Link from "next/link";
import Navbar from "./Navbar";
import { HiBars3CenterLeft, HiMagnifyingGlass, HiOutlineUser, HiOutlineUserCircle, HiOutlineUserPlus, HiXMark } from "react-icons/hi2";
import CartCount from "./CartCount";
import { useEffect, useState } from "react";
import Search from "./Search";
import { useSelector } from "react-redux";

const Header = () => {

    const { authUser } = useSelector((state) => state.userRedu);
    console.log(authUser)

    const [responsiveMenu, setResponsiveMenu] = useState(false)
    // Disable scroll on body when the menu is open
    useEffect(() => {
        if (responsiveMenu) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => document.body.classList.remove("overflow-hidden");
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
                                <h2 className="text-primary font-bold text-2xl">PetVetPals</h2>
                                <button
                                    onClick={() => setResponsiveMenu(false)}
                                    className="lg:hidden"
                                >
                                    <HiXMark className="text-2xl text-primary" />
                                </button>
                            </div>
                            <Navbar setResponsiveMenu={setResponsiveMenu} />
                            <div className="flex items-center gap-5 justify-center mt-auto mb-24">
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
                        <h2 className="text-primary font-bold text-2xl">PetVetPals</h2>
                    </Link>
                    <div className="max-lg:hidden">
                        <Navbar />
                    </div>
                </div>
                <div className="flex items-center gap-7 max-sm:gap-6">
                    <Search />
                    <CartCount />
                    <div>
                        <div className="">
                            {authUser ?
                                <Link href="/dashboard">
                                    <button className="flex items-center gap-1 max-sm:hidden"><HiOutlineUserCircle className="text-[21px] text-primary" />My account</button>
                                    <button className="flex items-center gap-1 sm:hidden"><HiOutlineUserCircle className="text-[24px] text-primary" /></button>
                                </Link>
                                :
                                <div className="flex items-center max-sm:hidden ">
                                    <Link href="/signin"><button className=" w-28 text-primary h-11 rounded-full flex items-center gap-2 justify-center font-[500]"><HiOutlineUser className="text-xl" />Sign In</button></Link>
                                    <Link href="/signup"><button className=" w-32 border border-[#58294E] text-white bg-primary h-11 rounded-full flex items-center gap-2 justify-center font-[500]"><HiOutlineUserPlus className="text-xl" />Sign Up</button></Link>
                                </div>
                            }
                        </div>
                        <Link href="/signup"><button className={`sm:hidden ${authUser && 'hidden'}`}><HiOutlineUser className="text-xl relative top-[3px] text-primary" /></button></Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;