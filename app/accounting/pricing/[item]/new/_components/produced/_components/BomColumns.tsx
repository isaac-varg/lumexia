import { createColumnHelper } from "@tanstack/react-table";
import { PricingBom } from "../_functions/getBomWithPricing";

const columnHelper = createColumnHelper<PricingBom>();

export const bomColumns = [
    columnHelper.accessor("identifier", {
        header: "#",
    }),
    columnHelper.accessor("item.name", {
        header: 'Material Name'
    }),
    columnHelper.accessor("concentration", {
        header: 'w/w %'
    }),
    columnHelper.accessor("itemCost", {
        header: "Item Cost",
        cell: (row) => {
            return <div className="tooltip" data-tip={`hey there`}>{row.row.original?.itemCost}</div>
        }
    })
]
