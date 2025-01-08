import React from "react";

const LabelDataPair = ({
    label,
    data,
    children,
    tooltip,
}: {
    label?: string;
    data: string | number;
    children?: React.ReactNode;
    tooltip?: string;
}) => {
    return (
        <span className="flex justify-between border-b-[1px] border-dotted border-b-cutty-sark-500">
            <div className="tooltip" data-tip={tooltip || label}>
                <label className="font-inter font-medium text-lg text-neutral-600">
                    {label || children}
                </label>
            </div>
            <p className="font-inter ">{data}</p>
        </span>
    );
};

export default LabelDataPair;
