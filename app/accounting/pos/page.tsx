import PageWrapper from "@/components/App/PageWrapper"
import AccountingTable from "./_components/AccountingTable"
import { getPoWithAccountingDetails } from "./_actions/getPoWithAccountingDetails"

const PurchaseOrderAccounting = async () => {
    const pos = await getPoWithAccountingDetails()
    return (
        <PageWrapper pageTitle={'Purchase Order Accounting'}>

            <AccountingTable pos={pos} />

        </PageWrapper >
    )
}

export default PurchaseOrderAccounting 
