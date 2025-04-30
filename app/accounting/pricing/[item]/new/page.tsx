import React from 'react'
import { getItem } from './_functions/getItem'
import { staticRecords } from '@/configs/staticRecords'
import PurchasedMain from './_components/purchased/PurchasedMain'
import ProducedMain from './_components/produced/ProducedMain'
import { accountingActions } from '@/actions/accounting'

interface NewPricingEntryProps {
    searchParams: {
        id: string
    }
}

const NewPricingEntry = async ({ searchParams }: NewPricingEntryProps) => {

    const item = await getItem(searchParams.id)
    const noteTypes = await accountingActions.examinations.notes.getAllNoteTypes();

    if (item.procurementType.id !== staticRecords.inventory.producedProcurementId) {
        return (
            <PurchasedMain item={item} noteTypes={noteTypes} />
        )
    }

    return (
        <div>
            {/*<ProducedMain item={item} noteTypes={noteTypes} />*/}
        </div>
    )
}

export default NewPricingEntry 
