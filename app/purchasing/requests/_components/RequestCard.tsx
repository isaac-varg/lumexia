'use client'
import React from 'react'
import { IPurchasingRequest } from '../_functions/getRequests'
import { useRouter } from 'next/navigation'
import Dropdown from '@/components/Dropdown'
import { RequestStatus } from '../[referenceCode]/_functions/getRequestStatuses'
import { RequestPriority } from '../_functions/getPriorities'
import { Prisma } from '@prisma/client'
import DateBadge from './DateBadge'
import { updateRequest } from '../_functions/updateRequest'

type RequestCardProps = {
    request: IPurchasingRequest
    statuses: RequestStatus[]
    priorities: RequestPriority[]
}

const RequestCard = ({ request, statuses, priorities }: RequestCardProps) => {

    const router = useRouter()

    const statusOptions = statuses.map((status) => ({
        label: status.name,
        value: status.id,
        ...status,
    }));

    const priorityOptions = priorities.map((p) => ({
        label: p.name,
        value: p.id,
        ...p,
    }));


    const handleClick = () => {
        router.push(`/purchasing/requests/${request.referenceCode}?id=${request.id}`)
    }

    const handleDropdownClick = async (value: string, mode: 'priority' | 'status') => {


        let payload: Prisma.PurchasingRequestUncheckedUpdateInput = {
            statusId: value
        };

        if (mode === 'priority') {
            payload = {
                priorityId: value
            }
        };


        await updateRequest(request.id, payload)
    }

    return (
        <div
            onClick={() => handleClick()}
            className='card bg-white bg-opacity-70 border-neutral-800/50 border-2 hover:cursor-pointer hover:bg-lilac-300' >
            <div className='card-body flex flex-col gap-y-2'>
                <div className='card-title'>{request.item.name}</div>


                <Dropdown.Badge
                    onClick={(value) => handleDropdownClick(value, 'status')}
                    bgColor={request.status.bgColor}
                    textColor={request.status.textColor}
                    label={request.status.name}
                    options={statusOptions}
                />

                <Dropdown.Badge
                    onClick={(value) => handleDropdownClick(value, 'priority')}
                    bgColor={request.priority.bgColor}
                    textColor={request.priority.textColor}
                    label={request.priority.name}
                    options={priorityOptions}
                />

                <DateBadge request={request} />

            </div>

        </div>
    )
}

export default RequestCard
