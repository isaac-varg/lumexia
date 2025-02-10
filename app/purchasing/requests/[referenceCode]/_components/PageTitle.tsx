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
                className="text-4xl font-poppins font-semibold text-gray-800 underline decoration-wavy hover:cursor-pointer hover:text-lilac-800">{request.item.name}</h1>
            <div className='bg-lilac-400 rounded-xl py-2 px-4'>
                <span className='text-2xl font-poppins font-semibold text-lilac-900'>Week {DateTime.fromJSDate(request.createdAt).toFormat('WW')}</span>
            </div>

            <div className='bg-indigo-300 rounded-xl py-2 px-4'>
                <span className='text-2xl font-poppins font-semibold text-indigo-900'>Request {request.referenceCode}</span>
            </div>

        </div>
    )
}

export default RequestDetailsPageTitle
