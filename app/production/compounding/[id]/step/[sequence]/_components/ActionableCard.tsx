"use client"

import Separator from "@/components/Separator/Separator"
import { ExBprStepActionable } from "@/types/bprStepActionable"
import { UserRoleAssignment } from "@prisma/client"
import BooleanActionable from "./BooleanActionable"

const ActionableCard = ({ actionable, userRole }: { actionable: ExBprStepActionable, userRole: UserRoleAssignment }) => {

    const actionableType = actionable.stepActionable.actionableType.dataType.toLowerCase();

    if (userRole.userRoleId !== actionable.stepActionable.actionableType.userRoleId) { return null }

    if (actionable.isComplete === true) {
        return <div className='relative flex flex-col p-6 bg-limed-spruce-200 rounded-lg shadow-lg gap-y-4'>
            <div className="absolute bg-bay-leaf-400 inset-0 flex z-50 items-center justify-center opacity-90  rounded-lg">
                <span className="font-poppins font-black text-2xl">Completed</span>
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

            <div className="bg-neutral-400 w-fuyll h-px " />

            {actionableType === 'boolean' && <BooleanActionable bprStepActionableId={actionable.id} bprId={actionable.bprBatchStep.bprId} />}


        </div>
    )
}

export default ActionableCard
