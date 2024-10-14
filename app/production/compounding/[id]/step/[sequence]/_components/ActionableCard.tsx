"use client"

import { ExBprStepActionable } from "@/types/bprStepActionable"
import { UserRoleAssignment } from "@prisma/client"

const ActionableCard = ({ actionable, userRole }: { actionable: ExBprStepActionable, userRole: UserRoleAssignment }) => {

    if (userRole.userRoleId !== actionable.stepActionable.actionableType.userRoleId) { return null }
    console.log(actionable)

    return (
        <div>heyhey</div>
    )
}

export default ActionableCard
