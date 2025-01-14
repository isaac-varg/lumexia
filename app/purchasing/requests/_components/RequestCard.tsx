import React from 'react'
import { IPurchasingRequest } from '../_functions/getRequests'

type RequestCardProps = {
    request: IPurchasingRequest
}

const RequestCard = ({ request }: RequestCardProps) => {
    return (
        <div className='card bg-base-300'>
            <div className='card-body'>
                <span className='text-xl font-semibold'>{request.title}</span>
            </div>

        </div>
    )
}

export default RequestCard
