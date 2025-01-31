'use client'
import React, { useState } from 'react'
import { IPurchasingRequest } from '../_functions/getRequests'
import { useRouter } from 'next/navigation'
import Dropdown from '@/components/Dropdown'
import { RequestStatus } from '../[referenceCode]/_functions/getRequestStatuses'

type RequestCardProps = {
    request: IPurchasingRequest
    statuses: RequestStatus[]
}

const RequestCard = ({ request, statuses }: RequestCardProps) => {

    const router = useRouter()
    const [statusActive, setStatusActive] = useState(true)

    const statusOptions = statuses.map((status) => ({
        label: status.name,
        value: status.id,
        ...status,
    }));


    const handleClick = () => {
        router.push(`/purchasing/requests/${request.referenceCode}?id=${request.id}`)
    }
    return (
        <div className='card bg-white bg-opacity-40 hover:cursor-pointer hover:bg-lilac-300' >
            <div className='card-body flex flex-col gap-y-2'>
                <div className='card-title'>{request.item.name}</div>

                <Dropdown.Badge
                    onClick={(value) => console.log(value)}
                    bgColor={request.status.bgColor}
                    textColor={request.status.textColor}
                    label={request.status.name}
                    options={statusOptions}
                />

            </div>

        </div>
    )
}

export default RequestCard
