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
    <button className='btn btn-xl btn-success' onClick={() => handleClick()} >
      Complete
    </button>

  )
}

export default CompleteButton
