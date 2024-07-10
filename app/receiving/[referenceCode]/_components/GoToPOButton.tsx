"use client" 
import ActionButton from '@/components/ActionButton';
import Layout from '@/components/Layout';
import { PurchaseOrder } from '@/types/purchaseOrder';
import { useRouter } from 'next/navigation';
import React from 'react'
import { TbCreditCard } from "react-icons/tb";

const GoToPOButton = ({
	purchaseOrder,
}: {
	purchaseOrder: PurchaseOrder;
})  => {
	const router = useRouter();	
	const handleButtonClick = () => {
		router.push(`/purchasing/purchase-orders/${purchaseOrder.referenceCode}?id=${purchaseOrder.id}`);
	}
  return (
    	<ActionButton color="cararra" onClick={() => handleButtonClick()}>
				<Layout.Row>
					<TbCreditCard className="text-2xl" />
					<p>Purchase Order</p>
				</Layout.Row>
			</ActionButton>
  )
}

export default GoToPOButton
