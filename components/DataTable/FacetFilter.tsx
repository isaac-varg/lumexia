import React from "react";
import { Column } from "@tanstack/react-table";
import * as Popover from "@radix-ui/react-popover";
import * as Separator from "@radix-ui/react-separator";

import { RxCheck, RxPlus } from "react-icons/rx";
import { FacetOptions } from "@/types/facetOption";

interface DataTableFacetedFilter<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: FacetOptions[];
}

export default function FacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilter<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="flex items-center text-normal font-poppins font-medium px-2 py-2 border-2 border-dotted border-limed-spruce-200 rounded-lg">
          <RxPlus className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator.Root className="bg-limed-spruce-900 mx-2 w-[1px] h-6" orientation="vertical" />
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <span className="rounded-sm px-1 font-normal">
                    {selectedValues.size} selected
                  </span>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <span
                        key={option.value}
                        className=" bg-limed-spruce-100 px-2 font-normal rounded-lg"
                      >
                        {option.label}
                      </span>
                    ))
                )}
              </div>
            </>
          )}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade">
          <div className="flex flex-col ">
            {options.map((option) => {
              const isSelected = selectedValues.has(option.value);
              return (
                <button
                    // className="flex items-center justify-between py-2 px-3 w-full rounded-sm hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none"
                  key={option.value}
                  onClick={() => {
                    if (isSelected) {
                      selectedValues.delete(option.value);
                    } else {
                      selectedValues.add(option.value);
                    }
                    const filterValues = Array.from(selectedValues);
                    column?.setFilterValue(
                      filterValues.length ? filterValues : undefined
                    );
                  }}
                >
                  <div className="flex flex-row items-center ">
                    <div
                      className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-neutral-800" ${
                        isSelected
                          ? "bg-bay-leaf-400 text-bay-leaf-950"
                          : "opacity-50 [&_svg]:invisible"
                      }`}
                    >
                      <RxCheck />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-inter text-lg">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <Popover.Close />
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

