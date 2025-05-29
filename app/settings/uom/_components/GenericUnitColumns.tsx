import { createColumnHelper } from "@tanstack/react-table";
import { ItemWithGenericUnits } from "../_functions/getItemsWithUnits";

const columnHelper = createColumnHelper<ItemWithGenericUnits>();



export const genericUnitsColumns = [
    columnHelper.accessor("name", {
        header: "Item Name",
    }),
    columnHelper.accessor("associatedSupplier", {
        header: "Associated Supplier",
    }),
    columnHelper.display({
        id: "hasConversion",
        cell: (row) => {
            const conversion = row.row.original.genericUnitConversion
            const hasConversion = conversion !== null
            const cellText = hasConversion ? `${conversion.conversionFactor} ${conversion.convertToUom.abbreviation} ` : 'Not Yet Set'
            return cellText
        },
        header: 'Conversion Factor'
    }),
]
