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
        <div className="mt-10">
            <h4 className="mb-2">Quantity</h4>
            <div className="flex items-center justify-between gap-2 border border-[#58294e] rounded-md w-24 p-2">
                <button onClick={handleQuantityDecrease}><HiMinus /></button>
                <p>{quantity}</p>
                <button onClick={handleQuantityIncrease}><HiPlus /></button>
            </div>
        </div>
    );
};

export default Quantity;