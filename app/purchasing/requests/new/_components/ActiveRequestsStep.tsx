import { purchasingActions } from '@/actions/purchasing';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

type ActiveRequestStepProps = {
    nextStep: () => void;
    itemId: string,
    setSnapshotWarnings: Dispatch<SetStateAction<{warningShown: boolean, warningOverridden: boolean}>> 
    currentStep: number
}

const ActiveRequestsStep = ({ nextStep, itemId, setSnapshotWarnings, currentStep }: ActiveRequestStepProps) => {

    const [warningShown, setWarningShown] = useState(false);
    const [isStepComplete, setIsStepComplete] = useState(false);

    const handleContinue = () => {
        setSnapshotWarnings({
            warningShown,
            warningOverridden: true,
        }) 

        setIsStepComplete(true)
    }

    useEffect(() => {

        const getter = async () => {

            if (!itemId) { return }
            const requests = await purchasingActions.requests.getActiveByItemId(itemId);

            if (requests.length !== 0) {
                setWarningShown(true);
                return;
            }

            setIsStepComplete(true);
        }

        getter()

    }, [itemId])

    useEffect(() => {
        if (isStepComplete) {
            nextStep();
        }
    }, [isStepComplete])

    if (currentStep !== 1) {
        return null
    }

    return (
        <div className='flex flex-col gap-y-8 items-center justify-center'>
            <div className='font-poppins text-3xl font-bold text-rose-600'>
                <p>Hold Up!</p>
                <p>There is already one or more active requests pending</p>
                <p>Are you sure you wish to continue?</p>
            </div>

            <button className='btn btn-warning' onClick={handleContinue}>Continue</button>
        </div>
    )
}

export default ActiveRequestsStep
