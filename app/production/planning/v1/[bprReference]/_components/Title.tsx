'use client'
import { usePlanningDashboardSelection } from '@/store/planningDashboardSlice'
import React from 'react'
import { TbSlashes } from 'react-icons/tb'

const Title = () => {

  const { bpr } = usePlanningDashboardSelection()

  if (!bpr) return false;

  return (
    <div className='flex flex-col gap-y-4 items-center justify-center'>
      <h1 className='font-poppins font-bold text-5xl text-base-content'>{bpr.mbpr.producesItem.name}</h1>

      <span className='flex gap-x-4 items-center text-neutral-700'>
        <h1 className='font-poppins font-bold text-5xl '>BPR #{bpr.referenceCode}</h1>
        <span className='text-6xl'><TbSlashes /></span>
        {bpr.lotOrigin && <h1 className='font-poppins font-bold text-5xl '>Lot #{bpr.lotOrigin.lot.lotNumber}</h1>}
      </span>
    </div>
  )
}

export default Title
