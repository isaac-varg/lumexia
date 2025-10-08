"use client"
import Tag from '@/components/Text/Tag'
import TagLabel from '@/components/Text/TagLabel'
import useProduction from '@/hooks/useProduction'
import { useProductionActions } from '@/store/productionSlice'
import { BatchProductionRecord } from '@/types/batchProductionRecord'
import { useRouter } from 'next/navigation'
import React from 'react'
import { MdOilBarrel } from 'react-icons/md'

const BprCard = ({ bpr, isSecondary = false }: { bpr: BatchProductionRecord, isSecondary: boolean }) => {

  const { setIsSecondaryVerificationMode } = useProduction()
  const { setQualityMode } = useProductionActions()

  const router = useRouter()

  const handleClick = () => {
    setIsSecondaryVerificationMode(isSecondary);
    setQualityMode(isSecondary ? 'secondary' : 'primary');
    router.push(`/production/bpr/${bpr.referenceCode}?id=${bpr.id}`)
  }
  return (
    <div className='flex flex-col bg-base-300 rounded-lg p-4 gap-y-4 hover:cursor-pointer hover:bg-accent/50' onClick={() => handleClick()}>
      <div className='flex justify-between items-center'>
        <h1 className='font-poppins font-bold text-2xl text-base-content/80'>{bpr.referenceCode} </h1>
        <span className='text-3xl'><MdOilBarrel /></span>
      </div>
      <h1 className='font-poppins font-bold text-2xl text-base-content/60'>{bpr.mbpr.producesItem.name} </h1>
      <div className='flex w-full'>
        <div className='rounded-lg px-4 py-2 bg-secondary/50 font-poppins font-semibold text-secondary-content'>{bpr.status.name}</div>
      </div>
    </div >
  )
}

export default BprCard
