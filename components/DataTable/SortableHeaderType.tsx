//"use client";
//import SortableHead from "@/components/DataTable/SortableHead";
//
//
//
//export const SortableHeaderType = (title: string) => ({ column }: any) => {
//  return (
//    <div onClick={() => column.toggleSorting()}>
//      <span className="flex flex-row items-center hover:cursor-pointer space-x-2">
//        <div>{title}</div>
//        <SortableHead sorted={column.getIsSorted()} />
//      </span>
//    </div>
//  );
//};
//

"use client";
import SortableHead from "@/components/DataTable/SortableHead";

export const SortableHeaderType = (title: string) => {
  const Component = ({ column }: any) => {
    return (
      <div onClick={() => column.toggleSorting()}>
        <span className="flex flex-row items-center hover:cursor-pointer space-x-2">
          <div>{title}</div>
          <SortableHead sorted={column.getIsSorted()} />
        </span>
      </div>
    );
  };

  // Set the display name for the component
  Component.displayName = `SortableHeaderType(${title})`;

  return Component;
};

