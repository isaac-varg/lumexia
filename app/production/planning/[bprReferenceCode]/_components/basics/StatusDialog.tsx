"use client"
import Dialog from "@/components/Dialog"
import useDialog from "@/hooks/useDialog"
import { productionActions } from "@/actions/production"
import { useBprDetailsSelection } from "@/store/bprDetailsSlice"
import { useRouter } from "next/navigation"


const StatusDialog = () => {

  const { bpr, options } = useBprDetailsSelection();
  const router = useRouter();
  const { resetDialogContext } = useDialog()

  const handleClick = async (statusId: string) => {

    if (!bpr) return;
    await productionActions.bprs.update2(bpr.id, { bprStatusId: statusId })
    resetDialogContext()
    router.refresh()
  }

  return (
    <Dialog.Root identifier="changeBprStatus">
      <Dialog.Title>Change Status To...</Dialog.Title>

      <div className="grid grid-cols-4 gap-4">
        {options.bprStatuses.map((status) => {
          return (
            <button key={status.id} style={{ backgroundColor: status.bgColor, color: status.textColor }} className='btn btn-neutral' onClick={() => handleClick(status.id)}>{status.name}</button>
          )
        })}
      </div>

    </Dialog.Root>
  )
}

export default StatusDialog
