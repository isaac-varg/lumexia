'use client'
import { SinglePricingExaminationCombined } from '@/actions/accounting/examinations/getOne'
import Card from '@/components/Card'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import React from 'react'
import { getProfit } from '../../_calculations/getProfit'
import { staticRecords } from '@/configs/staticRecords'
import { getContainerCost } from '../../_calculations/getContainerCost'
import { getArchiveContainerCost } from '../_calculations/getArchiveContainerCost'
import { getProfitPercentage } from '../../_calculations/getProfitPercentage'

const DataBox = ({ bigNumber, label, sublabel, isBad }: { bigNumber: string | number, label: string, sublabel: string, isBad?: boolean }) => {

    const bg = `${isBad ? 'bg-rose-300' : 'bg-lilac-300'}`


    return (
        <div className={`rounded-xl text-neutral-900 p-5 ${bg} flex flex-col gap-y-2 items-center justify-center text-center`}>
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

    const isProduced = exam.examinedItem.procurementType.id === staticRecords.inventory.procurementTypes.produced;
    const overallCostPerLb = isProduced ? exam.producedPricingDataArchives[0].bomCostPerLb : exam.itemPricingDataArchive[0].overallItemCost;



    return (
        <Card.Root>
            <Card.Title>Consumer Containers</Card.Title>

            <div className='grid grid-cols-2 gap-6'>

                {exam.filledConsumerContainerArchives.map((container) => {

                    const overAllCost = getArchiveContainerCost(container, overallCostPerLb)
                    const profit = getProfit(overAllCost, container.consumerPrice);
                    const profitPercentage = getProfitPercentage(profit, overAllCost);
                    const profitPercentageThreshold = 25
                    const isBad = profitPercentage < profitPercentageThreshold;

                    return (
                        <div
                            key={container.id}
                            className='bg-lilac-100 p-6 rounded-xl flex flex-col gap-y-4'
                        >

                            <h1 className='font-poppins font-semibold text-lg'>{container.consumerContainerArchive.containerItem.name}</h1>


                            <div className='grid grid-cols-3 gap-4'>
                                <DataBox bigNumber={toFracitonalDigits.curreny(overAllCost)} label={'$/container'} sublabel={'Cost'} isBad={isBad} />
                                <DataBox bigNumber={toFracitonalDigits.curreny(profit)} label='$' sublabel='Profit' isBad={isBad} />
                                <DataBox bigNumber={toFracitonalDigits.curreny(profitPercentage)} label='%' sublabel='Profit %' isBad={isBad} />
                            </div>
                        </div>
                    )
                })}

            </div>

        </Card.Root>
    )
}

export default ConsumerContainerPanel
