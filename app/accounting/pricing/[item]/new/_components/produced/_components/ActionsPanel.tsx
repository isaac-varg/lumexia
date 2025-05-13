'use client'
import Card from '@/components/Card'
import { usePricingPurchasedActions, usePricingPurchasedSelection } from '@/store/pricingPurchasedSlice'
import React, { useState } from 'react'
import ValidationErrorAlert from './ValidationErrorAlert'
import useDialog from '@/hooks/useDialog'
import { useRouter } from 'next/navigation'
import { ProducedValidation, validateProducedCommit } from '../../../_functions/validateProducedCommit'
import { commitPricingExamination } from '../../../_functions/commitPricingExamination'
import { usePricingProducedActions, usePricingProducedSelection } from '@/store/pricingProducedSlice'
import { commitProducedPricingExamination } from '../../../_functions/commitProducedPricingExamination'

const ActionsPanel = ({
    examinationId,
}: {
    examinationId: string

}) => {

    const { toggleContainerParameters } = usePricingProducedActions()
    const { showDialog } = useDialog()
    const router = useRouter()
    const { isContainerParametersPanelShown, interimFinishedProducts, finishedProducts, producedPricingSummations } = usePricingProducedSelection();
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

        if (!validation) return;

        const stateData = {
            interimFinishedProducts: interimFinishedProducts,
            finishedProducts: finishedProducts,
            pricingDataObject: pricingDataObject,
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
