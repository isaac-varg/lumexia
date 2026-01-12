'use client'
import Card from '@/components/Card'
import { usePricingPurchasedActions, usePricingPurchasedSelection } from '@/store/pricingPurchasedSliceback'
import React, { useState } from 'react'
import { PurchasedValidation, validatePurchasedCommit } from '../../_functions/validatePurchasedCommit'
import ValidationErrorAlert from './ValidationErrorAlert'
import useDialog from '@/hooks/useDialog'
import { commitPricingExamination } from '../../_functions/commitPricingExamination'
import { useRouter } from 'next/navigation'
import { FinishedProduct } from '@/actions/accounting/finishedProducts/getByItem'

const ActionsPanel = ({
  examinationId,
}: {
  examinationId: string

}) => {

  const { toggleContainerParameters } = usePricingPurchasedActions()
  const { showDialog } = useDialog()
  const router = useRouter()
  const { isContainerParametersPanelShown, interimFinishedProducts, finishedProducts, pricingDataObject } = usePricingPurchasedSelection();
  const [validation, setValidaton] = useState<PurchasedValidation>()


  // show warning that it is invalid and log if it bypassed

  const handleCommit = async () => {

    const validation = validatePurchasedCommit(finishedProducts.length, interimFinishedProducts);
    setValidaton(validation)

    if (!validation.allValid) {
      showDialog("purchasedValidationErrors")
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

    await commitPricingExamination(examinationId, stateData, validation)

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
