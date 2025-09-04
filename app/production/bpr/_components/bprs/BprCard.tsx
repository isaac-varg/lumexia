"use client"

import useDialog from '@/hooks/useDialog'
import { BatchProductionRecord } from '@/types/batchProductionRecord'
import { useRouter } from 'next/navigation'
import React from 'react'

const classes = {
  bg: {
    default: 'bg-base-100/30 hover:bg-base-100/50',
    darker: 'bg-base-100/50 hover:bg-accent/30'
  }
}

type BprCardProps = {
  bpr: BatchProductionRecord
  bg?: keyof typeof classes.bg
  isInactive?: boolean
}

const BprCard = ({ bpr, bg = 'default', isInactive = false }: BprCardProps) => {
  const router = useRouter()
  const { showDialog } = useDialog()

  const handleClick = () => {
    if (isInactive) {
      showDialog('noScheduleDate')
      return;
    }
    router.push(`/production/bpr/${bpr.referenceCode}?id=${bpr.id}`)
  }
  return (
    <div onClick={() => handleClick()} className={`hover:cursor-pointer  rounded-lg flex py-4 px-4 flex-col gap-y-4 ${classes.bg[bg]} `}>
      <h1 className="font-bold text-base-content font-poppins text-xl"># {bpr.referenceCode} </h1>


      {bpr.lotOrigin && <h1 className="font-bold font-poppins text-xl">{bpr.lotOrigin.lot?.lotNumber} </h1>}

      <h1 className="font-bold font-poppins text-xl">{bpr.mbpr.producesItem.name} </h1>
    </div>

  )
}

export default BprCard
