'use client'
import React from 'react'
import { IPurchasingRequest } from '../_functions/getRequests'
import { useRouter } from 'next/navigation'

type RequestCardProps = {
    request: IPurchasingRequest
}

const RequestCard = ({ request }: RequestCardProps) => {

    const router = useRouter()

    const handleClick = () => {
        router.push(`/purchasing/requests/${request.referenceCode}?id=${request.id}`)
    }
    return (
        <div className='card bg-base-300 hover:cursor-pointer' onClick={handleClick}>
            <div className='card-body'>
                <span className='text-xl font-semibold'>{`${request.title} <REQ# ${request.referenceCode}>`}</span>
            </div>

        </div>
    )
}

export default RequestCard
