import React from 'react'
import { IPurchasingRequest } from '../_functions/getRequests'
import RequestCard from './RequestCard'
import { RequestStatus } from '../[referenceCode]/_functions/getRequestStatuses'
import { RequestPriority } from '../_functions/getPriorities'

type PanelProps = {
    requests: IPurchasingRequest[]
    statuses: RequestStatus[]
    priorities: RequestPriority[]
}

const NewRequestsPanel = ({ requests, statuses , priorities }: PanelProps) => {
    return (
        <div className='card bg-base-200'>
            <div className='card-body'>

                <h2 className='card-title'>New Requests</h2>


                <div className='grid grid-cols-3 gap-4'>
                    {requests.map((request) => <RequestCard priorities={priorities} statuses={statuses} key={request.id} request={request} />)}
                </div>

            </div>

        </div>
    )
}

export default NewRequestsPanel
