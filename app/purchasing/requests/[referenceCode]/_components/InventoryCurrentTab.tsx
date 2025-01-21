"use client"
import Text from '@/components/Text'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import React from 'react'
import { ItemInventory } from '../_functions/getInventory'
import { OtherRequest } from '../_functions/getOtherRequests'
import { useRouter } from 'next/navigation'

const InventoryCurrentTab = ({ inventory, otherRequests, }: { inventory: ItemInventory, otherRequests: OtherRequest[] }) => {


    const router = useRouter();

const handleAllocatedClick = (bpr: typeof inventory.allocated[number]) => {
    router.push(`/production/planning/${bpr.bpr.referenceCode}?id=${bpr.bprId}`)
}

const handlePoClick = (po: typeof inventory.purchases[number]) => {
   router.push(`/purchasing/purchase-orders/${po.purchaseOrders.referenceCode}?id=${po.purchaseOrderId}`) 
}

const handleRequestClick = (request: typeof otherRequests[number]) => {
    router.push(`/purchasing/requests/${request.referenceCode}?id=${request.id}`)
}

    return (
        <div>
            <div className="grid grid-cols-2 gap-4" >


                <div className='card bg-slate-50'>
                    <div className=" card-body flex flex-col gap-y-4">
                        <div className='card-title'>Current Inventory</div>
                        <Text.SectionTitle size="small">General</Text.SectionTitle>
                        <Text.LabelDataPair label="On Hand" data={`${toFracitonalDigits.weight(inventory.totalQuantityOnHand)} lbs`} />
                        <Text.LabelDataPair label="Allocated" data={`${toFracitonalDigits.weight(inventory.totalQuantityAllocated)} lbs`} />
                        <Text.LabelDataPair label="Available" data={`${toFracitonalDigits.weight(inventory.totalQuantityAvailable)} lbs`} />
                        <Text.LabelDataPair label='Needed For All Pending Bprs' data={`${toFracitonalDigits.weight(inventory.totalQuantityNeeded)} lbs`} />
                    </div>

                </div>

                <div className='card bg-slate-50'>
                    <div className=" card-body flex flex-col gap-y-4">
                        <div className='card-title'>Other Active Requests</div>


                        {otherRequests.length > 0 ? (<div className='grid grid-cols-3 gap-4'>
                            {otherRequests.map((request) => {
                                return (
                                    <div key={request.id} className="card bg-purple-300 hover:cursor-pointer hover:bg-purple-400" onClick={() => handleRequestClick(request)}>
                                        <div className="card-body">
                                            <span className='font-bold font-xl'>REQ# {request.referenceCode}</span>
                                            <span className='font-semibold font-xl'>{request.title}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>) : <span>None currently active</span>
                        }



                    </div>
                </div>


                <div className='card bg-slate-50'>

                    <div className=" card-body flex flex-col gap-y-4">
                        <div className='card-title'>Allocations</div>

                        <div className="overflow-x-auto">
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
                                    {inventory.allocated.map((bprBom) => {
                                        return (
                                            <tr key={bprBom.id} onClick={() => handleAllocatedClick(bprBom)}>
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
                    </div>
                </div>


                <div className='card bg-slate-50'>

                    <div className=" card-body flex flex-col gap-y-4">
                        <div className='card-title'>Purchases</div>


                        <div className="overflow-x-auto">
                            <table className="table">

                                <thead>
                                    <tr>
                                        <th>PO #</th>
                                        <th>Quantity Ordered</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {inventory.purchases.map((po) => {
                                        return (
                                            <tr key={po.id} onClick={() => handlePoClick(po)}>
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
                </div>
            </div >


        </div >)

}

export default InventoryCurrentTab
