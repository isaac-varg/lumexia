"use client"
import React from 'react'
import { RequestDetails } from '../_functions/getRequest'
import { DateTime } from 'luxon'
import { useRouter } from 'next/navigation'
import { getSlug } from '@/utils/general/getSlug'

type PageTitleProps = {
  request: RequestDetails
}


const RequestDetailsPageTitle = ({ request }: PageTitleProps) => {

  const router = useRouter()
  const path = `/inventory/items/${getSlug(request.item.name)}?id=${request.item.id}`

  return (
    <div className='flex justify-start items-center gap-x-4'>
      <h1
        onClick={() => router.push(path)}
        className="text-4xl font-poppins font-semibold text-base-content underline decoration-wavy hover:cursor-pointer hover:text-accent">{request.item.name}</h1>
      <div className='bg-secondary/70 rounded-xl py-2 px-4'>
        <span className='text-2xl font-poppins font-semibold text-secondary-content'>Week {DateTime.fromJSDate(request.createdAt).toFormat('WW')}</span>
      </div>

      <div className='bg-primary/70 rounded-xl py-2 px-4'>
        <span className='text-2xl font-poppins font-semibold text-primary-content'>Request {request.referenceCode}</span>
      </div>

    </div>
  )
}

export default RequestDetailsPageTitle
