"use client";
import React, { useEffect, useRef, useState } from "react";

const InputSelector = ({ id, value, onChange, options = [], placeholder }) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredList = options.filter((item) =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  );

  const containerRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [])
  return (
    <div className="my-4 relative" ref={containerRef}>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        className="border border-gray-200 px-2 py-2 rounded outline-none placeholder:font-light placeholder:text-sm w-full"
      />

      {showDropdown &&
        filteredList.length > 0 &&
        inputValue.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white rounded-lg border shadow-lg mt-2 max-h-56 overflow-auto p-2 z-10">
            {filteredList.map((item, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setInputValue(item);
                  onChange(item);
                  setShowDropdown(false);
                }}
                className="p-3 cursor-pointer hover:bg-gray-50 duration-200"
              >
                <h5 className="font-medium text-sm">{item}</h5>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

export default InputSelector;