'use client'
import React from 'react'
import DataTable from '@/components/DataTable'
import { Filter } from '@/types/filter'
import { toFacetFilter } from '@/utils/data/toFacetFilter'
import { useRouter } from 'next/navigation'
import { CompletedAudit } from '@/actions/inventory/auditRequests/getAllCompleted'
import { auditColumns } from './AuditsColumns'

const AuditsTable = ({ audits }: { audits: CompletedAudit[] }) => {


  const router = useRouter()

  if (!audits) { return false }


  const filters: Filter[] = [
    {
      columnName: "requester",
      filterLabel: "Requester",
      options: toFacetFilter(audits, "requestById", "requestedBy.name"),

    },
    {
      columnName: "conductee",
      filterLabel: "Conductee",
      options: toFacetFilter(audits, "inventoryAudit.conductedById", "inventoryAudit.user.name"),

    }


  ];

  const handleClick = (row: any) => {
    router.push(`/inventory/audit/completed?id=${row.original.id}`)
  }

  return (
    <div>
      <DataTable.Default
        filters={filters}
        data={audits}
        columns={auditColumns}
        onRowClick={(row) => handleClick(row)}
        tableStateName='audits'
        searchBg='elevated'
      />
    </div>
  )
}

export default AuditsTable
