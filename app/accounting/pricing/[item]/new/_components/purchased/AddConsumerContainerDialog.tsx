import Dialog from '@/components/Dialog'
import React, { useState } from 'react'
import StepLabel from '../shared/StepLabel'
import SelectContainerStep from '../shared/SelectContainerStep'
import SpecifyParametersStep from '../shared/SpecifyParametersStep'
import CompleteStep from './CompleteStep'

export type FilledConsumerContainerFormParameters = {
    fillQuantity: number
    declaredQuantity: number
    difficultiesCost: number
    uomId: string
}

const AddFinishedProductDialog = ({ fillItemId, produced = false }: { fillItemId: string, produced?: boolean }) => {

    const [step, setStep] = useState(0)
    const [consumerContainer, setConsumerContainer] = useState<string>('')
    const [parameters, setParameters] = useState<FilledConsumerContainerFormParameters | null>(null)

    const nextStep = () => {
        setStep((prev) => prev + 1);
    }

    const handleReset = () => {
        setConsumerContainer('')
        setParameters(null)
        setStep(0)
    }


    return (
        <Dialog.Root identifier='newconsumercontainerdialog'>
            <Dialog.Title>Lets Add A Consumer Container</Dialog.Title>

            <div>

                <ul className="steps w-full ">
                    <StepLabel indicator="1" step={0} currentStep={step} label="Select Container" />
                    <StepLabel indicator="2" step={1} currentStep={step} label="Specify Parameters" />
                    <StepLabel indicator="3" step={2} currentStep={step} label="Submission" />
                </ul>

                <SelectContainerStep currentStep={step} nextStep={nextStep} setConsumerContainer={setConsumerContainer} />
                <SpecifyParametersStep currentStep={step} nextStep={nextStep} setParameters={setParameters} reset={handleReset} />
                <CompleteStep produced={produced} currentStep={step} reset={handleReset} consumerContainer={consumerContainer} parameters={parameters} fillItem={fillItemId} />



            </div>



        </Dialog.Root>
    )
}

export default AddFinishedProductDialog
