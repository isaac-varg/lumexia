'use client'
import { SinglePricingExaminationCombined } from '@/actions/accounting/examinations/getOne'
import Card from '@/components/Card'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import React from 'react'
import { getProfit } from '../../_calculations/getProfit'

const DataBox = ({ bigNumber, label, sublabel }: { bigNumber: string | number, label: string, sublabel: string }) => {
    return (
        <div className='rounded-xl text-neutral-900 p-5 bg-lilac-400 flex flex-col gap-y-2 items-center justify-center text-center'>
            <p className='font-poppins  text-2xl font-semibold'>
                {bigNumber}
            </p>
            <p className='font-poppins text-base'>
                {label}
            </p>
            <p className='font-poppins text-base'>
                {sublabel}
            </p>
        </div>

    )

}

const ConsumerContainerPanel = ({ exam }: { exam: SinglePricingExaminationCombined }) => {

    console.log(exam.itemPricingDataArchive)
    return (
        <Card.Root>
            <Card.Title>Consumer Containers</Card.Title>

            <div className='grid grid-cols-3 gap-6'>

                {exam.filledConsumerContainerArchives.map((container) => {

                    const profit = getProfit(container.)
                    return (
                        <div
                            key={container.id}
                            className='bg-lilac-100 p-6 rounded-xl flex flex-col gap-y-4'
                        >

                            <h1 className='font-poppins font-semibold text-lg'>{container.consumerContainerArchive.containerItem.name}</h1>


                            <div className='grid grid-cols-2'>
                                <DataBox />
                            </div>
                        </div>
                    )
                })}

            </div>

        </Card.Root>
    )
}

export default ConsumerContainerPanel
