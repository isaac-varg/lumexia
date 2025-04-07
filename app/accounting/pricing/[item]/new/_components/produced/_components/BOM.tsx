'use client'
import Card from '@/components/Card'
import DataTable from '@/components/DataTable'
import { usePricingProducedSelection } from '@/store/pricingProducedSlice'
import React from 'react'
import { bomColumns } from './BomColumns'

const BOM = () => {

    const { bomObject } = usePricingProducedSelection()

    if (!bomObject) return null;

    return (
        <div className='col-span-2'>
            <Card.Root>


                <Card.Title>Bill of Materials</Card.Title>

                <DataTable.Default
                    columns={bomColumns}
                    data={bomObject.bom}
                    onRowClick={(row) => console.log(row)}
                    tableStateName='pricingBom'
                    disableFilters
                    disablePagination
                />

            </Card.Root>

        </div>
    )
}

export default BOM
