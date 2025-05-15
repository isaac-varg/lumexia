'use client'
import Card from '@/components/Card'
import React, { useState } from 'react'
import ValidationErrorAlert from './ValidationErrorAlert'
import useDialog from '@/hooks/useDialog'
import { useRouter } from 'next/navigation'
import { ProducedValidation, validateProducedCommit } from '../../../_functions/validateProducedCommit'
import { usePricingProducedActions, usePricingProducedSelection } from '@/store/pricingProducedSlice'
import { commitProducedPricingExamination } from '../../../_functions/commitProducedPricingExamination'
import { finished } from 'stream'
import { BatchSummations } from '../_functions/getBomPricingSummations'

const ActionsPanel = ({
    examinationId,
}: {
    examinationId: string

}) => {

    const { toggleContainerParameters } = usePricingProducedActions()
    const { showDialog } = useDialog()
    const router = useRouter()
    const { isContainerParametersPanelShown, activeMbpr, interimFinishedProducts, finishedProducts, producedPricingSummations, activeBatchSize } = usePricingProducedSelection();
    const [validation, setValidaton] = useState<ProducedValidation>()


    const handleDebug = () => {
        console.log(producedPricingSummations)
    }

    // show warning that it is invalid and log if it bypassed
    const handleCommit = async () => {

        const validation = validateProducedCommit(finishedProducts.length, interimFinishedProducts);
        setValidaton(validation)

        if (!validation.allValid) {
            showDialog("producedValidationErrors")
            return;
        }

        initiateCommit()
    }

    const initiateCommit = async () => {

        if (!validation || interimFinishedProducts.length === 0 || finishedProducts.length === 0 || !activeMbpr || !activeBatchSize || !producedPricingSummations || producedPricingSummations.isError) return;

        const summations = producedPricingSummations as BatchSummations;
        const stateData = {
            interimFinishedProducts,
            finishedProducts,
            activeMbpr,
            batchSize: activeBatchSize,
            batchSummations: summations,

        }

        await commitProducedPricingExamination(examinationId, stateData, validation)

        router.back()

    }

    return (
        <Card.Root>

            <ValidationErrorAlert validation={validation} onProceed={initiateCommit} />

            <Card.Title>Actions</Card.Title>



            <div className='grid grid-cols-2 gap-4'>

                <button className='btn btn-accent' onClick={handleCommit}>Commit</button>

                <button className='btn' onClick={() => handleDebug()}>Debug bug</button>
                <button
                    className={`btn ${isContainerParametersPanelShown ? 'btn-active' : ''}`}
                    onClick={toggleContainerParameters}
                >
                    {`${isContainerParametersPanelShown ? 'Hide' : 'Show'} Container Parameters`}
                </button>

            </div>
        </Card.Root >
    )
}

export default ActionsPanel
