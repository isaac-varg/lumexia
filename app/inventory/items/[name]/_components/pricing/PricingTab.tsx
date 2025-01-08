import ActionButton from '@/components/ActionButton'
import Card from '@/components/Card'
import Text from '@/components/Text'
import React from 'react'
import { TbEdit } from 'react-icons/tb'

const PricingTab = () => {

    const handleEditPricingParameters = () => {
        // hey
    }
    return (
        <div>
            <Card.Root>
                <div className='flex justify-between'>
                    <Text.SectionTitle size='small'>Pricing Parameters</Text.SectionTitle>
                    <ActionButton color="cararra" onClick={() => handleEditPricingParameters()}>
                        <TbEdit />
                    </ActionButton>

                </div>
                <div className='flex flex-col gap-y-3'>

                    <Text.LabelDataPair label='Arrival Cost' data={0} tooltip='The shipping cost to procure this from the supplier warehouse to our warehouse. This affects all consumer pricing and therefore production BOMs' />

                    <Text.LabelDataPair label='Production Usage Cost' data={0} tooltip='Additional amount to add to the individual item bom cost due to it being difficult to stage and compound. Affects all production BOMs that use this material' />

                    <Text.LabelDataPair label='Unforeseen Difficulties Cost' data={0} tooltip='Cost to reflect disasters, shortages in global supply, or general difficulties. Affects the pricing of the material and all production BOM that use it' />

                    <Text.LabelDataPair label='Upcoming Price' data={0} tooltip='Price to use in lieu of the last purchase price. This affects all consumer pricing and relevant production BOMs'/>

                    <Text.LabelDataPair label='Upcoming Price Active' data={'false'} tooltip='Determines if the upcoming price is used rather than the last PO price.' />
                </div>

            </Card.Root>
        </div>
    )
}

export default PricingTab
