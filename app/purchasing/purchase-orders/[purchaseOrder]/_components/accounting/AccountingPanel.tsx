import { PaymentMethod } from "@/actions/accounting/paymentMethods/getAll"
import AccountingDetails from "@/app/accounting/pos/[po]/_components/AccountingDetails"
import AccountingFiles from "@/app/accounting/pos/[po]/_components/AccountingFiles"
import AccountingNotes from "@/app/accounting/pos/[po]/_components/AccountingNotes"
import AccountingStatus from "@/app/accounting/pos/[po]/_components/AccountingStatus"
import PaymentMethodPanel from "@/app/accounting/pos/[po]/_components/PaymentMethodPanel"
import { AccountingFileTypes } from "@/app/accounting/pos/_actions/getAccountingFileTags"
import { AccountingFile } from "@/app/accounting/pos/_actions/getAccountingFilesByPo"
import { AccountingNote } from "@/app/accounting/pos/_actions/getAllAccountingNotes"
import { PoAccountingStatus } from "@/app/accounting/pos/_actions/getAllAccountingStatuses"
import { PoWithAccounting } from "@/app/accounting/pos/_actions/getPoWithAccountingDetails"
import Card from "@/components/Card"
import { PoAccountingNoteType } from "@prisma/client"

type AccountingPanelProps = {
    accounting: PoWithAccounting | null
    files: AccountingFile[]
    fileTypes: AccountingFileTypes[]
    allMethods: PaymentMethod[]
    allAccountingStatuses: PoAccountingStatus[]
    allAccountingNoteTypes: PoAccountingNoteType[]
}

const AccountingPanel = ({ accounting, files, fileTypes, allMethods, allAccountingStatuses, allAccountingNoteTypes }: AccountingPanelProps) => {

    if (!accounting) return false;
    return (
        <div className="col-span-2">
            <Card.Root>
                <Card.Title>Accounting</Card.Title>


                <div className="grid grid-cols-3 gap-4">
                    <AccountingDetails po={accounting} title="Process" />
                    <AccountingStatus po={accounting} statuses={allAccountingStatuses} />
                    <PaymentMethodPanel poId={accounting.id} paymentMethod={accounting.poAccountingDetail?.paymentMethod} allMethods={allMethods} accountingDetailId={accounting.poAccountingDetail?.id} />


                    <AccountingFiles span={3} files={files} poId={accounting.id} fileTypes={fileTypes} />
                    <AccountingNotes poId={accounting.id} noteTypes={allAccountingNoteTypes} notes={accounting.poAccountingNotes} />

                </div>


            </Card.Root>
        </div>
    )
}

export default AccountingPanel
