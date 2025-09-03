
import React from "react";
import { NavigatorColumn } from "./Root";
import Item from "./Item";

type ColumnProps<T> = {
    column: NavigatorColumn<T> & { data: Record<string, T[]> };
    colIndex: number;
};

const Column = <T extends object>({
    column,
    colIndex,
}: ColumnProps<T>) => {
    const items = Object.entries(column.data); 

    console.log('itttt', items)

    return (
        <div
            className={`relative p-6 bg-gray-100 border-r border-gray-300 shadow-lg overflow-y-auto min-w-[16rem] max-w-[20rem] h-full transition-transform ${colIndex > 0 ? `-ml-20 z-${colIndex * 20}` : ""
                }`}
        >
            <span className="text-xl font-semibold">{column.title}</span>
            <div className="divider h-[2px]" />

            <ul className="p-4 space-y-2">
                {items.map(([groupKey, groupItems], groupIndex) =>
                    groupItems.map((item, itemIndex) => (
                        <Item
                            key={`${groupKey}-${itemIndex}`} // Unique key
                            item={item}
                            groupKey={groupKey}
                        />
                    ))
                )}            </ul>
        </div>
    );
};

export default Column;

