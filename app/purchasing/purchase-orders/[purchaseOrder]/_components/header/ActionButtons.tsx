import React from 'react'
import PreviousStatusButton from './PreviousStatusButton'
import NextStatusButton from './NextStatusButton'
import Separator from '@/components/Separator/Separator'
import GoToReceivingButton from './GoToReceivingButton'
import PrintButton from './PrintButton'
import { usePurchasingSelection } from '@/store/purchasingSlice'



const ActionButtons = () => {
  const { purchaseOrder, options, orderItems } = usePurchasingSelection()

  if (!purchaseOrder || !options.company) return false;


  const { id, status, } = purchaseOrder

  return (
    <div className="flex flex-row items-center justify-start gap-x-8">
      <div className="flex gap-x-4">
        <PreviousStatusButton
          poStatuses={options.poStatuses}
          currentStatusSequence={status.sequence}
          purchaseOrderId={id}
        />
        <NextStatusButton
          poStatuses={options.poStatuses}
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
          company={options.company}
        />
      </div>
    </div>
  )
}

export default ActionButtons
