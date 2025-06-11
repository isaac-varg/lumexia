import React from "react";

const classes = {
    displayType: {
        default: 'font-inter',
        badge: 'badge'
    },
    badgeColor: {
        primary: 'badge-primary',
        secondary: 'badge-secondary',
        success: 'badge-success',
        info: 'badge-info',
    }
};

const LabelDataPair = ({
    label,
    data,
    children,
    tooltip,
    displayType = 'default',
    badgeColor = 'primary',
    onClick,
}: {
    label?: string;
    data: string | number;
    children?: React.ReactNode;
    tooltip?: string;
    displayType?: keyof typeof classes.displayType;
    badgeColor?: keyof typeof classes.badgeColor;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}) => {

    const containerClasses = `
        flex justify-between border-b-[1px] items-center 
        border-dotted border-b-cutty-sark-500 
        rounded-tr-xl rounded-tl-xl py-1 px-2
        ${onClick ? 'hover:cursor-pointer hover:bg-lilac-200' : ''}
    `;

    return (
        <div className={containerClasses} onClick={onClick}>
            <div className="tooltip" data-tip={tooltip || label}>
                <label className={`font-inter font-medium text-lg text-neutral-600 ${onClick ? 'hover:cursor-pointer' : ''}`}>
                    {label || children}
                </label>
            </div>
            <div className={`${classes.displayType[displayType]} ${displayType === 'badge' ? `${classes.badgeColor[badgeColor]} badge-lg` : ''}`}>
                {data || children}
            </div>
        </div >
    );
};

export default LabelDataPair;

