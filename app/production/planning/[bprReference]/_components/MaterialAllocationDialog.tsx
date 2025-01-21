import Dialog from "@/components/Dialog"
import { MaterialsBom } from "./MaterialSufficiency"
import { useEffect,  useState } from "react"
import { getPurchasingRequests } from "../_functions/getPurchasingRequests"
import { PurchasingRequest } from "@/types/purchasingRequest"
import RequestForm from "./RequestForm"
import MaterialAllocationPanels from "./MaterialAllocationPanels"

const MaterialAllocationDialog = ({
    material,
}: {
    material: MaterialsBom
}) => {

    const allocationDialogIdentifier = `allocation${material.id}`
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState<"default" | "request">("default")
    const [requests, setRequests] = useState<PurchasingRequest[]>([])
   




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

                {mode === 'request' && <RequestForm material={material} setMode={setMode} />}

            </Dialog.Root>
        </>
    )
}

export default MaterialAllocationDialog
