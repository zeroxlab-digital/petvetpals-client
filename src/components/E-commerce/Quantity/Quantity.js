"use client";
import { updateQuantity } from "@/redux/features/cartSlice";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { useDispatch } from "react-redux";

const Quantity = ({ item }) => {
    const dispatch = useDispatch();

    const handleQuantityIncrease = () => {
        dispatch(updateQuantity({ productId: item.product._id, quantity: item.order_quantity + 1 }));
    };

    const handleQuantityDecrease = () => {
        if (item.order_quantity > 1) {
            dispatch(updateQuantity({ productId: item.product._id, quantity: item.order_quantity - 1 }));
        }
    };

    return (
        <div>
            <div className="flex items-center gap-1">
                <button onClick={handleQuantityDecrease} className="border border-gray-500 w-10 h-9 max-sm:w-7 max-sm:h-6 flex items-center justify-center rounded">
                    <HiMinus />
                </button>
                <p className="border border-gray-500 w-16 h-9 max-sm:w-11 max-sm:h-6 flex items-center justify-center rounded">{item.order_quantity}</p>
                <button onClick={handleQuantityIncrease} className="border border-gray-500 w-10 h-9 max-sm:w-7 max-sm:h-6 flex items-center justify-center rounded">
                    <HiPlus />
                </button>
            </div>
        </div>
    );
};

export default Quantity;