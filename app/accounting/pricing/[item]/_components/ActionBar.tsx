"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const ActionBar = ({
    itemId,
    itemName,
}: {
    itemId: string,
    itemName: string
}) => {

    const router = useRouter()
    const handleNew = () => {
        router.push(`/accounting/pricing/${itemName}/new?id=${itemId}`)
    }
    return (
        <div className='flex justify-between'>
            <div>
                <button className='btn' onClick={() => handleNew()}>New</button>
            </div>
            <div className=''>
            </div>
        </div>
    )
}

export default ActionBar
