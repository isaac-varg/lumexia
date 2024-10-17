"use client"
import useProduction from '@/hooks/useProduction'
import { useRouter } from 'next/navigation'
import React from 'react'
import { TbClipboardHeart } from 'react-icons/tb'

const CompoundingStepCard = ({ step, isSecondary = false }: { step: any, isSecondary: boolean }) => {

    const { setIsSecondaryVerificationMode } = useProduction()

    const router = useRouter()

    const handleClick = () => {
        setIsSecondaryVerificationMode(isSecondary);
        router.push(`/production/quality/step/${step.bprBatchStep.batchStep.sequence}?bprStepId=${step.bprBatchStepId}`)
    }
    return (
        <div className='flex flex-col bg-swirl-100 rounded-lg p-4 gap-y-4 hover:cursor-pointer hover:bg-swirl-200' onClick={() => handleClick()}>
            <div className='flex justify-between items-center'>
                <h1 className='font-poppins font-bold text-2xl text-neutral-800'>{step.bprBatchStep.bpr.referenceCode}</h1>
                <span className='text-3xl'><TbClipboardHeart /></span>
            </div>
            <h1 className='font-poppins font-bold text-2xl text-neutral-600'>{step.bprBatchStep.bpr.mbpr.producesItem.name} </h1>
            <div className='flex w-full'>
                <div className='rounded-lg px-4 py-2 bg-blue-dianne-200 font-poppins font-semibold text-blue-dianne-900'>{step.bprBatchStep.bpr.status.name}</div>
            </div>
        </div>
    )
}

export default CompoundingStepCard
