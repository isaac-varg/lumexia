import { CompletedAudit } from "@/actions/inventory/auditRequests/getAllCompleted"
import { Panels } from "@/components/Panels"
import Text from "@/components/Text"
import AuditsTable from "./AuditsTable"

const RecentAuditsPanel = ({ audits }: { audits: CompletedAudit[] }) => {
    return (
        <Panels.Root>
            <Text.SectionTitle size="normal">Recent Audits</Text.SectionTitle>

            <AuditsTable audits={audits} />

        </Panels.Root>
    )
}

export default RecentAuditsPanel 
