import React, { useEffect, useState } from 'react';

const EditableSelectCell = ({
  getValue,
  row,
  column,
  table,
}: {
  getValue: () => any;
  row: any;
  column: any;
  table: any;
}) => {
  const initialValue = getValue();
  const tableMeta = table.options.meta;

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };



  // const handleChange = (e: any) => {
  //   setValue(e.target.value)
  // };

  const options = column.columnDef.meta?.options || [];


  const currentLabel = options.find((option: any) => option.value === value)?.label || '';

  //const currentLabel = options.find((option: {value: string, label: string}) => option.value === value) || ""
 
  if (tableMeta?.editedRows[row.id]) {
    return (
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        className='bg-cararra-100 px-2 py-1 rounded-lg'
      >
        {options.map((option: any, index: number) => (
          <option key={index} value={option.value} className='font-inter'>
            {option.label}
          </option>
        ))}</select>
    );
  }


  return (
    <span >
      {currentLabel}
    </span>
  );
};

export default EditableSelectCell;
