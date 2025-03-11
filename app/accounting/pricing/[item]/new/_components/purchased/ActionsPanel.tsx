'use client'
import Card from '@/components/Card'
import { usePricingPurchasedActions, usePricingPurchasedSelection } from '@/store/pricingPurchasedSlice'
import React from 'react'

const ActionsPanel = () => {

    const { toggleCalculations, toggleContainerParameters } = usePricingPurchasedActions()
    const { isCalculationsPanelShown, isContainerParametersPanelShown } = usePricingPurchasedSelection();
    return (
        <Card.Root>

            <Card.Title>Actions</Card.Title>


            <div className='grid grid-cols-2 gap-4'>

                <button className='btn btn-accent'>Commit</button>
                <button
                    className={`btn ${isCalculationsPanelShown ? 'btn-active' : ''}`}
                    onClick={toggleCalculations}
                >
                    {`${isCalculationsPanelShown ? 'Hide' : "Show"} Calculations Panel`}
                </button>

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
