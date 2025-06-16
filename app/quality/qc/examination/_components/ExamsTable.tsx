"use client"

import { qualityActions } from "@/actions/quality"
import { QcExamination } from "@/actions/quality/qc/records/getAll"
import DataTable from "@/components/DataTable"
import { examColumns } from "./Columns"
import { Filter } from "@/types/filter"
import { toFacetFilter } from "@/utils/data/toFacetFilter"

const ExamsTable = ({ exams }: { exams: QcExamination[] }) => {

    const filters: Filter[] = [
        {
            columnName: "item",
            filterLabel: "Item",
            options: toFacetFilter(exams, "examinedLot.item.id", "examinedLot.item.name"),
        },
        {
            columnName: "status",
            filterLabel: "Status",
            options: toFacetFilter(exams, "status.id", "status.name"),
        },
        {
            columnName: "type",
            filterLabel: "Type",
            options: toFacetFilter(exams, "examinationType.id", "examinationType.name"),
        },
    ];
    const handleClick = (row: QcExamination) => {
        console.log(row)
    }


    return (
        <div>
            <DataTable.Default
                data={exams}
                columns={examColumns}
                onRowClick={(row) => handleClick(row.original)}
                filters={filters}
                tableStateName="qcExaminations"
            />

        </div>
    )
}

export default ExamsTable
