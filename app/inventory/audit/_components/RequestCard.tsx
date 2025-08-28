'use client'
import { AuditRequest } from '@/actions/inventory/getAuditRequests'
import { DateTime } from 'luxon'
import { useRouter } from 'next/navigation'
import React from 'react'
import { TbCalendar, TbGhost } from 'react-icons/tb'

const RequestCard = ({ request }: { request: AuditRequest }) => {


  const router = useRouter();
  const formatString = "ccc, LLL dd yyyy"
  const requestId = request.id

  const handleClick = () => {
    router.push(`/inventory/audit/request?id=${requestId}`)
  }
  return (
    <div
      onClick={() => handleClick()}
      className='card bg-base-200  hover:cursor-pointer hover:bg-accent/20' >
      <div className='card-body flex flex-col gap-y-2'>
        <div className='card-title'>{request.item.name}</div>
        <div className='flex gap-x-2'>
          <div className='flex gap-x-2 bg-secondary items-center rounded-xl px-2 py-1'>
            <span className='text-2xl text-secondary-content'><TbGhost /></span>
            <p className='text-xl text-base-content font-poppins font-medium'>{request.requestedBy.name}</p>
          </div>

          <div className='flex gap-x-2 bg-primary items-center rounded-xl px-2 py-1'>
            <span className='text-2xl text-primary-content'><TbCalendar /></span>
            <p className='text-xl font-poppins text-primary-content font-medium'>{DateTime.fromJSDate(request.createdAt).toFormat(formatString)}</p>
          </div>

        </div>

      </div>
    </div>

  )
}

export default RequestCard
