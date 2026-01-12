import React from 'react'
import { getItem } from './_functions/getItem'
import PurchasedMain from './_components/purchased/PurchasedMain'
import ProducedMain from './_components/produced/ProducedMain'
import { accountingActions } from '@/actions/accounting'
import { procurementTypes } from '@/configs/staticRecords/procurementTypes'

interface NewPricingEntryProps {
  searchParams: {
    id: string
  }
}

const NewPricingEntry = async ({ searchParams }: NewPricingEntryProps) => {

  const item = await getItem(searchParams.id)
  const noteTypes = await accountingActions.examinations.notes.getAllNoteTypes();

  if (item.procurementType.id !== procurementTypes.produced) {
    return (
      <PurchasedMain item={item} noteTypes={noteTypes} />
    )
  }

  return (
    <div>
      <ProducedMain item={item} noteTypes={noteTypes} />
    </div>
  )
}

export default NewPricingEntry 
