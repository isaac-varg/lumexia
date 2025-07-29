'use client'

import { useDiscrepancyActions, useDiscrepancySelection } from "@/store/discrepancySlice"
import { useEffect } from "react"
import { getDiscrepancyAudit } from "../_actions/getDiscrepancyAudit"

const StateSetter = ({ auditId }: { auditId: string }) => {

    const { item, auditItems } = useDiscrepancySelection()
    const { getNoteTypes, getNotes, clearAuditItems } = useDiscrepancyActions()

    useEffect(() => {
        getDiscrepancyAudit(auditId);

        if (auditItems.length !== 0) {
            clearAuditItems()
        }
    }, [auditId])

    useEffect(() => {
        getNotes()
    }, [item])

    useEffect(() => {
        getNoteTypes()
    }, [])

    return false
}

export default StateSetter
