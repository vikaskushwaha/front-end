'use client';

import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const CarDropdown = ({
    options = [],
    value,
    onChange,
    placeholder = "Select an option",
    width = "w-60",
    className = "",
    triggerClassName = "",
    disabled = false,
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={disabled}>
                <button
                    className={`w-full text-left flex items-center justify-between px-4 sm:px-6 py-3 text-gray-700 ${triggerClassName}`}
                >
                    <span className="text-sm sm:text-base">{value || placeholder}</span>
                    <IoIosArrowDown />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`${width} max-h-60 overflow-y-auto ${className}`}>
                <DropdownMenuItem onClick={() => onChange('')}>
                    {placeholder}
                </DropdownMenuItem>
                {options.map((option, index) => (
                    <DropdownMenuItem
                        key={index}
                        onClick={() => onChange(option)}
                    >
                        {option}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CarDropdown;