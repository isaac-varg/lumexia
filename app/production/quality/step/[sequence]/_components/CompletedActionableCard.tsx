"use client"

import bprStepActionableVerificationActions from "@/actions/production/bprStepActionableVerifications"
import bprStepActionableActions from "@/actions/production/bprStepActionables"
import { getUserId } from "@/actions/users/getUserId"
import ActionButton from "@/components/ActionButton"
import { staticRecords } from "@/configs/staticRecords"
import useProduction from "@/hooks/useProduction"
import { ExBprStepActionable } from "@/types/bprStepActionable"
import { BprStepActionableCompletion } from "@/types/bprStepActionableCompletion"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import { BsPersonCheck } from "react-icons/bs"

export interface QualityExBprStepActionable extends ExBprStepActionable {
    completion: BprStepActionableCompletion[]
}

const CompletedActionableCard = ({ actionable }: { actionable: QualityExBprStepActionable }) => {

    const { isSecondaryVerificationMode } = useProduction()

    const isCompleted = (!isSecondaryVerificationMode && actionable.isVerified) || (isSecondaryVerificationMode && actionable.isSecondarilyVerified)

    const handleVerify = async () => {


        const userId = await getUserId()
        const requiresSecondary = !isSecondaryVerificationMode && actionable.stepActionable.secondaryVerificationRequired

        const verificationPayload = {
            completedByUserId: userId,
            bprStepActionableId: actionable.id,
            type: isSecondaryVerificationMode ? 'secondary' : 'primary',
        }

        const verificationUpdate = isSecondaryVerificationMode ? { isSecondarilyVerified: true } : { isVerified: true }
        const bprActionableStatusId = requiresSecondary ? staticRecords.production.bprStepActionableStatuses.secondaryVerification : staticRecords.production.bprStepActionableStatuses.completed;
        const actionablePayload = {
            ...verificationUpdate,
            statusId: bprActionableStatusId,
        }

        const verificationVerbage = isSecondaryVerificationMode ? 'Secondary Verification' : 'Primary Verification';

        await bprStepActionableVerificationActions.createNew(verificationPayload)
        await bprStepActionableActions.update({ id: actionable.id }, actionablePayload)
        await createActivityLog(`bprStepActionableVerification`, 'bprStepActionable', actionable.id, { context: `${verificationVerbage} of bpr step actionable` })



    }



    if (isCompleted) {
        return <div className='relative flex flex-col p-6 bg-limed-spruce-200 rounded-lg shadow-lg gap-y-4'>
            <div className="absolute bg-bay-leaf-400 inset-0 flex z-50 items-center justify-center opacity-90  rounded-lg">
                <span className="font-poppins font-black text-2xl">Verified</span>
            </div>

            <p className='font-inter text-lg uppercase text-neutral-900 font-semibold z-10'>{actionable.stepActionable.actionableType.name}</p>

            <p className='font-inter text-lg text-neutral-900 font-medium z-10'>{actionable.stepActionable.actionableType.description}</p>
        </div>


    }



    return (
        <div className='flex flex-col p-6 bg-limed-spruce-200 rounded-lg shadow-lg gap-y-4'>

            <div className="flex justify-between">
                <p className='font-inter text-lg uppercase text-neutral-900 font-semibold'>{actionable.stepActionable.actionableType.name}</p>
                <div className="outline outline-2 outline-rose-400 px-4 rounded-lg"><p className='font-inter text-lg text-rose-400 font-semibold '>{actionable.stepActionable.required ? "Required" : ""}</p></div>

            </div>
            <p className='font-inter text-lg  text-neutral-900 font-medium'>{actionable.stepActionable.actionableType.description}</p>

            <div className="flex items-center justify-between text-xl font-poppins">
                <span className="flex items-center gap-x-2">
                    <span className="text-3xl"><BsPersonCheck /></span>
                    <p>Completed By</p>
                </span>
                <p>{actionable.completion[0].completedByUser.name}</p>
            </div>

            <ActionButton onClick={() => handleVerify()} >Verify</ActionButton>

        </div>
    )
}

export default CompletedActionableCard
