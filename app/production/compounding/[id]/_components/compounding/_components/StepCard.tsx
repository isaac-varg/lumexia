"use client"

import { ExBprBatchStep } from '@/types/bprBatchStep'
import { useRouter } from 'next/navigation'
import React from 'react'

const StepCard = ({ step, isReadOnly }: { step: ExBprBatchStep, isReadOnly: boolean }) => {

    if (!step) { return null }

    const { sequence, phase, label } = step.batchStep;
    const router = useRouter()
    const handleClick = () => {
        router.push(`/production/compounding/${step.bpr.referenceCode}/step/${sequence}?id=${step.id}&isReadOnly=${isReadOnly}`)
    }
    return (
        <div onClick={() => handleClick()} className='flex flex-col p-4 rounded-lg border-2 border-neutral-600'>
            <h1>{sequence}</h1>
            <p>{phase}</p>
            <p>{label}</p>
        </div>
    )
}

export default StepCard 
