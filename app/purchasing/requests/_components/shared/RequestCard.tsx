'use client'
import React from 'react'
import { IPurchasingRequest } from '../../_functions/getRequests'
import { useRouter } from 'next/navigation'
import Dropdown from '@/components/Dropdown'
import { Prisma } from '@prisma/client'
import DateBadge from './DateBadge'
import { updateRequest } from '../../_functions/updateRequest'
import { usePurchasingRequestSelection } from '@/store/purchasingRequestSlice'
import { DateTime } from 'luxon'
import { dateFormatString, dateFormatWithTime } from '@/configs/data/dateFormatString'

type RequestCardProps = {
  request: IPurchasingRequest
}

const RequestCard = ({ request }: RequestCardProps) => {

  const router = useRouter()
  const { options } = usePurchasingRequestSelection()

  const statusOptions = options.statuses.map((status) => ({
    label: status.name,
    value: status.id,
    ...status,
  }));

  const priorityOptions = options.priorities.map((p) => ({
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
    location.reload()
  }

  return (
    <div
      onClick={() => handleClick()}
      className='card bg-white bg-opacity-70 border-neutral-800/50 border-2 hover:cursor-pointer hover:bg-lilac-300' >
      <div className='card-body flex flex-col gap-y-2'>
        <div className='flex flex-col'>
          <div className='text-xs text-base-content/65'>{DateTime.fromJSDate(request.createdAt).toFormat(dateFormatWithTime)}</div>
          <div className='card-title'>{`${request.item.name}`}</div>
        </div>

        <div className='flex flex-row flex-wrap gap-1 '>
          <div className='flex items-center justify-center px-2 py-2   bg-neutral-300 rounded-xl '>
            <p className='font-poppins w-8 text-center font-semibold text-sm text-base-content'>{`${request.referenceCode}`}</p>
          </div>
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

        </div>

        <DateBadge request={request} />

      </div>

    </div>
  )
}

export default RequestCard
