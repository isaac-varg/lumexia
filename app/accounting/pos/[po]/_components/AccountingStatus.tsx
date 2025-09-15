'use client'
import Dialog from "@/components/Dialog"
import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import useDialog from "@/hooks/useDialog"
import { PoAccountingStatus } from "../../_actions/getAllAccountingStatuses"
import { PoWithAccounting } from "../../_actions/getPoWithAccountingDetails"
import { accountingActions } from "@/actions/accounting"
import { useRouter } from "next/navigation"
import { getUserId } from "@/actions/users/getUserId"
import { createAccountingAuditLog } from "../../_actions/createAccountingAuditLog"

const AccountingStatus = ({ statuses, po }: { statuses: PoAccountingStatus[], po: PoWithAccounting }) => {

  const { showDialog } = useDialog()

  return (
    <Panels.Root >

      <ChooseStatusDialog statuses={statuses} poAccountingDetailsId={po.poAccountingDetail?.id} poId={po.id} />

      <SectionTitle size="small">Accounting Status</SectionTitle>

      <div
        onClick={() => showDialog('chooseAccountingStatus')}
        className="w-full h-full p-6 flex items-center justify-center hover:cursor-pointer hover:bg-opacity-20 rounded-xl"
        style={{ backgroundColor: po.poAccountingDetail?.status.bgColor, color: po.poAccountingDetail?.status.textColor }}
      >
        <p className="font-poppins text-2xl font-semibold text-center">
          {po.poAccountingDetail?.status.name || 'No Status'}
        </p>
      </div>

    </Panels.Root>
  )
}

const ChooseStatusDialog = ({ statuses, poAccountingDetailsId, poId }: { statuses: PoAccountingStatus[], poAccountingDetailsId: string | undefined, poId: string }) => {


  const router = useRouter()
  const { resetDialogContext } = useDialog()

  const handleClick = async (statusId: string, statusName: string) => {
    if (!poAccountingDetailsId) return;
    const userId = await getUserId()
    await accountingActions.pos.details.update(poAccountingDetailsId, {
      statusId,
    })
    await createAccountingAuditLog({
      poId,
      userId,
      action: 'Change Status',
      context: `Status changed to ${statusName}`
    })

    router.refresh();
    resetDialogContext()

  }

  return (
    <Dialog.Root identifier="chooseAccountingStatus">
      <Dialog.Title>Change Status To...</Dialog.Title>

      <div className="grid grid-cols-4 gap-4">
        {statuses.map((status) => {
          return (
            <button key={status.id} style={{ backgroundColor: status.bgColor, color: status.textColor }} className='btn btn-neutral' onClick={() => handleClick(status.id, status.name)}>{status.name}</button>
          )
        })}
      </div>

    </Dialog.Root>

  )

}

export default AccountingStatus
