import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import { useDiscrepancyActions, useDiscrepancySelection } from "@/store/discrepancySlice"
import { completeAuditItem } from "../_actions/completeItemAudit"
import Alert from "@/components/Alert"
import { useState } from "react"
import { staticRecords } from "@/configs/staticRecords"
import useDialog from "@/hooks/useDialog"
import { completeDiscrepancyAudit } from "../_actions/completeDiscrepancyAudit"
import { useRouter } from "next/navigation"
import { discrepancyAuditItemStatuses } from "@/configs/staticRecords/discrepancyAuditItemStatuses"

const ActionsPanel = () => {

  const { setDiscrepancyAppMode, clearItem } = useDiscrepancyActions()
  const { showDialog, resetDialogContext } = useDialog();
  const router = useRouter();
  const { mode, item, auditItems, audit } = useDiscrepancySelection()
  const [missingAuditsCount, setMissingAuditsCount] = useState<number>(0)

  const handleModeClick = () => {
    if (mode === 'view') {
      setDiscrepancyAppMode('item')
      return;
    }
    setDiscrepancyAppMode('view')
  }

  const completeDiscrepancyAuditConfirmation = async () => {

    if (!audit) return;
    const incompletes = auditItems.filter(i => i.statusId === discrepancyAuditItemStatuses.notChecked);
    await completeDiscrepancyAudit(audit.id, incompletes)
    router.push('/inventory/audit')
  }

  const handleDiscrepancyAuditClose = () => {
    const incompletes = auditItems.filter(i => i.statusId === discrepancyAuditItemStatuses.notChecked);

    if (incompletes.length !== 0) {
      setMissingAuditsCount(incompletes.length);
      showDialog('completeAuditAlert')
      return;
    }

    completeDiscrepancyAuditConfirmation();

  }

  const handleCompleteItem = async () => {
    if (!item) return;
    await completeAuditItem(item)
    clearItem()
  }

  return (
    <Panels.Root>
      <Alert.Root identifier='completeAuditAlert'>
        <Alert.Content
          title="Not All Items Audited"
          action={() => completeDiscrepancyAuditConfirmation()}
          actionLabel="Close Anyway"
          actionColor="warning"
          cancelAction={() => resetDialogContext()}
        >
          It looks like there is still {missingAuditsCount} items that have yet to be audited.
        </Alert.Content>
      </Alert.Root>

      <SectionTitle size="small">Actions</SectionTitle>

      <div className="grid grid-cols-1 gap-4">

        {(item && mode === 'item') && <button className="btn btn-success btn-lg" onClick={() => handleCompleteItem()}>Complete <span className="italic">{item.item.name}</span> Audit</button>}
        <button className="btn btn-lg" onClick={() => handleModeClick()} >{mode === 'item' ? 'View Audit Progress' : 'Conduct Audit'}</button>

        {mode === 'view' && <button onClick={() => handleDiscrepancyAuditClose()} className="btn btn-error" >Close Entire Discrepancy Audit</button>}




      </div>


    </Panels.Root>
  )
}

export default ActionsPanel
