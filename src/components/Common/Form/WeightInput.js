"use client";
import React, { useState } from "react";
import Label from "./Label";
import Input from "./Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const WeightInput = ({ value, onChange }) => {
    const [unit, setUnit] = useState("lbs");

    // convert stored lbs > display value depending on selected unit
    const displayedValue =
        unit === "kg" ? (value / 2.20462).toFixed(1) : value.toString();

    const handleValueChange = (val) => {
        const num = parseFloat(val) || 0;

        if (unit === "kg") {
            const lbs = num * 2.20462;
            onChange(parseFloat(lbs.toFixed(2)));
        } else {
            onChange(num);
        }
    };

    const handleUnitChange = (newUnit) => {
        const currentDisplayedNum = parseFloat(displayedValue) || 0;

        setUnit(newUnit);

        if (newUnit === "lbs") {
            // convert UI kg > lbs for db
            const lbs = currentDisplayedNum * 2.20462;
            onChange(parseFloat(lbs.toFixed(2)));
        }
        // if user switches to kg, no DB update needed since value already in lbs
    };

    return (
        <div className="flex flex-col">
            <Label>Weight</Label>

            <div className="flex gap-2 relative">
                <Input
                    type="number"
                    min="0"
                    step="0.1"
                    value={displayedValue}
                    placeholder={"Pet's estimate weight"}
                    onChange={(e) => handleValueChange(e.target.value)}
                />

                <Select value={unit} onValueChange={(val) => handleUnitChange(val)}>
                    <SelectTrigger className="w-[80px] h-[33px] absolute top-1 right-1">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="lbs">lbs</SelectItem>
                        <SelectItem value="kg">kg</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default WeightInput;
