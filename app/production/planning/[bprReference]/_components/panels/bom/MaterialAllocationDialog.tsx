'use client'
import { BprBomItemInventory } from "@/actions/inventory/inventory/getAllByBom"
import Dialog from "@/components/Dialog"
import { usePlanningDashboardSelection } from "@/store/planningDashboardSlice"
import { useEffect, useState } from "react"

const MaterialAllocationDialog = () => {

    const { selectedBomItem: material } = usePlanningDashboardSelection()

    const allocationDialogIdentifier = `allocation${material?.id}`
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState<"default" | "request" | "audit">("default")
    const [requests, setRequests] = useState<PurchasingRequestForPlanning[]>([])
    const hasRequests = requests.length !== 0


    useEffect(() => {

        const runGetter = async () => {

            try {
                setIsLoading(true)
                const requests = await getPurchasingRequests(material.bom.itemId)
                setRequests(requests)
            } catch (error) {
                throw new Error("There was an error in getting hte purchasing request")
            } finally {
                setIsLoading(false)
            }

        }

        runGetter()

    }, [])




    return (
        <>
            <Dialog.Root identifier={allocationDialogIdentifier} >

                {mode === 'default' && <MaterialAllocationPanels material={material} isLoading={isLoading} requests={requests} setMode={setMode} />}

                {mode === 'request' && <RequestForm material={material} setMode={setMode} hasRequests={hasRequests} />}

                {mode === 'audit' && <AuditRequest setMode={setMode} itemId={material.bom.itemId} />}

            </Dialog.Root>
        </>
    )
}

export default MaterialAllocationDialog
