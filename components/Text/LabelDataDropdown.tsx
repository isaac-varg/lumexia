'use client'
import React, { useState } from "react";

const classes = {
    displayType: {
        default: 'font-inter',
        badge: 'badge'
    },
    badgeColor: {
        primary: 'bg-lilac-400',
        secondary: 'badge-secondary',
        success: 'badge-success',
        info: 'badge-info',
    }
};

type DropdownOptions = {
    value: string;
    label: string;
}

const LabelDataDropdown = ({
    label,
    children,
    tooltip,
    displayType = 'default',
    badgeColor = 'primary',
    onOptionClick,
    options
}: {
    label: string;
    children?: React.ReactNode;
    tooltip?: string;
    displayType?: keyof typeof classes.displayType;
    badgeColor?: keyof typeof classes.badgeColor;
    onOptionClick: (value: string) => void;
    options: DropdownOptions[],
}) => {

    const [dropdownActive, setDropdownActive] = useState(false);

    const handleClick = (value: string) => {
        onOptionClick(value)
        setDropdownActive((prev) => !prev);
    }
    return (
        <div className="flex justify-between border-b-[1px] items-center border-dotted border-b-cutty-sark-500">
            <div className="tooltip" data-tip={tooltip || label}>
                <label className="font-inter font-medium text-lg text-neutral-600">
                    {label}
                </label>
            </div>
            <div className="dropdown">
                <div tabIndex={0} onClick={() => setDropdownActive((prev) => !prev)} className={`font-semibold text-lg ${classes.displayType[displayType]} ${displayType === 'badge' ? `${classes.badgeColor[badgeColor]} rounded-lg p-4` : ''} hover:cursor-pointer`}>
                    {children}
                </div>
                {dropdownActive && (
                    <ul
                        tabIndex={0}
                        className="menu-vertical dropdown-content bg-base-100 rounded-box z-[1] w-64 p-2 shadow flex flex-col gap-2 overflow-y-auto max-h-80"
                    >
                        {options.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleClick(option.value)}
                                className="font-poppins text-lg rounded-lg hover:bg-violet-200 p-4 bg-violet-100 z-[1] hover:cursor-pointer "
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default LabelDataDropdown;

