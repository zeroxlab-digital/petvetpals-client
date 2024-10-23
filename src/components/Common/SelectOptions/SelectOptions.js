import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

const SelectOptions = ({options}) => {
    const [selectedOption, setSelectedOption] = useState('Select a option');
    const [selected, setSelected] = useState(false);
    const handleSelectOption = (option) => {
        setSelectedOption(option);
        setSelected(false);
    }
    return (
        <ul>
            <li onClick={() => setSelected(!selected)} className="cursor-pointer text-gray-800 font-light border border-gray-300 p-2  rounded outline-[#5d3855a3] flex justify-between items-center">{selectedOption} {selected ? <HiChevronUp /> : <HiChevronDown />}</li>
            <div className={`${selected || 'hidden'} bg-white p-2 rounded shadow-md `}>
                {options.map((option, index) => <li key={index} onClick={() => handleSelectOption(option)} className={`py-2 cursor-pointer px-2 hover:bg-gray-100 duration-100 rounded`}>{option}</li>)}
            </div>
        </ul>
    );
};

export default SelectOptions;