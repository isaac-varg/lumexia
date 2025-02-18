import React from 'react'
import { RequestForDashboard } from '../_functions/getRequests'
import { groupByProperty } from '@/utils/data/groupByProperty'
import { RequestStatus } from '../[referenceCode]/_functions/getRequestStatuses';
import RequestCard from './RequestCard';
import { RequestPriority } from '../_functions/getPriorities';
import { staticRecords } from '@/configs/staticRecords';

const ByStatusPanel = ({ requests, statuses, priorities }: { requests: RequestForDashboard[], statuses: RequestStatus[], priorities: RequestPriority[] }) => {


    const statusCounts = statuses.map((status) => ({
        ...status,
        count: requests.filter((req) => req.status.name === status.name).length
    }));


    
    const canceledStatus = statusCounts[statusCounts.findIndex((s) => s.id === staticRecords.purchasing.requestStatuses.requestCancelledDuplicateRequest)]




    return (
        <div className='flex flex-col gap-y-6'>

            <div className='grid grid-cols-2 gap-6'>
                {statusCounts.filter((s) => s.count !== 0).map((status) => {

                    let requestsForStatus = requests.filter((req) => req.status.id === status.id);
                    const isDelivered = status.id === staticRecords.purchasing.requestStatuses.delivered
                    const isCancelled = status.id === staticRecords.purchasing.requestStatuses.requestCancelledDuplicateRequest

                    if (isCancelled) { return }

                    if (isDelivered) {
                        requestsForStatus = requestsForStatus.slice(0, 10);
                    }

                    return (
                        <div
                            key={status.id}
                            style={{ backgroundColor: status.bgColor }}
                            className='p-6 rounded-lg shadow-xl'
                        >
                            <div className='flex flex-col gap-y-6'>
                                <div
                                    style={{ color: status.textColor }}
                                    className='font-poppins text-xl font-semibold'>
                                    {status.name}
                                </div>
                                {isDelivered && <p>Only showing last 10</p>}
                                <div className='grid grid-cols-3 max-h-80 overflow-y-auto gap-6'>
                                    {requestsForStatus.map((req) => <RequestCard key={req.id} statuses={statuses} priorities={priorities} request={req} />)}
                                </div>
                            </div>

                        </div>
                    )
                })}

            </div>

            <div className='grid grid-cols-4 gap-4'>

                {statusCounts.filter((s) => s.count === 0).map((status) => {
                    return (
                        <div
                            key={status.id}
                            className='px-4 py-2 font-poppins text-sm font-semibold rounded-xl flex justify-between items-center'
                            style={{ backgroundColor: status.bgColor, color: status.textColor }}
                        >
                            <p>{status.name}</p>
                            <div className='rounded-full flex font-poppins text-sm text-black items-center justify-center h-12 w-12 bg-white' >0</div>
                        </div>
                    )
                })}

                <div
                    className='px-4 py-2 font-poppins text-sm font-semibold rounded-xl flex justify-between items-center'
                    style={{ backgroundColor: canceledStatus.bgColor, color: canceledStatus.textColor }}
                >
                    <p>{canceledStatus.name}</p>
                    <div className='rounded-full flex font-poppins text-sm text-black items-center justify-center h-12 w-12 bg-white' >{canceledStatus.count}</div>
                </div>


            </div>


        </div>
    )
}

export default ByStatusPanel
