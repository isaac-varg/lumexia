"use server"

import { revalidatePage } from "@/actions/app/revalidatePage"
import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions"

export const nextPOStatus = async (nextStatusId: string, purchaseOrderId: string) => {
    await purchaseOrderActions.update({id: purchaseOrderId}, { statusId: nextStatusId })
    revalidatePage("/purchasing/purchase-orders/[purchaseOrder]")
}