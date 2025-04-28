import React, { useState } from 'react';
import { useFloating, FloatingPortal } from '@floating-ui/react';


export type DropdownOptions = {
    label: string
    value: string
}

type BadgeProps = {
    onClick: (value: string) => void;
    label: string;
    options: DropdownOptions[]
};

const GeneralDropdown = ({
    onClick,
    label,
    options,
}: BadgeProps) => {
    const [isActive, setIsActive] = useState(false);

    const { refs, floatingStyles } = useFloating({});

    const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, value: string) => {
        e.stopPropagation()
        setIsActive(false)
        onClick(value)
    }

    const handleLabelClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setIsActive((prev) => !prev)
    }

    return (
        <div className='flex'>
            <div
                ref={refs.setReference}
                onClick={(e) => handleLabelClick(e)}
                className='btn'
                //className="py-2 px-2 rounded-xl text-sm font-poppins font-semibold cursor-pointer"
            >
                {label}
            </div>
            <FloatingPortal>
                <ul
                    ref={refs.setFloating} style={floatingStyles}
                    className={`${isActive ? '' : 'hidden'
                        }  bg-base-100 rounded-box w-52 p-2 shadow mt-2 flex flex-col gap-y-1`}
                >
                    {options.map((o) => {
                        return (
                            <li
                                key={o.value}
                                onClick={(e) => handleClick(e, o.value)}
                                className='font-poppins text-base px-2 py-1 rounded-xl font-medium hover:opacity-50 hover:cursor-pointer'
                            >
                                {o.label}
                            </li>
                        )
                    })}
                </ul>
            </FloatingPortal>
        </div>
    );
};

export default GeneralDropdown;
