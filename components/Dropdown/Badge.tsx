import React, { useState } from 'react';
import {useFloating} from '@floating-ui/react';


type DropdownOptions = {
    label: string
    value: string
    bgColor: string
    textColor: string
}

type BadgeProps = {
    onClick: (value: string) => void;
    bgColor: string;
    textColor: string;
    label: string;
    options: DropdownOptions[]
};

const Badge = ({
    onClick,
    bgColor,
    textColor,
    label,
    options,
}: BadgeProps) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="relative">
            <div
                onClick={() => setIsActive((prev) => !prev)}
                style={{ backgroundColor: bgColor, color: textColor }}
                className="py-2 px-2 rounded-xl text-sm font-poppins font-semibold cursor-pointer"
            >
                {label}
            </div>
            <ul
                className={`${isActive ? '' : 'hidden'
                    } absolute bg-base-100 rounded-box z-[9999] w-52 p-2 shadow mt-2`}
            >
                {options.map((o) => {
                    return (
                        <li
                            style={{ backgroundColor: o.bgColor, color: o.textColor }}
                            onClick={() => onClick(o.value)}
                        >
                            {o.label}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default Badge;
