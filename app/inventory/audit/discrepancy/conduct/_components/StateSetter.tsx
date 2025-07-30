'use client'

import { useDiscrepancyActions, useDiscrepancySelection } from "@/store/discrepancySlice"
import { useEffect } from "react"

const StateSetter = ({ auditId }: { auditId: string }) => {

    const { item } = useDiscrepancySelection()
    const { getNoteTypes, getNotes, getDiscrepancyAudit } = useDiscrepancyActions()

    useEffect(() => {
        getDiscrepancyAudit(auditId)

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
