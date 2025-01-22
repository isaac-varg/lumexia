import React from 'react'
import { PoFlattenedOrderItems } from '../_functions/flattenOrderItems'
import Text from '@/components/Text'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'

type PoItemCardProps = {
    poItem: PoFlattenedOrderItems[number]
}

const PoItemCard = ({ poItem }: PoItemCardProps) => {
    return (
        <div className='card bg-violet-100 hover:bg-violet-200 hover:cursor-pointer'>
            <div className='card-body'>

                <div className='card-title'>{poItem.item.name}</div>

                <div className='flex flex-col gap-y-2'>
                    <Text.LabelDataPair label='Quantity' data={`${toFracitonalDigits.weight(poItem.quantity)} ${poItem.uomAbbreviation}`} />
                    <Text.LabelDataPair label='Price' data={`${toFracitonalDigits.curreny(poItem.pricePerUnit)}`} />
                    <Text.LabelDataPair label='Total' data={toFracitonalDigits.curreny(poItem.quantity * poItem.pricePerUnit)} />
                </div>
            </div>
        </div>
    )
}

export default PoItemCard
