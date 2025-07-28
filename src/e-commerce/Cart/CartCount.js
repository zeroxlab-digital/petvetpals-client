"use client";
import { useRouter } from "next/navigation";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useSelector } from "react-redux";

const CartCount = () => {
    const cart = useSelector((state) => state.cartRedu.cart);

    const router = useRouter()
    return (
        <button type="button" onClick={() => router.push("/cart")} className="text-primary relative"><HiOutlineShoppingBag className="text-xl max-sm:text-2xl" />
            <p className={` text-xs text-white bg-primary rounded-full text-center leading-4 w-4 h-4 absolute -top-2 -right-2`}>{cart.length}</p>
        </button>
    );
};

export default CartCount;