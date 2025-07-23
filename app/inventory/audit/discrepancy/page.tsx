import itemTypeActions from "@/actions/inventory/itemTypeActions"
import PageWrapper from "@/components/App/PageWrapper"
import NewButton from "./_components/NewButton"
import { ItemType } from "@prisma/client"
import NewAuditDialog from "./_components/NewAuditDialog"

const DiscrepancyPage = async () => {

    const itemTypes = await itemTypeActions.getAll()

    return (
        <PageWrapper pageTitle={'Discrepancy Audit'}>

            <NewAuditDialog itemTypes={itemTypes} />


            <NewButton />




        </PageWrapper>
    )
}

export default DiscrepancyPage

