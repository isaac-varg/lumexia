import { createColumnHelper } from "@tanstack/react-table";
import { PricingTemplate } from "@/actions/accounting/finishedProducts/templates/getAll";

const columnHelper = createColumnHelper<PricingTemplate>();



export const pricingTemplateColumns = [
    columnHelper.accessor("name", {
        header: "Template Name",
    }),
    columnHelper.accessor("description", {
        header: "Description",
    }),
    columnHelper.accessor('forItemTypeId', {
        header: "For Item Type",
        cell: (row) => row.row.original.forItemType?.name || 'All',
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),
    columnHelper.display({
        id: 'countFinishedProducts',
        cell: (row) => {
            const count = row.row.original.finishedProducts.length
            return (
                count
            )
        }
    }),

]
