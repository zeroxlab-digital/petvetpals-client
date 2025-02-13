"use client";
import { useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi2";

const Quantity = () => {
    const [quantity, setQuantity] = useState(0);
    const handleQuantityIncrease = () => {
        setQuantity(quantity + 1)
    }
    const handleQuantityDecrease = () => {
        if(quantity >= 1) {
            setQuantity(quantity - 1)
        }
    }
    return (
        <div className="">
            {/* <h4 className="mb-2 font-[500]">Quantity</h4> */}
            <div className="flex items-center gap-1">
                <button onClick={handleQuantityDecrease} className="border border-gray-500 w-10 h-9 flex items-center justify-center rounded"><HiMinus /></button>
                <p className="border border-gray-500 w-16 h-9 flex items-center justify-center rounded">{quantity}</p>
                <button onClick={handleQuantityIncrease} className="border border-gray-500 w-10 h-9 flex items-center justify-center rounded"><HiPlus /></button>
            </div>
        </div>
    );
};

export default Quantity;