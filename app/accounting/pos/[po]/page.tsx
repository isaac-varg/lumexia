import PageWrapper from "@/components/App/PageWrapper"
import { getPoWithAccountingDetails } from "../_actions/getPoWithAccountingDetails"
import PoDetails from "./_components/PoDetails"
import AccountingDetails from "./_components/AccountingDetails"
import AccountingStatus from "./_components/AccountingStatus"
import AccountingFiles from "./_components/AccountingFiles"
import { getAccountingFilesByPo } from "../_actions/getAccountingFilesByPo"
import { getAccountingFileTags } from "../_actions/getAccountingFileTags"
import PaymentMethodPanel from "./_components/PaymentMethodPanel"
import { accountingActions } from "@/actions/accounting"
import { getAllPoAccountingStatuses } from "../_actions/getAllAccountingStatuses"
import AccountingNotes from "./_components/AccountingNotes"
import { getAllAccountingNoteTypes } from "../_actions/getAllAccountingNoteTypes"
import { getAccountingAuditLogsByPo } from "../_actions/getAccountingAuditLogsByPo"
import AccountingAuditLogs from "./_components/AccountingAuditLogs"
import { Tabs } from "@/components/Tabs2"
import LabelCounter from "@/components/Tabs2/LabelCounter"



const PoAccountingDetailsPage = async ({ searchParams }: { searchParams: { id: string } }) => {

  const po = await getPoWithAccountingDetails(searchParams.id)
  const files = await getAccountingFilesByPo(searchParams.id)
  const fileTypes = await getAccountingFileTags();
  const paymentMethods = await accountingActions.paymentMethods.getAll();
  const statuses = await getAllPoAccountingStatuses();
  const noteTypes = await getAllAccountingNoteTypes();
  const logs = await getAccountingAuditLogsByPo(searchParams.id);


  if (!po) return false

  return (
    <PageWrapper pageTitle={`PO #${po.referenceCode} Accounting`}>


      <div className="grid grid-cols-4 gap-6">

        <AccountingDetails po={po} />

        <AccountingStatus statuses={statuses} po={po} />

        <PoDetails referenceCode={po.referenceCode} supplier={po.supplier.name} status={{
          name: po.status.name,
        }} total={po.total} poCreatedAt={po.createdAt} />

        <PaymentMethodPanel paymentMethod={po.poAccountingDetail?.paymentMethod} accountingDetailId={po.poAccountingDetail?.id} allMethods={paymentMethods} poId={po.id} />

      </div>


      <Tabs.Root defaultValue="notes">

        <div className="flex justify-between items-center">
          <Tabs.List>
            <Tabs.Trigger size="large" value="notes">
              <LabelCounter label="Notes" count={po.poAccountingNotes.length} />
            </Tabs.Trigger>
            <Tabs.Trigger size="large" value="files">
              <LabelCounter label="Files" count={po.poAccountingFiles.length} />
            </Tabs.Trigger>
            <Tabs.Trigger size="large" value="activity">Activity</Tabs.Trigger>
          </Tabs.List>

        </div>
        <div className="pt-4">
          <Tabs.ContentContainer>
            <Tabs.Content value="notes">
              <AccountingNotes notes={po.poAccountingNotes} noteTypes={noteTypes} poId={po.id} />
            </Tabs.Content>

            <Tabs.Content value="files">
              <AccountingFiles files={files} poId={po.id} fileTypes={fileTypes} />
            </Tabs.Content>

            <Tabs.Content value="activity">
              <AccountingAuditLogs logs={logs} />
            </Tabs.Content>

          </Tabs.ContentContainer>
        </div>
      </Tabs.Root>

    </PageWrapper>
  )
}

export default PoAccountingDetailsPage 
