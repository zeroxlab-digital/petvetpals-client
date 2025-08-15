import { useState } from "react";
import { X } from "lucide-react";
// Custom utility function to conditionally join class names
const cn = (...classes) => {
    return classes.filter(Boolean).join(" ")
}
// Input component
const Input = ({ className, ...props }) => {
    return (
        <input
            className={cn(
                "flex h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-300 disabled:cursor-not-allowed disabled:opacity-50",
                className,
            )}
            {...props}
        />
    )
}


export default function TagInput({ label, placeholder, value, onChange }) {
  const [inputValue, setInputValue] = useState("");

  const addTag = (tag) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === "," || e.key === " " || e.key === "Enter") && inputValue.trim() !== "") {
      e.preventDefault();
      addTag(inputValue);
      setInputValue("");
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    pasted
      .split(/[, ]+/) // split by comma or space
      .map((tag) => tag.trim())
      .filter((tag) => tag)
      .forEach((tag) => addTag(tag));
    setInputValue("");
  };

  const removeTag = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-red-500"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>

      {/* Input */}
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
      />
    </div>
  );
}
