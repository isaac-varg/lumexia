import Dialog from "@/components/Dialog"
import { MaterialsBom } from "./MaterialSufficiency"
import Text from "@/components/Text"
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits"
import { useRouter } from "next/navigation"
import { getSlug } from "@/utils/general/getSlug"
import { useEffect, useState } from "react"
import { getPurchasingRequests } from "../_functions/getPurchasingRequests"
import { PurchasingRequest } from "@/types/purchasingRequest"
import { TbPlus } from "react-icons/tb"
import RequestForm from "./RequestForm"

const MaterialAllocationDialog = ({
    material,
}: {
    material: MaterialsBom
}) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState<"default" | "request">("default")
    const [requests, setRequests] = useState<PurchasingRequest[]>([])
    const allocationDialogIdentifier = `allocation${material.id}`

    const handleProductClick = () => {
        const formattedName = getSlug(material.bom.item.name);
        const path = `/inventory/items/${`${formattedName}?id=${material.bom.item.id}`} `
        router.push(path)
    }

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
            <RequestForm setMode={setMode} allocationDialogIdentifier={allocationDialogIdentifier} />

            <Dialog.Root identifier={allocationDialogIdentifier}>
                <Dialog.Title>
                    Material Allocations for <span onClick={() => handleProductClick()} className="underline decoration-wavy hover:cursor-pointer hover:text-sky-900 ">{material.bom.item.name}</span>
                </Dialog.Title>

                <div className="flex flex-col gap-y-6">
                    <div className="flex flex-col gap-y-4">
                        <Text.SectionTitle size="small">General</Text.SectionTitle>
                        <Text.LabelDataPair label="On Hand" data={`${toFracitonalDigits.weight(material.totalQuantityOnHand)} lbs`} />
                        <Text.LabelDataPair label="Allocated" data={`${toFracitonalDigits.weight(material.totalQuantityAllocated)} lbs`} />
                        <Text.LabelDataPair label="Available" data={`${toFracitonalDigits.weight(material.totalQuantityAvailable)} lbs`} />
                        <Text.LabelDataPair label="Required for this Batch" data={`${toFracitonalDigits.weight(material.quantity)} lbs`} />
                    </div>

                    <div className="flex flex-col gap-y-6">
                        <div className="flex justify-between">
                            <Text.SectionTitle size="small">Active Purchasing Requests</Text.SectionTitle>
                            <button className="btn bg-success" onClick={() => setMode("request")}><TbPlus /></button>
                        </div>

                        {isLoading ? <div className="skeleton h-32 w-32"></div> : null}

                        {requests.length > 0 ? (<div>
                            {requests.map((request) => {
                                return (
                                    <div className="card bg-neutral text-primary-content">
                                        <div className="card-body">
                                            {request.title}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>) : <span>None currently active</span>
                        }
                    </div>


                    <div className="overflow-x-auto">
                        <Text.SectionTitle size="small">Allocations</Text.SectionTitle>
                        <table className="table">

                            <thead>
                                <tr>
                                    <th>BPR #</th>
                                    <th>Product</th>
                                    <th>Status</th>
                                    <th>Allocated</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {material.allocated.map((bprBom) => {
                                    return (
                                        <tr key={bprBom.id}>
                                            <th>{bprBom.bpr.referenceCode}</th>
                                            <td>{bprBom.bpr.mbpr.producesItem.name}</td>
                                            <td>{bprBom.bpr.status.name}</td>
                                            <td>{toFracitonalDigits.weight(bprBom.quantity)} lbs</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="overflow-x-auto">
                        <Text.SectionTitle size="small">Purchases</Text.SectionTitle>
                        <table className="table">

                            <thead>
                                <tr>
                                    <th>PO #</th>
                                    <th>Quantity Ordered</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {material.purchases.map((po) => {
                                    return (
                                        <tr key={po.id}>
                                            <th>{po.purchaseOrders.referenceCode}</th>
                                            <td>{po.quantity}</td>
                                            <td>{po.purchaseOrders.status.name}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>


            </Dialog.Root>
        </>
    )
}

export default MaterialAllocationDialog
