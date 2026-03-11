"use client"

import { QcExamination } from "@/actions/quality/qc/records/getAll"
import DataTable from "@/components/DataTable"
import { examColumns } from "./Columns"
import { Filter } from "@/types/filter"
import { toFacetFilter } from "@/utils/data/toFacetFilter"
import { useRouter } from "next/navigation"
import { qcRecordStatuses } from "@/configs/staticRecords/qcRecordStatuses"

const ExamsTable = ({ exams }: { exams: QcExamination[] }) => {

  const router = useRouter()

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
    const isOpen = row.status.id === qcRecordStatuses.open

    if (isOpen) {
      const path = `/quality/qc/examination/new/${row.examinedLot.lotNumber}?lotId=${row.examinedLot.id}&examinationId=${row.id}`
      router.push(path)
    } else {
      router.push(`/quality/qc/examination/${row.id}`)
    }
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
