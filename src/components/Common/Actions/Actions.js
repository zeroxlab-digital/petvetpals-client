import React, { useState, useRef, useEffect } from "react";
import { HiEllipsisHorizontal, HiEllipsisVertical } from "react-icons/hi2";

const Actions = ({ actions = [] }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => setOpen(!open);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md hover:bg-gray-100 hover:text-primary transition"
        aria-label="Open actions menu"
      >
        <HiEllipsisHorizontal size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg ring-1 ring-gray-200 z-10">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.onClick();
                setOpen(false); // close menu after action
              }}
              className="flex items-center gap-2 w-full text-left px-3 py-3 text-sm hover:bg-gray-100 transition font-medium text-gray-900"
            >
                {action.icon && <span className="text-lg text-primary">{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Actions;
