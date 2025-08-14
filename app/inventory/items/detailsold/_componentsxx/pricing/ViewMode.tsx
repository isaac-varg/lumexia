import { ItemPricingData } from '@/actions/accounting/pricing/getItemPricingData'
import Text from '@/components/Text'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import React from 'react'

const ViewMode = ({ pricing }: { pricing: ItemPricingData }) => {


    const arrivalCost = toFracitonalDigits.curreny(pricing?.arrivalCost || 0)
    const productionUsageCost = toFracitonalDigits.curreny(pricing?.productionUsageCost || 0)
    const unforeseenDifficultiesCost = toFracitonalDigits.curreny(pricing?.unforeseenDifficultiesCost || 0)
    const upcomingPrice = toFracitonalDigits.curreny(pricing?.upcomingPrice || 0)
    const upcomingPriceActive = pricing?.isUpcomingPriceActive || false
    const upcomingPriceUom = pricing?.upcomingPriceUom.abbreviation || 'NA'
    const auxiliaryUsageCost = toFracitonalDigits.curreny(pricing?.auxiliaryUsageCost || 0)



    return (
        <div className='flex flex-col gap-y-3'>

            <Text.LabelDataPair label='Arrival Cost' data={arrivalCost} tooltip='The shipping cost to procure this from the supplier warehouse to our warehouse. This affects all consumer pricing and therefore production BOMs' />

            <Text.LabelDataPair label='Production Usage Cost' data={productionUsageCost} tooltip='Additional amount to add to the individual item bom cost due to it being difficult to stage and compound. Affects all production BOMs that use this material' />
            <Text.LabelDataPair label='Auxiliary Usage Cost' data={auxiliaryUsageCost} tooltip='Additional amount to add to the individual item cost for when it is used as an auxiliary item in a finished product. Think container, cap, label, box, etc.' />

            <Text.LabelDataPair label='Unforeseen Difficulties Cost' data={unforeseenDifficultiesCost} tooltip='Cost to reflect disasters, shortages in global supply, or general difficulties. Affects the pricing of the material and all production BOM that use it' />

            <Text.LabelDataPair label='Upcoming Price' data={upcomingPrice} tooltip='Price to use in lieu of the last purchase price. This affects all consumer pricing and relevant production BOMs' />
            <Text.LabelDataPair label='Upcoming Price UOM' data={upcomingPriceUom} tooltip='UOM for the above price.' />
            <Text.LabelDataPair label='Upcoming Price Active' data={upcomingPriceActive.toString()} tooltip='Determines if the upcoming price is used rather than the last PO price.' />
        </div>

    )
}

export default ViewMode
