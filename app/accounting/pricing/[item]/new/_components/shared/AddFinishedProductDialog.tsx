import Dialog from '@/components/Dialog'
import React, { useState } from 'react'
import StepLabel from '../shared/StepLabel'
import StepFinishedProductDetails, { FinishedProductDetails } from './StepFinishedProductDetails'
import StepAuxiliaries, { InterimAuxiliaryItem } from './StepAuxiliaries'
import StepSubmission from './StepSubmission'
import useDialog from '@/hooks/useDialog'

export type FilledConsumerContainerFormParameters = {
    fillQuantity: number
    declaredQuantity: number
    difficultiesCost: number
    uomId: string
}

const AddFinishedProductDialog = ({ fillItemId, produced = false }: { fillItemId: string, produced?: boolean }) => {

    const [step, setStep] = useState(0)
    const [finishedProductDetails, setFinishedProductDetails] = useState<FinishedProductDetails | null>(null)
    const [auxiliaries, setAuxiliaries] = useState<InterimAuxiliaryItem[]>([])
    const { resetDialogContext } = useDialog()

    const nextStep = () => {
        setStep((prev) => prev + 1);
    }

    const handleReset = () => {
        setStep(0)
        setFinishedProductDetails(null)
        setAuxiliaries([])
        resetDialogContext();

    }


    return (
        <Dialog.Root identifier='newconsumercontainerdialog'>
            <Dialog.Title>Lets Add A Consumer Container</Dialog.Title>

            <div>

                <ul className="steps w-full ">
                    <StepLabel indicator='1' step={0} currentStep={step} label='Finished Product' />
                    <StepLabel indicator="2" step={1} currentStep={step} label="Auxiliaries" />
                    <StepLabel indicator="3" step={2} currentStep={step} label="Submission" />
                </ul>



                <StepFinishedProductDetails currentStep={step} nextStep={nextStep} setFinishedProductDetails={setFinishedProductDetails} />
                <StepAuxiliaries currentStep={step} nextStep={nextStep} onAuxiliariesStepComplete={setAuxiliaries} />
                <StepSubmission onReset={handleReset} currentStep={step} fillItemId={fillItemId} finishedProductDetails={finishedProductDetails} auxiliaries={auxiliaries} />




            </div>



        </Dialog.Root>
    )
}

export default AddFinishedProductDialog
