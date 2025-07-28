import PageWrapper from "@/components/App/PageWrapper"
import ScanPanel from "./_components/ScanPanel"
import ItemView from "./_components/ItemView"
import StatusPanel from "./_components/StatusPanel"
import ActionsPanel from "./_components/ActionsPanel"

const ConductDiscrepancyAuditPage = () => {

    return (
        <PageWrapper pageTitle={'Conduct Discrepancy Audit'}>

            <div className="grid grid-cols-3 gap-6">
                <StatusPanel />
                <ActionsPanel />
                <ScanPanel />

            </div>

            <ItemView />

        </PageWrapper>
    )
}

export default ConductDiscrepancyAuditPage
