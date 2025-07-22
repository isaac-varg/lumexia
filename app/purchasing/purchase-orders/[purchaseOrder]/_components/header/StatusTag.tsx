import React from 'react'
import { PurchaseOrderDetails } from '../../_functions/getPurchaseOrder'
import Tag from '@/components/Text/Tag'

const StatusTag = ({purchaseOrder}: {purchaseOrder: PurchaseOrderDetails} ) => {
	
  return (
      <Tag text='large' bgColor={purchaseOrder.status.bgColor} textColor={purchaseOrder.status.textColor} label={purchaseOrder.status.name} tooltip={purchaseOrder.status.name} />
 
  )
}

export default StatusTag
