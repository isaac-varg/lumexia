'use client'
import { FilledConsumerContainer } from '@/actions/accounting/consumerContainers/getAllByFillItem'
import Card from '@/components/Card'
import { usePricingPurchasedActions, usePricingPurchasedSelection } from '@/store/pricingPurchasedSlice'
import React from 'react'
import { validatePurchasedCommit } from '../../_functions/validatePurchasedCommit'

const ActionsPanel = ({
    consumerContainers
}: {
    consumerContainers: FilledConsumerContainer[]
}) => {

    const { toggleContainerParameters } = usePricingPurchasedActions()
    const { isContainerParametersPanelShown, interimConsumerContainers } = usePricingPurchasedSelection();

    // show warning that it is invalid and log if it bypassed

    const handleCommit = async () => {

        const validation = validatePurchasedCommit(consumerContainers.length, interimConsumerContainers);


    }
    return (
        <Card.Root>

            <Card.Title>Actions</Card.Title>


            <div className='grid grid-cols-2 gap-4'>

                <button className='btn btn-accent' onClick={handleCommit}>Commit</button>


                <button
                    className={`btn ${isContainerParametersPanelShown ? 'btn-active' : ''}`}
                    onClick={toggleContainerParameters}
                >
                    {`${isContainerParametersPanelShown ? 'Hide' : 'Show'} Container Parameters`}
                </button>

            </div>
        </Card.Root>
    )
}

export default ActionsPanel
