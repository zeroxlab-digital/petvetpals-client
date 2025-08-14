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

export default function AllergiesInput({ formData, updateFormData }) {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e) => {
        // If pressed comma or space
        if ((e.key === "," || e.key === " ") && inputValue.trim() !== "") {
            e.preventDefault();

            const newAllergy = inputValue.trim();
            if (!formData?.allergies?.includes(newAllergy)) {
                updateFormData("allergies", [...formData?.allergies, newAllergy]);
            }
            setInputValue("");
        }

        // Optional: Handle Enter key
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();

            const newAllergy = inputValue.trim();
            if (!formData?.allergies?.includes(newAllergy)) {
                updateFormData("allergies", [...formData?.allergies, newAllergy]);
            }
            setInputValue("");
        }
    };

    const removeAllergy = (allergyToRemove) => {
        updateFormData(
            "allergies",
            formData?.allergies?.filter((a) => a !== allergyToRemove)
        );
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Known Allergies
            </label>

            {/* Allergy tags */}
            <div className="flex flex-wrap gap-2 mb-2">
                {formData?.allergies?.length > 0 &&
                    formData?.allergies?.map((allergy, idx) => (
                        <span
                            key={idx}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                        >
                            {allergy}
                            <button
                                type="button"
                                onClick={() => removeAllergy(allergy)}
                                className="hover:text-red-500"
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
            </div>

            {/* Input for new allergies */}
            <Input
                placeholder="Type allergy and press comma or space"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}