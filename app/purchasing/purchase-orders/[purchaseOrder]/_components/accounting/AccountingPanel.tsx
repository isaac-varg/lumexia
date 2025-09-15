import AccountingDetails from "@/app/accounting/pos/[po]/_components/AccountingDetails"
import AccountingFiles from "@/app/accounting/pos/[po]/_components/AccountingFiles"
import AccountingNotes from "@/app/accounting/pos/[po]/_components/AccountingNotes"
import AccountingStatus from "@/app/accounting/pos/[po]/_components/AccountingStatus"
import PaymentMethodPanel from "@/app/accounting/pos/[po]/_components/PaymentMethodPanel"
import Card from "@/components/Card"
import { usePurchasingSelection } from "@/store/purchasingSlice"



const AccountingPanel = () => {

  const { poWithAccounting: accounting, files, options } = usePurchasingSelection()

  if (!accounting) return false;
  return (
    <Card.Root span={2}>
      <Card.Title>Accounting</Card.Title>


      <div className="grid grid-cols-3 gap-4">
        <AccountingDetails po={accounting} title="Process" />
        <AccountingStatus po={accounting} statuses={options.accountingStatuses} />
        <PaymentMethodPanel poId={accounting.id} paymentMethod={accounting.poAccountingDetail?.paymentMethod} allMethods={options.paymentMethods} accountingDetailId={accounting.poAccountingDetail?.id} />


        <AccountingFiles span={3} files={files} poId={accounting.id} fileTypes={options.fileTypes} />
        <AccountingNotes poId={accounting.id} noteTypes={options.accountingNoteTypes} notes={accounting.poAccountingNotes} />

      </div>


    </Card.Root>
  )
}

export default AccountingPanel
