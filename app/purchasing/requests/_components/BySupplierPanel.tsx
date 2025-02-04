import React from 'react'
import { RequestForDashboard } from '../_functions/getRequests'
import { groupByProperty } from '@/utils/data/groupByProperty'
import { RequestStatus } from '../[referenceCode]/_functions/getRequestStatuses';
import RequestCard from './RequestCard';
import { RequestPriority } from '../_functions/getPriorities';

const BySupplierPanel = ({ requests, statuses, priorities }: { requests: RequestForDashboard[], statuses: RequestStatus[], priorities: RequestPriority[] }) => {

    const grouped = groupByProperty(requests, '');


    const statusCounts = statuses.map((status) => ({
        ...status,
        count: requests.filter((req) => req.status.name === status.name).length
    }));

    return (
        <div className='flex items-center justify-center text-9xl font-bold font-poppins text-lilac-800'>
            OOOPSIE DAISIES ;)
        </div>
        //        <div className='flex flex-col gap-y-6'>
        //
        //            <div className='grid grid-cols-1 gap-6'>
        //                {statusCounts.filter((s) => s.count !== 0).map((status) => {
        //                    return (
        //                        <div
        //                            key={status.id}
        //                            style={{ backgroundColor: status.bgColor }}
        //                            className='p-6 rounded-lg shadow-xl'
        //                        >
        //                            <div className='flex flex-col gap-y-6'>
        //                                <div
        //                                    style={{ color: status.textColor }}
        //                                    className='font-poppins text-xl font-semibold'>
        //                                    {status.name}
        //                                </div>
        //
        //                                <div className='grid grid-cols-4 max-h-80 overflow-y-auto gap-6'>
        //                                    {requests.filter((req) => req.status.id === status.id).map((req) => <RequestCard key={req.id} statuses={statuses} priorities={priorities} request={req} />)}
        //                                </div>
        //                            </div>
        //
        //                        </div>
        //                    )
        //                })}
        //
        //            </div>
        //
        //            <div className='grid grid-cols-4 gap-4'>
        //
        //                {statusCounts.filter((s) => s.count === 0).map((status) => {
        //                    return (
        //                        <div
        //                            key={status.id}
        //                            className='px-4 py-2 font-poppins text-sm font-semibold rounded-xl flex justify-between items-center'
        //                            style={{ backgroundColor: status.bgColor, color: status.textColor }}
        //                        >
        //                            <p>{status.name}</p>
        //                            <div className='rounded-full flex font-poppins text-sm text-black items-center justify-center h-12 w-12 bg-white' >0</div>
        //                        </div>
        //                    )
        //                })}
        //
        //            </div>
        //
        //
        //        </div>
    )
}

export default BySupplierPanel
