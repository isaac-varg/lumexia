import React from 'react'
import { RequestForDashboard } from '../_functions/getRequests'
import { GroupByProperty, groupByProperty } from '@/utils/data/groupByProperty'
import { RequestStatus } from '../[referenceCode]/_functions/getRequestStatuses';
import RequestCard from './RequestCard';
import { RequestPriority } from '../_functions/getPriorities';

const BySupplierPanel = ({ requests, statuses, priorities }: { requests: RequestForDashboard[], statuses: RequestStatus[], priorities: RequestPriority[] }) => {

    const grouped: GroupByProperty[] = groupByProperty(requests, 'connectedPoSuppliers');
    const supplierKeys = Object.keys(grouped);

    return (
        <div className='flex items-center justify-center text-9xl font-bold font-poppins text-lilac-800'>
            <div className='grid grid-cols-1 gap-6'>
                {supplierKeys.map((supplierKey) => {
                    if (supplierKey === "") { return }
                    return (
                        <div
                            key={supplierKey}
                            className='p-6 rounded-lg shadow-xl bg-neutral-200'
                        >
                            <div className='flex flex-col gap-y-6'>
                                <div
                                    className='font-poppins text-xl font-semibold'>
                                    {supplierKey}
                                </div>

                                <div className='grid grid-cols-4 max-h-80 overflow-y-auto gap-6'>
                                    {requests.filter((req) => req.connectedPoSuppliers.some((supplier: string) => supplier === supplierKey)).map((req) => <RequestCard key={req.id} statuses={statuses} priorities={priorities} request={req} />)}
                                </div>
                            </div>

                        </div>
                    )
                })}


                <div className='grid grid-cols-1 gap-6'>

                    <div className='p-6 rounded-lg shadow-xl bg-rose-300'>

                        <div className='flex flex-col gap-y-6'>
                            <div
                                className='font-poppins text-xl font-semibold'>
                                    No Connected Purchase Orders 
                            </div>

                            <div className='grid grid-cols-4 max-h-80 overflow-y-auto gap-6'>
                                {requests.filter((req) => req.connectedPoSuppliers.length === 0).map((req) => <RequestCard key={req.id} statuses={statuses} priorities={priorities} request={req} />)}
                            </div>
                        </div>



                    </div>

                </div>


            </div>
        </div>
    )
}

export default BySupplierPanel
