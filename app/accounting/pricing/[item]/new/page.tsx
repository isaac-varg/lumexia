import React from 'react'
import { getItem } from './_functions/getItem'
import { staticRecords } from '@/configs/staticRecords'
import PurchasedMain from './_components/purchased/PurchasedMain'
import ProducedMain from './_components/produced/ProducedMain'

interface NewPricingEntryProps {
    searchParams: {
        id: string
    }
}

const NewPricingEntry = async ({ searchParams }: NewPricingEntryProps) => {

    const item = await getItem(searchParams.id)

    if (item.procurementType.id !== staticRecords.inventory.producedProcurementId) {
        return (
            <PurchasedMain item={item} />
        )
    }

    return (
        <div>
            <ProducedMain item={item} />
        </div>
    )
}

export default NewPricingEntry 
