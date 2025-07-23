'use client'
import { SinglePricingFinishedProduct } from '@/actions/accounting/examinations/getOne'
import Card from '@/components/Card'
import { Panels } from '@/components/Panels'
import SectionTitle from '@/components/Text/SectionTitle'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import React from 'react'

const DataBox = ({ bigNumber, label, sublabel, isBad }: { bigNumber: string | number, label: string, sublabel: string, isBad?: boolean }) => {

    const bg = `${isBad ? 'bg-rose-300' : 'bg-lilac-300'}`

    return (
        <div className={`rounded-xl text-neutral-800 p-5 ${bg} flex flex-col gap-y-2 items-center justify-center text-center`}>
            <p className='font-poppins font-semibold text-base'>
                {sublabel}
            </p>
            <p className='font-poppins  text-3xl font-semibold'>
                {bigNumber}
            </p>
            <p className='font-poppins text-base'>
                {label}
            </p>

        </div>

    )

}

const FinishedProductsPanel = ({ finishedProducts }: { finishedProducts: SinglePricingFinishedProduct[] }) => {

    return (
        <Card.Root>
            <Card.Title>Finished Products</Card.Title>

            <div className='grid grid-cols-2 gap-6'>

                {finishedProducts.map((fp) => {

                    const { profitPercentage, profit } = fp;
                    const isBad = profitPercentage < 25;

                    return (
                        <Panels.Root
                            key={fp.id}
                        >

                        <SectionTitle size='normal'>{fp.name}</SectionTitle>


                            <div className='grid grid-cols-2 gap-4'>

                                <DataBox bigNumber={toFracitonalDigits.curreny(fp.consumerPrice)} label='$/container' sublabel='Website Price' />
                                <DataBox bigNumber={toFracitonalDigits.curreny(fp.finishedProductTotalCost)} label={'$/container'} sublabel={'Cost'} isBad={isBad} />
                                <DataBox bigNumber={toFracitonalDigits.curreny(profit)} label='$' sublabel='Profit' isBad={isBad} />
                                <DataBox bigNumber={toFracitonalDigits.curreny(profitPercentage)} label='%' sublabel='Profit %' isBad={isBad} />
                            </div>
                        </Panels.Root>
                    )
                })}

            </div>

        </Card.Root>
    )
}

export default FinishedProductsPanel
