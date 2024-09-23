"use client"
import { BatchProductionRecord } from '@/types/batchProductionRecord'
import React from 'react'

const Title = ({bpr} : {bpr: BatchProductionRecord}) => {
  return (
    <div className='flex flex-col gap-y-2'>
        <h2 className='font-poppins font-bold text-2xl'>BPR #{bpr.referenceCode}</h2>
        <h1 className='font-poppins font-bold text-2xl'>{bpr.mbpr.producesItem.name}</h1>
        <div className='h-1 w-full bg-neutral-400 ' />
    </div>
  )
}

export default Title
