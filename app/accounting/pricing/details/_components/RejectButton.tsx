'use client'

import { accountingActions } from '@/actions/accounting'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaRegThumbsDown } from 'react-icons/fa'

type Props = {
  examId: string
}

const RejectButton = ({ examId }: Props) => {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const handleReject = async () => {
    if (isPending) return
    setIsPending(true)

    try {
      await accountingActions.examinations.reject(examId)
      router.back()
    } catch (error) {
      console.error('Error rejecting examination:', error)
      alert('Failed to reject examination')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <button
      onClick={handleReject}
      disabled={isPending}
      className={`btn btn-warning ${isPending ? 'loading' : ''}`}
    >
      {!isPending && <FaRegThumbsDown />}
      {isPending ? 'Rejecting...' : 'Reject'}
    </button>
  )
}

export default RejectButton
