import Link from "next/link";
import Navbar from "./Navbar";
import { HiMagnifyingGlass, HiOutlineShoppingCart, HiOutlineUserCircle } from "react-icons/hi2";
import Image from "next/image";
import Cart from "./Cart";

const Header = () => {
    return (
        <header className="shadow-md py-4 w-full sticky top-0 overflow-auto bg-white z-10">
            <div className="flex items-center justify-between container">
                <div className="flex items-center gap-16">
                    <Link href="/"><Image src="/images/petsfet-logo.png" alt="PetsFet Logo" width={100} height={100} /></Link>
                    <Navbar />
                </div>
                <div className="flex items-center gap-7">
                    <form action="#">
                        <div className="flex gap-1 border rounded-lg border-[#58294E] ">
                            <label htmlFor="search" className="bg-primary rounded-l-lg flex items-center justify-center w-12 text-white"><HiMagnifyingGlass className="text-xl" /></label>
                            <input type="text" placeholder="Search products" id="search" className="outline-none p-2 rounded-lg" />
                        </div>
                    </form>
                    <Cart />
                    <Link href="/signin"><button className=" w-36 text-white bg-primary duration-200 h-11 rounded-full flex items-center gap-2 justify-center font-semibold"><HiOutlineUserCircle className="text-xl" />SIGN IN</button></Link>
                </div>
            </div>
        </header>
    );
};

export default Header;