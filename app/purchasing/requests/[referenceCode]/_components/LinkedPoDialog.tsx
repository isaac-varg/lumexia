'use client'

import Dialog from "@/components/Dialog"
import { LinkedPos } from "../_functions/getLinkedPos"

type LinkedPoDialogProps = {

    purchaseOrder: LinkedPos
}

const LinkedPoDialog = ({ purchaseOrder }: LinkedPoDialogProps) => {

    return (
        <Dialog.Root identifier={`linkedPoDialog-${purchaseOrder.po.purchaseOrderItems[0].id}`}>
            <Dialog.Title>Purchase Order Item Details</Dialog.Title>
            <p>You can specify pack sizes for the order item and expected delivery date range</p> 
        </Dialog.Root>
    )
}

export default LinkedPoDialog
