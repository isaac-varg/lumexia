import React from "react";

const LabelDataPair = ({
  label,
  data,
}: {
  label: string;
  data: string | number;
}) => {
  return (
    <span className="flex justify-between border-b-[1px] border-dotted border-b-cutty-sark-100">
      <label className="font-inter font-medium text-lg text-neutral-600">
        {label}
      </label>
      <p className="font-inter ">{data}</p>
    </span>
  );
};

export default LabelDataPair;
