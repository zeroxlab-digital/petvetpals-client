import { HiOutlineShoppingCart } from "react-icons/hi2";

const Cart = () => {
    let cartItems = 0;
    return (
        <button className="text-primary relative"><HiOutlineShoppingCart className="text-[26px]" />
            <p className="text-xs text-white bg-primary rounded-full text-center leading-5 w-5 h-5 absolute -top-2 -right-2">{cartItems}</p>
        </button>
    );
};

export default Cart;