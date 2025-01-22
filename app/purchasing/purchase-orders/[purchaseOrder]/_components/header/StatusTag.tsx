import TagLabel from '@/components/Text/TagLabel'
import React from 'react'
import { PurchaseOrderDetails } from '../../_functions/getPurchaseOrder'

const StatusTag = ({purchaseOrder}: {purchaseOrder: PurchaseOrderDetails} ) => {

	let color = 'neutral'
	
	switch (purchaseOrder.status.sequence) {
		case 1:
			color = 'draft'	
			break;
		case 2:
			color = 'amber'
			break;
		case 3:
			color = 'orange'
			break;
		case 4:
			color = 'bayLeaf'
			break;
		case 5:
			color = 'orange'
			break;
		default:
			color = 'neutral'
			break;
	}
	
  return (
  <TagLabel color={color as any} size='big'>{purchaseOrder.status.name}</TagLabel>
 
  )
}

export default StatusTag
