import PageWrapper from "@/components/App/PageWrapper"
import { getPoWithAccountingDetails } from "../_actions/getPoWithAccountingDetails"
import PoDetails from "./_components/PoDetails"
import AccountingDetails from "./_components/AccountingDetails"
import Layout from "@/components/Layout"
import AccountingStatus from "./_components/AccountingStatus"



const PoAccountingDetailsPage = async ({ searchParams }: { searchParams: { id: string } }) => {

    const po = await getPoWithAccountingDetails(searchParams.id)

    if (!po) return false

    return (
        <PageWrapper pageTitle={`PO #${po.referenceCode} Accounting`}>

            <div className="grid grid-cols-3 gap-6">

                <AccountingDetails po={po} />

                <AccountingStatus />

                <PoDetails referenceCode={po.referenceCode} supplier={po.supplier.name} status={{
                    name: po.status.name,
                }} total={po.total} />

            </div>



        </PageWrapper>
    )
}

export default PoAccountingDetailsPage 
