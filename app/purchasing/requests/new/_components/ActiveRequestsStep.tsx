import { purchasingActions } from '@/actions/purchasing';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { MdClass } from 'react-icons/md';

type ActiveRequestStepProps = {
    nextStep: () => void;
    itemId: string,
    setSnapshotWarnings: Dispatch<SetStateAction<{ warningShown: boolean, warningOverridden: boolean }>>
    currentStep: number
}

const ActiveRequestsStep = ({ nextStep, itemId, setSnapshotWarnings, currentStep }: ActiveRequestStepProps) => {

    const [warningShown, setWarningShown] = useState(false);
    const [waiting, setWaiting] = useState(false)
    const [isStepComplete, setIsStepComplete] = useState(false);
    const router = useRouter()

    const handleContinue = () => {
        setSnapshotWarnings({
            warningShown,
            warningOverridden: true,
        })

        setIsStepComplete(true)
    }

    useEffect(() => {

        const getter = async () => {

            setWaiting(true)

            if (!itemId) { return }
            const requests = await purchasingActions.requests.getActiveByItemId(itemId);

            if (requests.length !== 0) {
                setWarningShown(true);
                setWaiting(false)
                return;
            }

            setIsStepComplete(true);
            setWaiting(false)
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
            {waiting && (<div className='flex flex-col gap-y-8'>
                         <div className='skeleton h-64 w-64' />
                         <div className='flex gap-x-2 justify-center items-center'>
                                <div className='skeleton h-10 w-20'/>
                                <div className='skeleton h-10 w-20'/>
                         </div>
                </div>
    )}
            {!waiting && (
                <>
                    <div className='font-poppins text-4xl font-bold text-rose-600 flex flex-col gap-y-8 justify-center items-center'>
                        <p>Hold Up!</p>
                        <p>There is already one or more active requests pending</p>
                        <p>Are you sure you wish to continue?</p>
                    </div>

                    <div className='flex items-center gap-x-2'>
                        <button className='btn btn-accent' onClick={() => { router.push("/purchasing/requests") }} >Go Back</button>
                        <button className='btn btn-warning' onClick={handleContinue}>Continue</button>
                    </div></>)}
        </div>
    )
}

export default ActiveRequestsStep
