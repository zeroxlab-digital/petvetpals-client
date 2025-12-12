"use client";
import React, { useEffect, useRef, useState } from "react";

const InputSelector = ({ id, value, onChange, options = [], placeholder }) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredList = options.filter((item) =>
    typeof item === "string" ? item.toLowerCase().includes(inputValue.toLowerCase()) : item.fullName.toLowerCase().includes(inputValue.toLowerCase())
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
    <div className=" relative" ref={containerRef}>
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
                  setInputValue(typeof item === "string" ? item : item.fullName);
                  onChange(item);
                  setShowDropdown(false);
                }}
                className="p-3 cursor-pointer hover:bg-gray-50 duration-200"
              >
                {
                  typeof item === "string" ?
                    <h5 className="font-medium text-sm capitalize">
                      {item}
                    </h5>
                    :
                    <>
                      <h5 className="font-medium text-sm">
                        {item.fullName}{" "}
                        <span className="font-normal">
                          - {item.degrees?.[0] || "N/A"}
                        </span>
                      </h5>
                      <p className="text-xs text-gray-600">
                        {item.works_at || "N/A"}
                      </p>
                    </>
                }
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

export default InputSelector;