"use client"

import { BatchProductionRecord } from '@/types/batchProductionRecord'
import { useRouter } from 'next/navigation'
import React from 'react'

type BprCardProps = {
    bpr: BatchProductionRecord
}

const BprCard = ({ bpr }: BprCardProps) => {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/production/compounding/${bpr.referenceCode}?id=${bpr.id}`)
    }
    return (
        <div onClick={() => handleClick()} className="border border-neutral-800 rounded-lg flex py-4 px-2 flex-col gap-y-4">
            <h1 className="font-bold font-poppins text-xl"># {bpr.referenceCode} </h1>


            {bpr.lotOrigin[0] && <h1 className="font-bold font-poppins text-xl">{bpr.lotOrigin[0].lot?.lotNumber} </h1> }

            <h1 className="font-bold font-poppins text-xl">{bpr.mbpr.producesItem.name} </h1>
        </div>

    )
}

export default BprCard
