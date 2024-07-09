"use client"
import { flattenPurchaseOrders } from '@/app/purchasing/purchase-orders/_functions/flattenPurchaseOrders';
import DataTable from '@/components/DataTable'
import { PurchaseOrder } from '@/types/purchaseOrder'
import React from 'react'
import { columns } from '../_configs/Columns';
import { useRouter } from 'next/navigation';
import { FlattenedPurchaseOrder } from '@/app/inventory/items/[name]/_functions/flattenPurchaseOrder';

type AwaitingDeliveryTableProps = {
	purchaseOrders:   PurchaseOrder[] | any;
}

const AwaitingDeliveryTable = ({purchaseOrders} : AwaitingDeliveryTableProps ) => {
	console.log(purchaseOrders)
	const orders =  flattenPurchaseOrders(purchaseOrders)
	const router = useRouter();

	const handleRowClick = (order: FlattenedPurchaseOrder) => {
		router.push(`/receiving/${order.referenceCode}?id=${order.id}`);
	}
	return (
		<div>
			<DataTable.Default data={orders}
				onRowClick={(row) => handleRowClick(row.original)}
				columns={columns}
			/></div>
	)
}

export default AwaitingDeliveryTable
