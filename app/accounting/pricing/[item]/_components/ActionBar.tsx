"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { getSlug } from '@/utils/general/getSlug'

const ActionBar = ({
  itemId,
  itemName,
}: {
  itemId: string,
  itemName: string
}) => {

  const router = useRouter()
  const handleNew = () => {
    const slugName = getSlug(itemName)
    router.push(`/accounting/pricing/${slugName}/new?id=${itemId}`)
  }
  return (
    <div className='flex justify-between'>
      <div>
        <button className='btn btn-neutral' onClick={() => handleNew()}>New</button>
      </div>
      <div className=''>
      </div>
    </div>
  )
}

export default ActionBar
