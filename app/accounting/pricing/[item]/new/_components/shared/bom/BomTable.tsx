'use client'
import DataTable from "@/components/DataTable"
import { usePricingProducedSelection } from "@/store/pricingProducedSlice"
import { BatchSummations } from "../../../_actions/getBomPricingSummations"
import { bomColumns } from "./BomColumns"

const BomTable = () => {
  const { pricingData } = usePricingProducedSelection()

  const summations = pricingData?.isError ? null : pricingData as BatchSummations

  if (!summations) return null

  const sortedBom = [...summations.bomWithCost].sort((a, b) => {
    return a.identifier.localeCompare(b.identifier, undefined, { numeric: true })
  })

  return (
    <DataTable.Default
      data={sortedBom}
      columns={bomColumns}
      onRowClick={() => {}}
      tableStateName="pricingBom"
      disableFilters
      initialSortBy={[{ id: "identifier", desc: false }]}
    />
  )
}

export default BomTable
