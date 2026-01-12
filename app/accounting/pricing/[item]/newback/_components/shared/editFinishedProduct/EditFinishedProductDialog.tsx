import Dialog from '@/components/Dialog'
import React, { useEffect, useState } from 'react'
import useDialog from '@/hooks/useDialog'
import { usePricingProducedActions, usePricingProducedSelection } from '@/store/pricingProducedSliceback'
import EditModeFinishedProductDetails, { FinishedProductDetails } from './EditModeFinishedProductDetails'
import EditModeStepAuxiliaries, { InterimAuxiliaryItemEditMode } from './EditModeStepAuxiliaries'
import StepLabel from '../StepLabel'
import EditModeStepSubmission from './EditModeStepSubmission'

export type FilledConsumerContainerFormParameters = {
  fillQuantity: number
  declaredQuantity: number
  difficultiesCost: number
  uomId: string
}

const EditFinishedProductDialog = ({ fillItemId, produced = false }: { fillItemId: string, produced?: boolean, }) => {

  const [step, setStep] = useState(0)

  const [finishedProductDetails, setFinishedProductDetails] = useState<FinishedProductDetails | null>(null)
  const [auxiliaries, setAuxiliaries] = useState<InterimAuxiliaryItemEditMode[]>([])
  const { resetDialogContext } = useDialog()
  const { selectedFinishedProduct } = usePricingProducedSelection();
  const { getFinishedProducts, } = usePricingProducedActions()

  const nextStep = () => {
    setStep((prev) => prev + 1);
  }

  const handleReset = () => {
    setStep(0)
    setFinishedProductDetails(null)
    setAuxiliaries([])
    resetDialogContext();

    if (produced) {
      getFinishedProducts();
    }

  }

  useEffect(() => {

  })



  return (
    <Dialog.Root identifier='editFinishedProduct'>
      <Dialog.Title>Lets Edit a Finished Product</Dialog.Title>

      <div>

        <ul className="steps w-full ">
          <StepLabel indicator='1' step={0} currentStep={step} label='Finished Product' />
          <StepLabel indicator="2" step={1} currentStep={step} label="Auxiliaries" />
          <StepLabel indicator="3" step={2} currentStep={step} label="Submission" />
        </ul>



        <EditModeFinishedProductDetails currentStep={step} nextStep={nextStep} setFinishedProductDetails={setFinishedProductDetails} />
        <EditModeStepAuxiliaries currentStep={step} nextStep={nextStep} onAuxiliariesStepComplete={setAuxiliaries} isProduced={produced} />
        <EditModeStepSubmission onReset={handleReset} finishedProductId={selectedFinishedProduct?.id || ''} currentStep={step} finishedProductDetails={finishedProductDetails} auxiliaries={auxiliaries} />




      </div>



    </Dialog.Root>
  )
}

export default EditFinishedProductDialog
