'use client'
import React, { useState } from "react";
import Dropdown from "../Dropdown";
import { DropdownOptions } from "../Dropdown/Badge";

const LabelDataDropdown = ({
    label,
    children,
    tooltip,
    badgeColor = '',
    textColor = '',
    onOptionClick,
    currentSelectionName,
    options
}: {
    label: string;
    children?: React.ReactNode;
    tooltip?: string;
    badgeColor?: string
    textColor?: string
    currentSelectionName: string
    onOptionClick: (value: string) => void;

    options: DropdownOptions[],
}) => {


    const handleClick = (value: string) => {
        onOptionClick(value)
    }


    return (
        <div className="flex justify-between border-b-[1px] items-center border-dotted border-b-cutty-sark-500">
            <div className="tooltip" data-tip={tooltip || label}>
                <label className="font-inter font-medium text-lg text-neutral-600">
                    {label}
                </label>

            </div>
            <Dropdown.Badge
                onClick={(value) => handleClick(value)}
                label={currentSelectionName}
                options={options}
                bgColor={badgeColor}
                textColor={textColor}
            />

        </div>
    );
};

export default LabelDataDropdown;

