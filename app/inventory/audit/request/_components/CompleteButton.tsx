'use client'
import React from 'react'
import { completeAuditRequest } from '../_functions/completeAuditRequest'
import { useRouter } from 'next/navigation'

const CompleteButton = ({ requestId, itemId }: { requestId: string, itemId: string }) => {

    const router = useRouter()

    if (!requestId) {
        throw new Error("Request")
    }

    if (!itemId) {
        throw new Error('item')
    }

    const handleClick = async () => {
        const response = await completeAuditRequest(requestId, itemId)
        router.back()
    }
    return (
        <div className='bg-emerald-200 hover:bg-emerald-300 rounded-xl px-4 py-6' onClick={() => handleClick()} >
            <p className='text-2xl font-bold font-poppins items-center justify-center'>Complete</p>
        </div>

    )
}

export default CompleteButton
