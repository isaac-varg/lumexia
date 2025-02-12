"use client"
import Text from '@/components/Text'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import React from 'react'
import { ItemInventory } from '../_functions/getInventory'
import { OtherRequest } from '../_functions/getOtherRequests'
import { useRouter } from 'next/navigation'
import useDialog from '@/hooks/useDialog'
import RequestInventoryAuditDialog from './RequestInventoryAuditDialog'

const InventoryCurrentTab = ({ inventory, otherRequests, }: { inventory: ItemInventory, otherRequests: OtherRequest[] }) => {


    const router = useRouter();
    const { showDialog } = useDialog()

    const handleAllocatedClick = (bpr: typeof inventory.allocated[number]) => {
        router.push(`/production/planning/${bpr.bpr.referenceCode}?id=${bpr.bprId}`)
    }

    const handlePoClick = (po: typeof inventory.purchases[number]) => {
        router.push(`/purchasing/purchase-orders/${po.purchaseOrders.referenceCode}?id=${po.purchaseOrderId}`)
    }


    return (
        <div>
        <RequestInventoryAuditDialog itemId={inventory.id || ''} />
            <div className="grid grid-cols-2 gap-4" >


                <div className='card bg-slate-50'>
                    <div className=" card-body flex flex-col gap-y-4">
                        <div className='flex justify-between items-center'>
                            <div className='card-title'>Current Inventory</div>
                            <button className='btn' onClick={() => showDialog('requestnewinventoryaudit') }>Request Inventory Audit</button>
                        </div>
                        <Text.SectionTitle size="small">General</Text.SectionTitle>
                        <Text.LabelDataPair label="On Hand" data={`${toFracitonalDigits.weight(inventory.totalQuantityOnHand)} lbs`} />
                        <Text.LabelDataPair label="Allocated" data={`${toFracitonalDigits.weight(inventory.totalQuantityAllocated)} lbs`} />
                        <Text.LabelDataPair label="Available" data={`${toFracitonalDigits.weight(inventory.totalQuantityAvailable)} lbs`} />
                        <Text.LabelDataPair label='Needed For All Pending Bprs' data={`${toFracitonalDigits.weight(inventory.totalQuantityNeeded)} lbs`} />
                    </div>

                </div>



                <div className='card bg-slate-50'>
                    <div className=" card-body flex flex-col gap-y-4">
                        <div className='card-title'>Pending BPRs</div>


                        <div className="overflow-x-auto">
                            <table className="table">

                                <thead>
                                    <tr>
                                        <th>BPR #</th>
                                        <th>Product</th>
                                        <th>Status</th>
                                        <th>Needed</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {inventory.needed.map((bprBom) => {
                                        return (
                                            <tr key={bprBom.id} onClick={() => handleAllocatedClick(bprBom)} className='hover:bg-lilac-300 hover:cursor-pointer'>
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
                                            <tr key={po.id} onClick={() => handlePoClick(po)} className='hover:bg-lilac-300 hover:cursor-pointer'>
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
                                            <tr key={bprBom.id} onClick={() => handleAllocatedClick(bprBom)} className='hover:bg-lilac-300 hover:cursor-pointer'>
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


            </div >


        </div >)

}

export default InventoryCurrentTab
