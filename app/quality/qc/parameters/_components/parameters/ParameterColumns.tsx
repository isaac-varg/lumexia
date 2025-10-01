import { QcParameter } from "@/actions/quality/qc/parameters/getAll";
import { createColumnHelper } from "@tanstack/react-table";


const columnHelper = createColumnHelper<QcParameter>();



export const parameterColumns = [
    columnHelper.accessor("name", {
        header: "Parameter Name",
    }),

    columnHelper.accessor('isWetParameter', {
        id: 'isWetParameter',
        header: 'Is Wet Parameter',
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),
    columnHelper.accessor("description", {
        header: "Description"
    }),
    columnHelper.accessor("uom", {
        header: "UOM",
        cell: (row) => {
            return row.row.original.uom
        }
    }),
    columnHelper.display({
        id: "hasInputDef",
        cell: (row) => {
            const hasData = Object.keys(row.row.original.inputDefinitions || {}).length !== 0;
            return hasData.toString();
        },
        header: 'Has Input Definition'
    }),
]
