import PageWrapper from "@/components/App/PageWrapper"
import { getPoWithAccountingDetails } from "../_actions/getPoWithAccountingDetails"
import PoDetails from "./_components/PoDetails"
import AccountingDetails from "./_components/AccountingDetails"
import AccountingStatus from "./_components/AccountingStatus"
import AccountingFiles from "./_components/AccountingFiles"
import { getAccountingFilesByPo } from "../_actions/getAccountingFilesByPo"
import { getAccountingFileTags } from "../_actions/getAccountingFileTags"
import PaymentMethodPanel from "./_components/PaymentMethodPanel"



const PoAccountingDetailsPage = async ({ searchParams }: { searchParams: { id: string } }) => {

    const po = await getPoWithAccountingDetails(searchParams.id)
    const files = await getAccountingFilesByPo(searchParams.id)
    const fileTypes = await getAccountingFileTags();

    if (!po) return false

    return (
        <PageWrapper pageTitle={`PO #${po.referenceCode} Accounting`}>


            <div className="grid grid-cols-3 gap-6">

                <AccountingDetails po={po} />

                <AccountingStatus />

                <PoDetails referenceCode={po.referenceCode} supplier={po.supplier.name} status={{
                    name: po.status.name,
                }} total={po.total} />

                <AccountingFiles files={files} poId={po.id} fileTypes={fileTypes} />

                <PaymentMethodPanel />

            </div>



        </PageWrapper>
    )
}

export default PoAccountingDetailsPage 
