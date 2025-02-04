import React from 'react'
import PreviousStatusButton from './PreviousStatusButton'
import NextStatusButton from './NextStatusButton'
import Separator from '@/components/Separator/Separator'
import GoToReceivingButton from './GoToReceivingButton'
import PrintButton from './PrintButton'
import { PurchaseOrderStatus } from '@/types/purchaseOrderStatus'
import { FlattenedOrderItem } from '../../_functions/flattenOrderItems'

type ActionButtonsProps = {
    poStatuses: PurchaseOrderStatus[]
    purchaseOrder: any
    orderItems: FlattenedOrderItem[] 
}

const ActionButtons = ({ poStatuses, purchaseOrder, orderItems }: ActionButtonsProps) => {
    const { id, status } = purchaseOrder

    return (
        <div className="flex flex-row items-center justify-start gap-x-8">
            <div className="flex gap-x-4">
                <PreviousStatusButton
                    poStatuses={poStatuses}
                    currentStatusSequence={status.sequence}
                    purchaseOrderId={id}
                />
                <NextStatusButton
                    poStatuses={poStatuses}
                    currentStatusSequence={status.sequence}
                    purchaseOrderId={id}
                />
            </div>
            <Separator />
            <div className="flex gap-x-4">
                <GoToReceivingButton purchaseOrder={purchaseOrder} />
                <PrintButton
                    purchaseOrder={purchaseOrder}
                    orderItems={orderItems}
                />
            </div>
        </div>
    )
}

export default ActionButtons
