import { QcTemplate } from "@/actions/quality/qc/templates/getAll";
import { createColumnHelper } from "@tanstack/react-table";


const columnHelper = createColumnHelper<QcTemplate>();



export const templateColumns = [
    columnHelper.accessor("name", {
        header: "Parameter Name",
    }),
    columnHelper.accessor("description", {
        header: "Description"
    }),
    columnHelper.display({
        id: "parameterCount",
        cell: (row) => {
            return row.row.original.parameters.length
        },
        header: 'Parameters Count' 
    }),
]
