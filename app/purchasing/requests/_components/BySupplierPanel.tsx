import React, { useState } from 'react'
import { RequestForDashboard } from '../_functions/getRequests'
import { GroupByProperty, groupByProperty } from '@/utils/data/groupByProperty'
import { RequestStatus } from '../[referenceCode]/_functions/getRequestStatuses';
import RequestCard from './RequestCard';
import { RequestPriority } from '../_functions/getPriorities';
import { Search } from '@/components/Search';

const BySupplierPanel = ({ requests, statuses, priorities }: { requests: RequestForDashboard[], statuses: RequestStatus[], priorities: RequestPriority[] }) => {

    const grouped: GroupByProperty[] = groupByProperty(requests, 'connectedPoSuppliers');
    const supplierKeys = Object.keys(grouped).sort();

    const [searchResults, setSearchResults] = useState<RequestForDashboard[]>(requests)

    return (
        <div className='flex flex-col gap-y-6'>
            <Search.Searcher
                data={requests}
                keys={["requestedItemName", "connectedPoSuppliers", "referenceCode"]}
                onQueryComplete={setSearchResults}
            />
            <div className='grid grid-cols-2 gap-6'>
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

                                <div className='grid grid-cols-3 max-h-80 overflow-y-auto gap-6'>
                                    {searchResults.filter((req) => req.connectedPoSuppliers.some((supplier: string) => supplier === supplierKey)).map((req) => <RequestCard key={req.id} statuses={statuses} priorities={priorities} request={req} />)}
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
                                No Connected Supplier
                            </div>

                            <div className='grid grid-cols-4 max-h-80 overflow-y-auto gap-6'>
                                {searchResults.filter((req) => req.connectedPoSuppliers.length === 0).map((req) => <RequestCard key={req.id} statuses={statuses} priorities={priorities} request={req} />)}
                            </div>
                        </div>



                    </div>

                </div>


            </div>
        </div>
    )
}

export default BySupplierPanel
