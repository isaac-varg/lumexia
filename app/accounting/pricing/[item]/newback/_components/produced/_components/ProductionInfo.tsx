'use client'
import Card from '@/components/Card'
import Text from '@/components/Text'
import { usePricingProducedSelection } from '@/store/pricingProducedSlice'
import React from 'react'

const ProductionInfo = () => {

    const { activeMbpr, activeBatchSize } = usePricingProducedSelection()

    if (!activeMbpr || !activeBatchSize) {
        return (
            <Card.Root>
                <Card.Title>Production</Card.Title>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </Card.Root>
        )
    }


    return (
        <div className='col-span-2'>
            <Card.Root>
                <Card.Title>Production</Card.Title>

                <Text.LabelDataPair label='MBPR' data={activeMbpr?.versionLabel || ''} />
                <Text.LabelDataPair label='Batch Size' data={`${activeBatchSize?.quantity || 0} lbs`} />
                <Text.LabelDataPair label='Production Vessel' data={activeBatchSize?.batchSizeCompoundingVessels[0]?.compoundingVessel.equipment.name || 'Something Wrong'} />
                <Text.LabelDataPair label='Tank Time' data={`${activeBatchSize?.batchSizeCompoundingVessels[0]?.tankTime || 0} hours `} />

            </Card.Root>
        </div>
    )
}

export default ProductionInfo
