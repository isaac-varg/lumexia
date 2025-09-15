"use client"
import { SelectOption } from "@/types/selectOption";
import React from "react";
import { UseFormReturn } from "react-hook-form";

type SelectFieldProps = {
  form: UseFormReturn<any>;
  label: string;
  fieldName: string;
  options: SelectOption[]
};

const SelectField = ({ form, label, fieldName, options }: SelectFieldProps) => {
  return (
    <div className='flex flex-col gap-y-1'>
    <label className="font-poppins text-cutty-sark-950 text-xl">{label}</label>
      <select
          className="select select-lg w-full"
        //className="px-4 py-4 border-2 border-cutt-sark-100 bg-cutt-sark-100 rounded-lg focus:outline-none focus:ring-0 font-inter font-medium focus:border-cutt-sark-500 text-xl text-cutt-sark-900 space-y-4"
        {...form.register(fieldName)}
      >
            {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    
      </select>
    </div>
  );
};

export default SelectField;
