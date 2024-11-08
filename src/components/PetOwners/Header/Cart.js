import { HiOutlineShoppingBag, HiOutlineShoppingCart } from "react-icons/hi2";

const Cart = () => {
    let cartItems = 10;
    return (
        <button className="text-primary relative"><HiOutlineShoppingBag className="text-xl" />
            <p className="text-xs text-white bg-primary rounded-full text-center leading-5 w-5 h-5 absolute -top-3 -right-3">{cartItems}</p>
        </button>
    );
};

export default Cart;