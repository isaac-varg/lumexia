import { QcParameterGroup } from "@/actions/quality/qc/groups/getAll";
import { QcTemplate } from "@/actions/quality/qc/templates/getAll";
import { createColumnHelper } from "@tanstack/react-table";


const columnHelper = createColumnHelper<QcParameterGroup>();



export const groupColumns = [
    columnHelper.accessor("name", {
        header: "Parameter Name",
    }),
    columnHelper.accessor("abbreviation", {
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
