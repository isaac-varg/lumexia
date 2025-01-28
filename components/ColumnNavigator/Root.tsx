// is is used in a component like
// <Root data={requests} columns={[{ title: 'xx', groupByProperty: 'requestedItemName' }, { title: 'yy', groupByProperty: 'statusName' }]} />


import React from "react";
import Column from "./Column";
import { groupByProperty } from "@/utils/data/groupByProperty";

export type NavigatorColumn<T> = {
  title: string;
  groupByProperty: keyof T; 
};

type ColumnNavigatorProps<T> = {
  data: T[]; 
  columns: NavigatorColumn<T>[]; 
};

const Root = <T,>({ data, columns }: ColumnNavigatorProps<T>) => {
  const columnData = columns.map((col) => {
    // Group data by the specified property
    const groupedData = groupByProperty(data, col.groupByProperty.toString());

    return {
      ...col,
      data: groupedData,
    };
  });

  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        {columnData.map((col, colIndex) => (
          <Column key={colIndex} column={col} colIndex={colIndex} />
        ))}
      </div>
    </div>
  );
};

export default Root;

