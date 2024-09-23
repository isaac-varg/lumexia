"use client"
import { BatchProductionRecord } from '@/types/batchProductionRecord'
import { useRouter } from 'next/navigation'
import React from 'react'

const BprCard = ({ bpr }: { bpr: BatchProductionRecord }) => {

  const router = useRouter()

  const handleClick = () => {
    router.push(`/production/quality/${bpr.referenceCode}?id=${bpr.id}`)
  }
  return (
    <div className='flex flex-col bg-neutral-100 rounded-lg p-4 gap-y-4 hover:cursor-pointer hover:bg-neutral-200' onClick={() => handleClick()}>
      <h1 className='font-poppins font-bold text-2xl text-neutral-800'>{bpr.referenceCode} </h1>
      <h1 className='font-poppins font-bold text-2xl text-neutral-600'>{bpr.mbpr.producesItem.name} </h1>
      <div className='flex w-full'>
        <div className='rounded-lg px-4 py-2 bg-orange-200 font-poppins font-semibold text-orange-900'>{bpr.status.name}</div>
      </div>
    </div>
  )
}

export default BprCard
