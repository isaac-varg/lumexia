'use client'
import Card from '@/components/Card'
import DataTable from '@/components/DataTable'
import { usePricingProducedActions, usePricingProducedSelection } from '@/store/pricingProducedSliceback'
import React from 'react'
import { bomColumns } from './BomColumns'
import useDialog from '@/hooks/useDialog'
import BomItemDetailsDialog from './BomItemDetailsDialog'
import { BatchSummations } from '../_functions/getBomPricingSummations'

const BOM = () => {


  const { showDialog } = useDialog()

  const { producedPricingSummations } = usePricingProducedSelection()
  const { setSelectedBomRow } = usePricingProducedActions()

  if (!producedPricingSummations || producedPricingSummations.isError) {
    return (

      <div className='col-span-2'>
        <Card.Root>

          <Card.Title>Bill of Materials</Card.Title>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </Card.Root>
      </div>

    )
  }

  const summations = producedPricingSummations as BatchSummations

  const handleRowClick = (row: BatchSummations['bomWithCost'][number]) => {
    setSelectedBomRow(row);
    showDialog(`bomItem${row.id}`)
  }


  return (
    <div className='col-span-2'>

      <BomItemDetailsDialog />
      <Card.Root>

        <Card.Title>Bill of Materials</Card.Title>


        <DataTable.Default
          columns={bomColumns}
          data={summations.bomWithCost}
          onRowClick={(row) => handleRowClick(row.original)}
          tableStateName='pricingBom'
          disableFilters
          disablePagination
        />

      </Card.Root>

    </div>
  )
}

export default BOM
