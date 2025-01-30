"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";

export type TagSelectOptions = {
    value: string;
    label: string;
    bgColor: string;
    textColor: string
}

type TagSelectFieldProps = {
    form: UseFormReturn<any>;
    label: string;
    fieldName: string;
    options: TagSelectOptions[];
    gridColumns?: keyof typeof classes.gridColumns
};

const classes = {
    gridColumns: {
        5: 'grid-cols-5',
    }
}

const TagSelectField = ({ form, label, fieldName, options, gridColumns = 5 }: TagSelectFieldProps) => {
    const { register, setValue, watch } = form;
    const selectedValue = watch(fieldName);

    return (
        <div className="flex flex-col gap-y-1">
            <label className="font-poppins text-cutty-sark-900 text-xl">{label}</label>

            <div className={`grid ${classes.gridColumns[gridColumns]} gap-4`}>

                {options.map((option) => {
                    const isSelected = selectedValue === option.value;

                    return (
                        <div
                            key={option.value}
                            className={`${isSelected ? 'p-2 border-2 border-dashed border-lilac-400 rounded-xl' : 'p-2 border-2 border-white'}`}>
                            <div
                                onClick={() => setValue(fieldName, option.value, {shouldValidate: true})}
                                style={{ backgroundColor: option.bgColor, color: option.textColor }}
                                className={`font-poppins font-medium text-sm rounded-xl py-2 px-4 `}
                            >
                                <h3 className='font-poppins font-medium text-sm'>{option.label}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>


        </div>
    );
};

export default TagSelectField;
