import Dialog from '@/components/Dialog'
import Text from '@/components/Text'
import SectionTitle from '@/components/Text/SectionTitle'
import { usePricingProducedSelection } from '@/store/pricingProducedSlice'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import React from 'react'

const BomItemDetailsDialog = () => {

    const { selectedBomItem } = usePricingProducedSelection()

    if (!selectedBomItem) return null
    return (
        <Dialog.Root identifier={`bomItem${selectedBomItem.id}`}>

            <Dialog.Title>{`# ${selectedBomItem.identifier} ${selectedBomItem.item?.name || ''}`}</Dialog.Title>

            <SectionTitle size='small'>Item Cost</SectionTitle>


            <div className='flex flex-col gap-2'>
                <Text.LabelDataPair label='Price $/lb' tooltip='The price per pound the material is purchased for. Regardless of the purchased UOM, the price is converted to dollars per pound. This price can either be from the last purchase order, or an upcoming price if the upcoming price is active.' data={toFracitonalDigits.curreny(selectedBomItem.priceConverted)} />

                <Text.LabelDataPair label='Upcoming Price or Last PO' tooltip='Whether the price above is derived from. Upcoming price is set by a purchaser when changes to upcoming prices for the material are coming.' data={selectedBomItem.isUpcomingPriceActive ? 'Upcoming Price' : 'Purchase Order'} />

                <Text.LabelDataPair label='Arrival Cost $/lb' data={toFracitonalDigits.curreny(selectedBomItem.arrivalCost)} />

                <Text.LabelDataPair label='Unforeseen Difficulties Cost $/lb' data={toFracitonalDigits.curreny(selectedBomItem.unforeseenDifficultiesCost)} />

                <Text.LabelDataPair label='Production Usage Cost $/lb' data={toFracitonalDigits.curreny(selectedBomItem.productionUsageCost)} />

                <Text.LabelDataPair label='Overall Item Cost $/lb' tooltip='This is the $/lb shown in the table and is the some of all the above' data={toFracitonalDigits.curreny(selectedBomItem.itemCostPerPound)} />

                <Text.LabelDataPair label='Overall Item Cost $/batch' tooltip='This is the item cost per pound multiplied by the amount of the material used in the batch, which is determined by multiplying the concentration by batch size.' data={toFracitonalDigits.curreny(selectedBomItem.itemCostPerBatch)}
                />

            </div>



        </Dialog.Root>
    )
}

export default BomItemDetailsDialog
