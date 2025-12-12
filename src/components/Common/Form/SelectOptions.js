import { useState, useEffect, useRef } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

const SelectOptions = ({ options, name, default: defaultValue, placeholder, onChange }) => {
    const getLabel = (option) => typeof option === 'object' ? option.label : option;
    const getValue = (option) => typeof option === 'object' ? option.value : option;

    const [selectedOption, setSelectedOption] = useState(
        defaultValue ? getLabel(defaultValue) : placeholder || "Select option"
    );
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (defaultValue) {
            setSelectedOption(getLabel(defaultValue));
        }
    }, [defaultValue]);

    const handleSelectOption = (option) => {
        setSelectedOption(getLabel(option));
        setSelected(false);
        if (onChange) {
            onChange({
                target: {
                    name,
                    value: getValue(option)
                }
            });
        }
    };

    const containerRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setSelected(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])

    return (
        <div className="relative w-full" ref={containerRef}>
            <div
                onClick={() => setSelected(!selected)}
                className="cursor-pointer text-gray-800 font-light border border-gray-300 p-2 rounded outline-[#5d3855a3] flex justify-between items-center bg-white text-sm"
            >
                {selectedOption} {selected ? <HiChevronUp /> : <HiChevronDown />}
            </div>
            {selected && (
                <div className="max-h-52 overflow-auto bg-white p-2 rounded-lg shadow-xl border absolute top-full left-0 w-full z-10 mt-1">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelectOption(option)}
                            className="py-2 cursor-pointer px-2 hover:bg-gray-50 duration-100 rounded capitalize text-sm"
                        >
                            {getLabel(option)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectOptions;
