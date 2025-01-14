import React from 'react'
import { IPurchasingRequest } from '../_functions/getRequests'
import RequestCard from './RequestCard'

type PanelProps = {
    requests: IPurchasingRequest[]
}

const NewRequestsPanel = ({ requests } : PanelProps) => {
    return (
        <div className='card bg-base-200'>
            <div className='card-body'>

                <h2 className='card-title'>New Requests</h2>


                <div className='grid grid-cols-3 gap-4'>
                    {requests.map((request) => <RequestCard key={request.id} request={request} />)}
                </div>

            </div>

        </div>
    )
}

export default NewRequestsPanel
