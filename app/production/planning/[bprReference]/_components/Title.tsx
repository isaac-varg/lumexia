import { BatchProductionRecord } from '@/types/batchProductionRecord'
import React from 'react'
import { TbSlash, TbSlashes } from 'react-icons/tb'

const Title = ({bpr} : { bpr: BatchProductionRecord}) => {

    console.log('bpr', bpr)
  return (
    <div className='flex flex-col gap-y-4 items-center justify-center'>
        <h1 className='font-poppins font-bold text-5xl text-neutral-800'>{bpr.mbpr.producesItem.name}</h1>

        <span className='flex gap-x-4 items-center text-neutral-700'>
        <h1 className='font-poppins font-bold text-5xl '>BPR #{bpr.referenceCode}</h1>
        <span className='text-6xl'><TbSlashes /></span>
        {bpr.lotOrigin[0] && <h1 className='font-poppins font-bold text-5xl '>Lot #{bpr.lotOrigin[0].lot?.lotNumber}</h1>}
        </span>
    </div>
  )
}

export default Title
