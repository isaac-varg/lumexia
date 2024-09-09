import { BatchProductionRecord } from '@/types/batchProductionRecord'
import React from 'react'

const Title = ({bpr} : {bpr: BatchProductionRecord}) => {
  return (
    <div className='flex flex-col gap-y-2'>
        <h1 className='font-poppins font-bold text-2xl'>{bpr.mbpr.producesItem.name}</h1>
    </div>
  )
}

export default Title
