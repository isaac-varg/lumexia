'use client'
import { AuditRequest } from '@/actions/inventory/getAuditRequests'
import { DateTime } from 'luxon'
import { useRouter } from 'next/navigation'
import React from 'react'
import { TbCalendar, TbGhost } from 'react-icons/tb'

const RequestCard = ({ request }: { request: AuditRequest }) => {


    const formatString = "ccc, LLL dd yyyy"
    const router = useRouter();

    const handleClick = () => {
        router.push(`/inventory/audit/request?auditRequestId=${request.id}`)
    }
    return (
        <div
            onClick={() => handleClick()}
            className='card bg-rose-200  hover:cursor-pointer hover:bg-rose-300' >
            <div className='card-body flex flex-col gap-y-2'>
                <div className='card-title'>{request.item.name}</div>

                <div className='flex gap-x-2'>
                    <div className='flex gap-y-2 bg-pink-400 items-center rounded-xl px-2 py-1'>
                        <span className='text-2xl'><TbGhost /></span>
                        <p className='text-xl font-poppins font-medium'>{request.requestedBy.name}</p>
                    </div>

                    <div className='flex gap-y-2 bg-pink-400 items-center rounded-xl px-2 py-1'>
                        <span className='text-2xl'><TbCalendar /></span>
                        <p className='text-xl font-poppins font-medium'>{DateTime.fromJSDate(request.createdAt).toFormat(formatString)}</p>
                    </div>

                </div>

            </div>
        </div>

    )
}

export default RequestCard
