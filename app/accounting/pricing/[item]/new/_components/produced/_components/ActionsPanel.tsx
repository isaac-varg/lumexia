'use client'
import Card from '@/components/Card'
import { usePricingProducedActions, usePricingProducedSelection } from '@/store/pricingProducedSlice'
import React from 'react'

const ActionsPanel = () => {

    const { isContainerParametersPanelShown } = usePricingProducedSelection();
    const { toggleContainerParameters } = usePricingProducedActions();
    return (
        <Card.Root>

            <Card.Title>Actions</Card.Title>
            <button className={`btn ${isContainerParametersPanelShown ? 'btn-accent' : ''}`} onClick={() => toggleContainerParameters()}>Show Container Parameters</button>
            <button className='btn'>Test</button>
        </Card.Root>

    )
}

export default ActionsPanel
