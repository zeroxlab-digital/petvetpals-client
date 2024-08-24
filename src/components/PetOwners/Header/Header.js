import Link from "next/link";
import Navbar from "./Navbar";
import { HiMagnifyingGlass, HiOutlineShoppingCart, HiOutlineUserCircle  } from "react-icons/hi2";
import Image from "next/image";

const Header = () => {
    return (
        <header className="shadow-md py-4">
            <div className="flex items-center justify-between container">
                <div className="flex items-center gap-16">
                    <Image src="/images/petsfet-logo.png" alt="PetsFet Logo" width={100} height={100} />
                    {/* <h2 className="text-4xl font-extrabold text-primary">PetsFet</h2> */}
                    <Navbar />
                </div>
                <div className="flex items-center gap-5">
                    <button className="text-primary"><HiMagnifyingGlass className="text-xl" /></button>
                    <button className="text-primary"><HiOutlineShoppingCart className="text-xl" /></button>
                    <Link href="/signin"><button className=" w-36 text-white bg-primary duration-200 h-11 rounded-full flex items-center gap-2 justify-center font-semibold"><HiOutlineUserCircle className="text-xl" />SIGN IN</button></Link>
                </div>
            </div>
        </header>
    );
};

export default Header;