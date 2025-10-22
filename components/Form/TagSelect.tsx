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
  onAddNew?: () => void
};

const classes = {
  gridColumns: {
    5: 'grid-cols-5',
  }
}

const TagSelectField = ({ form, label, fieldName, options, gridColumns = 5, onAddNew = () => console.log('Clicked') }: TagSelectFieldProps) => {
  const { setValue, watch } = form;
  const selectedValue = watch(fieldName);

  return (
    <div className="flex flex-col gap-y-1">
      <label className="font-poppins text-base-content text-xl">{label}</label>

      <div className={`grid ${classes.gridColumns[gridColumns]} gap-4`}>

        <div className="p-2 border-2 border-base-100 ">
          <div onClick={onAddNew} className="font-poppins min-h-20 flex items-center justify-center font-medium text-md  rounded-xl py-2 px-4 hover:cursor-pointer border-2 border-base-300 border-dashed text-base-content">
            Add New
          </div>
        </div>
        {options.map((option) => {
          const isSelected = selectedValue === option.value;

          return (
            <div
              key={option.value}
              className={`${isSelected ? 'p-2 border-2 border-dashed border-accent rounded-xl' : 'p-2 border-2 border-base-100'}`}>
              <div
                onClick={() => setValue(fieldName, option.value, { shouldValidate: true })}
                style={{ backgroundColor: option.bgColor, color: option.textColor }}
                className={`hover:cursor-pointer flex items-center justify-center hover:opacity-85 rounded-xl py-2 px-4 min-h-20`}
              >
                <h3 className='font-poppins font-medium text-md'>{option.label}</h3>
              </div>
            </div>
          );
        })}
      </div>


    </div>
  );
};

export default TagSelectField;
