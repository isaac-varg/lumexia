import { useDiscrepancyActions, useDiscrepancySelection } from "@/store/discrepancySlice"
import { useEffect } from "react"

const ViewModeStateSetter = () => {

    const { auditItems, mode, audit } = useDiscrepancySelection()
    const { getAuditItems } = useDiscrepancyActions()

    useEffect(() => {

        getAuditItems();
    }, [mode, audit, getAuditItems])
    return false
}

export default ViewModeStateSetter
