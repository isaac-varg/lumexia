'use client'
import Card from '@/components/Card'
import { StateForCommit, usePricingProducedActions, usePricingProducedSelection } from '@/store/pricingProducedSlice'
import React, { useState } from 'react'
import { ProducedValidation, validateProducedCommit } from '../../../_functions/validateProducedCommit'
import useDialog from '@/hooks/useDialog'
import { useRouter } from 'next/navigation'
import ValidationErrorAlert from './ValidationErrorAlert'
import { commitProducedPricingExamination } from '../../../_functions/commitProducedPricingExamination'

type PanelProps = {
    examinationId: string
    examinatedItemId: string
}

const ActionsPanel = ({
    examinationId,
    examinatedItemId,
}: PanelProps) => {

    const { isContainerParametersPanelShown, producedPricingSummations } = usePricingProducedSelection();
    const { toggleContainerParameters } = usePricingProducedActions();
    //const { showDialog } = useDialog()
    // const pricingState = usePricingProducedSelection()
    //const [validation, setValidaton] = useState<ProducedValidation>()
    // const router = useRouter()


    // const handleCommit = () => {

    //     const validation = validateProducedCommit(filledConsumerContainers.length, interimConsumerContainers)
    //     setValidaton(validation)

    //     if (!validation.allValid) {
    //         showDialog("producedValidationErrors")
    //         return;
    //     }

    //     initiateCommit()
    // }

    // const initiateCommit = async () => {

    //     if (!validation) return;

    //     const serializedPricingState: StateForCommit = {
    //         bomObject: pricingState.bomObject,
    //         activeMbpr: pricingState.activeMbpr,
    //         activeBatchSize: pricingState.activeBatchSize,
    //         filledConsumerContainers: pricingState.filledConsumerContainers,
    //         interimConsumerContainers: pricingState.interimConsumerContainers,
    //     }

    //     await commitProducedPricingExamination(examinationId, examinatedItemId, validation, serializedPricingState)

    //     console.log('49')
    //     router.back()

    // }


    return (
        <Card.Root>
            {/*<ValidationErrorAlert validation={validation} onProceed={initiateCommit} /> */}

            <Card.Title>Actions</Card.Title>
            <button className={`btn ${isContainerParametersPanelShown ? 'btn-accent' : ''}`} onClick={() => toggleContainerParameters()}>
                {`${isContainerParametersPanelShown ? 'Hide' : 'Show'} Container Parameters`}
            </button>

            <button className='btn btn-square' onClick={() => console.log(producedPricingSummations)}>show me homie</button>
            {/*<button className='btn btn-success' onClick={() => handleCommit()}>Commit</button> */}
        </Card.Root>

    )
}

export default ActionsPanel
