import { useState, useEffect } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

const SelectOptions = ({ options, name, default: defaultValue, placeholder, onChange }) => {
    const [selectedOption, setSelectedOption] = useState(defaultValue || placeholder || "Select option");
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (defaultValue) setSelectedOption(defaultValue);
    }, [defaultValue]);

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        setSelected(false);
        if (onChange) onChange({ target: { name, value: option } });
    };

    return (
        <div className="relative w-full">
            <div 
                onClick={() => setSelected(!selected)} 
                className="cursor-pointer text-gray-800 font-light border border-gray-300 p-2 rounded outline-[#5d3855a3] flex justify-between items-center bg-white text-sm"
            >
                {selectedOption} {selected ? <HiChevronUp /> : <HiChevronDown />}
            </div>
            {selected && (
                <div className="bg-white p-2 rounded shadow-lg absolute top-full left-0 w-full z-10 mt-1">
                    {options.map((option, index) => (
                        <div 
                            key={index} 
                            onClick={() => handleSelectOption(option)} 
                            className="py-2 cursor-pointer px-2 hover:bg-gray-50 duration-100 rounded capitalize text-sm"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectOptions;