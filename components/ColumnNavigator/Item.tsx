
import React from "react";

type ItemProps<T> = {
  item: T; 
  groupKey: string; 
};

const Item = <T extends object>({ item, groupKey }: ItemProps<T>) => {
  return (
    <li className="cursor-pointer px-4 py-2 rounded-md hover:bg-blue-100">
      <span className="font-medium text-gray-800">
        {groupKey}
      </span>
    </li>
  );
};

export default Item;

