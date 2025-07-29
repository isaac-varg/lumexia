import PageWrapper from "@/components/App/PageWrapper"
import StateSetter from "./_components/StateSetter"
import Main from "./_components/Main"
import ViewMode from "./_components/ViewMode"

const ConductDiscrepancyAuditPage = ({ searchParams }: { searchParams: { id: string } }) => {

    return (
        <PageWrapper pageTitle={'Conduct Discrepancy Audit'}>


            <StateSetter auditId={searchParams.id} />
            <Main />
            <ViewMode />


        </PageWrapper>
    )
}

export default ConductDiscrepancyAuditPage
