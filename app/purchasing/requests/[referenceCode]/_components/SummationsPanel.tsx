'use client'
import React from 'react'
import { LinkedPoAmounts } from '../_functions/getLinkedPoAmounts'
import Text from '@/components/Text'
import { LinkedBprsAmounts } from '../_functions/getLinkedBprAmounts'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'

const SummationsPanel = ({
    linkedBprsAmounts,
    linkedPosAmounts,
}: {
    linkedBprsAmounts: LinkedBprsAmounts,
    linkedPosAmounts: LinkedPoAmounts,
}) => {

    return (
        <div className='card bg-base-300'>
            <div className='card-body'>
                <div className='card-title'>Summations</div>

                <Text.LabelDataPair label='Linked BPRs' data={`${toFracitonalDigits.weight(linkedBprsAmounts.totalNeeded)} lbs`} />
                <Text.LabelDataPair label='Linked POs' data={`${toFracitonalDigits.weight(linkedPosAmounts.totalPurchased)} lbs`} />
            </div>
        </div>
    )
}

export default SummationsPanel
