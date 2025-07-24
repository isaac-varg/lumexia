import itemTypeActions from "@/actions/inventory/itemTypeActions"
import PageWrapper from "@/components/App/PageWrapper"
import NewButton from "./_components/NewButton"
import NewAuditDialog from "./_components/NewAuditDialog"
import { getActiveDiscrepancyAudits } from "./_actions/getActiveDiscrepancyAudits"
import ActiveAudits from "./_components/ActiveAudits"

const DiscrepancyPage = async () => {

    const itemTypes = await itemTypeActions.getAll()
    const activeAudits = await getActiveDiscrepancyAudits();

    return (
        <PageWrapper pageTitle={'Discrepancy Audit'}>

            <NewAuditDialog itemTypes={itemTypes} />

            <div className="flex justify-start items-center">

                <NewButton />
            </div>


            <ActiveAudits actives={activeAudits} />




        </PageWrapper>
    )
}

export default DiscrepancyPage

