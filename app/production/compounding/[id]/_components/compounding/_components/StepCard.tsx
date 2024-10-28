"use client"

import { ExBprBatchStep } from '@/types/bprBatchStep'
import { useRouter } from 'next/navigation'
import React from 'react'
import { TbLock } from 'react-icons/tb'
import { isReadable } from 'stream'

const StepCard = ({ step, isReadOnly, isLocked }: { step: ExBprBatchStep, isReadOnly: boolean, isLocked: boolean }) => {
    const router = useRouter()
    
    if (!step) { return null }

    const { sequence, phase, label } = step.batchStep;
    const handleClick = () => {
        router.push(`/production/compounding/${step.bpr.referenceCode}/step/${sequence}?id=${step.id}&isReadOnly=${isReadOnly}&isLocked=${isLocked}`)
    }


    const classes = {
        bg: {
            readOnly: 'border-2 border-neutral-200 bg-neutral-200 hover:border-neutral-500 hover:bg-neutral-400',
            base: 'border-2 border-indigo-300 bg-indigo-300 hover:border-indigo-500 hover:bg-indigo-400'
        }

    }

    return (
        <div onClick={() => handleClick()} className={`flex flex-col hover:cursor-pointer p-4 rounded-lg ${isReadOnly || isLocked ? classes.bg.readOnly : classes.bg.base}`}>
            <div className='flex items-center justify-between'>
                <h1 className='font-poppins text-2xl font-semibold'>{label}</h1>
                {isLocked ? <span className='text-4xl'><TbLock /></span> : <div/>}
            </div>
            <p className='font-poppins-text-xl font-semibold uppercase'>{`Step : ${sequence}.${phase}`}</p>
        </div>
    )
}

export default StepCard 
