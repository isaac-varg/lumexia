import TagLabel from '@/components/Text/TagLabel'
import { PurchaseOrder } from '@/types/purchaseOrder'
import React from 'react'

const StatusTag = ({purchaseOrder}: {purchaseOrder: PurchaseOrder} ) => {
  return (
  <TagLabel>{purchaseOrder.status.name}</TagLabel>
 
  )
}

export default StatusTag
