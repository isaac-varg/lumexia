'use client'
import { FilledConsumerContainer } from '@/actions/accounting/consumerContainers/getAllByFillItem'
import Card from '@/components/Card'
import { usePricingPurchasedActions, usePricingPurchasedSelection } from '@/store/pricingPurchasedSlice'
import React, { useState } from 'react'
import { PurchasedValidation, validatePurchasedCommit } from '../../_functions/validatePurchasedCommit'
import ValidationErrorAlert from './ValidationErrorAlert'
import useDialog from '@/hooks/useDialog'
import { commitPricingExamination } from '../../_functions/commitPricingExamination'
import { ItemPricingData } from '@/actions/accounting/pricing/getItemPricingData'
import { useRouter } from 'next/navigation'

const ActionsPanel = ({
    consumerContainers,
    examinationId,
    examinedItemId,
    pricingData,
}: {
    consumerContainers: FilledConsumerContainer[]
    examinationId: string
    examinedItemId: string
    pricingData: ItemPricingData,

}) => {

    const { toggleContainerParameters } = usePricingPurchasedActions()
    const { showDialog } = useDialog()
    const router = useRouter()
    const { isContainerParametersPanelShown, interimConsumerContainers } = usePricingPurchasedSelection();
    const [validation, setValidaton] = useState<PurchasedValidation>()
    const purchasedPricingState = usePricingPurchasedSelection()


    // show warning that it is invalid and log if it bypassed

    const handleCommit = async () => {

        const validation = validatePurchasedCommit(consumerContainers.length, interimConsumerContainers);
        setValidaton(validation)

        if (!validation.allValid) {
            showDialog("purchasedValidationErrors")
            return;
        }

        initiateCommit()
    }

    const initiateCommit = async () => {

        if (!validation) return;

        await commitPricingExamination(examinationId, examinedItemId, purchasedPricingState, validation, pricingData?.id || null)

        router.back()

    }

    return (
        <Card.Root>

            <ValidationErrorAlert validation={validation} onProceed={initiateCommit} />

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
        </Card.Root >
    )
}

export default ActionsPanel
