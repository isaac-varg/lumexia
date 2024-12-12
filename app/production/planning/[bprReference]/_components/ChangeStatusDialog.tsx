"use client"
import Dialog from "@/components/Dialog"
import { BprStatus } from "@/types/bprStatus"
import { updateBpr } from "../_functions/updateBpr"
import { revalidatePage } from "@/actions/app/revalidatePage"
import useDialog from "@/hooks/useDialog"

type ChangeStatusDialogProps = {
    statuses: BprStatus[]
    bprId: string
}

const ChangeStatusDialog = ({ statuses, bprId }: ChangeStatusDialogProps) => {
    const { resetDialogContext } = useDialog()
    const handleClick = async (statusId: string, statusName: string) => {
        await updateBpr(bprId, {bprStatusId: statusId}, `Changed BPR Status to ${statusName} `)
        await revalidatePage('/production/[bprReference]');
        resetDialogContext()
    }
    return (
        <Dialog.Root identifier="changeBprStatus">
            <Dialog.Title>Change Status To...</Dialog.Title>

            <div className="grid grid-cols-4 gap-4">
                {statuses.map((status) => {
                    return (
                        <button key={status.id} className='btn' onClick={() => handleClick(status.id, status.name)}>{status.name}</button>
                    )
                })}
            </div>

        </Dialog.Root>
    )
}

export default ChangeStatusDialog
