'use client'
import Dialog from "@/components/Dialog"
import { usePlanningDashboardActions, usePlanningDashboardSelection } from "@/store/planningDashboardSlice"
import { useEffect, useState } from "react"
import MaterialAllocationPanels from "./MaterialAllocationPanels"
import RequestForm from "./RequestForm"
import AuditRequest from "./AuditRequest"

const MaterialAllocationDialog = () => {

    const { selectedBomItem: material, purchasingRequests: requests, isLoading } = usePlanningDashboardSelection()
    const { getPurchasingRequestsForPlanning } = usePlanningDashboardActions()

    const allocationDialogIdentifier = `allocation${material?.id}`
    const [mode, setMode] = useState<"default" | "request" | "audit">("default")
    const hasRequests = requests.length !== 0


    useEffect(() => {
        getPurchasingRequestsForPlanning()

    }, [material])

    if (!material) return;
    return (
        <Dialog.Root identifier={allocationDialogIdentifier} >

                {mode === 'default' && <MaterialAllocationPanels material={material} isLoading={isLoading} requests={requests} setMode={setMode} />}

                {mode === 'request' && <RequestForm material={material} setMode={setMode} hasRequests={hasRequests} />}

                {mode === 'audit' && <AuditRequest setMode={setMode} itemId={material.bom.itemId} />}


        </Dialog.Root>
    )
}

export default MaterialAllocationDialog
