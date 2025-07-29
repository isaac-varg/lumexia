import { useDiscrepancyActions, useDiscrepancySelection } from "@/store/discrepancySlice"
import { useEffect } from "react"

const ViewModeStateSetter = () => {


    const { auditItems, mode, audit } = useDiscrepancySelection()
    const { getAuditItems } = useDiscrepancyActions()

    useEffect(() => {
        if (auditItems.length !== 0) return;

        getAuditItems();
    }, [mode, audit])
    return false
}

export default ViewModeStateSetter
