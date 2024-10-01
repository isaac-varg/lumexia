"use client"

import {  ExBprBom } from '@/types/bprBom'
import { useRouter } from 'next/navigation'
import React from 'react'

const EntryCard = ({ bomItem }: { bomItem: ExBprBom }) => {
  
  const router = useRouter()

  const handleClick = ( ) => {
    router.push(`/production/quality/${bomItem.bpr.referenceCode}/${bomItem.bom.identifier}?bprBomId=${bomItem.id}&bprId=${bomItem.bprId}`)
  }
  return (
    <div onClick={() => handleClick()} className='flex flex-col p-4 rounded-lg border-2 border-neutral-600'>
      <h1>{bomItem.bom.identifier}</h1>
      <p>{bomItem.bom.item.name}</p>
    </div>

  )
}

export default EntryCard
