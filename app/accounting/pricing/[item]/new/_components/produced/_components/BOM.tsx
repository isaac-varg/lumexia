'use client'
import Card from '@/components/Card'
import DataTable from '@/components/DataTable'
import { usePricingProducedActions, usePricingProducedSelection } from '@/store/pricingProducedSlice'
import React from 'react'
import { bomColumns } from './BomColumns'
import { PricingBom } from '../_functions/getBomWithPricing'
import useDialog from '@/hooks/useDialog'
import BomItemDetailsDialog from './BomItemDetailsDialog'

const BOM = () => {

    const { bomObject } = usePricingProducedSelection()
    const { setSelectedBomItem } = usePricingProducedActions()
    const { showDialog } = useDialog()

    if (!bomObject) return null;

    const handleRowClick = (bom: PricingBom) => {


        if (!bom) return;

        setSelectedBomItem(bom);

        showDialog(`bomItem${bom.id}`)
    }

    return (
        <div className='col-span-2'>

            <BomItemDetailsDialog />
            <Card.Root>

                <Card.Title>Bill of Materials</Card.Title>

                <DataTable.Default
                    columns={bomColumns}
                    data={bomObject.bom}
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
