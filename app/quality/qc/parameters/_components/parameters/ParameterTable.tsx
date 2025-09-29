'use client'

import Card from "@/components/Card";
import DataTable from "@/components/DataTable";
import { Filter } from "@/types/filter";
import { parameterColumns } from "./ParameterColumns";
import { useRouter } from "next/navigation";
import { useQcParameterSelection } from "@/store/qcParametersSlice";

const ParameterTable = () => {

  const { parameters } = useQcParameterSelection()
  const router = useRouter()

  const filters: Filter[] = [
    {
      columnName: "isWetParameter",
      filterLabel: "Is Wet Parameter",
      options: [{ value: true, label: 'True' }, { value: false, label: 'False' }]
    },
  ];


  return (
    <Card.Root>
      <div className="flex justify-between items-center">
        <Card.Title>Parameters</Card.Title>
        <button className="btn btn-neutral btn-soft" onClick={() => router.push('/quality/qc/parameters/new')}>Add Parameter</button>
      </div>
      <DataTable.Default
        data={parameters}
        filters={filters}
        columns={parameterColumns}
        onRowClick={(row) => {
          router.push(`/quality/qc/parameters/${row.original.name}?id=${row.original.id}`)
        }}
        tableStateName='qcParameters'
      />
    </Card.Root>

  )
}

export default ParameterTable
