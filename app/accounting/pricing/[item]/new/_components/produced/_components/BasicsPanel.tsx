"use client"
import Card from '@/components/Card'
import Text from '@/components/Text'
import { usePricingProducedSelection } from '@/store/pricingProducedSlice'
import React from 'react'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import { BatchSummations } from '../_functions/getBomPricingSummations'

const BasicsPanel = () => {

    const { producedPricingSummations } = usePricingProducedSelection()

    const summations = producedPricingSummations?.isError ? null : producedPricingSummations as BatchSummations


    return (
        <div className='col-span-2'>
            <Card.Root>
                <Card.Title>Basics</Card.Title>

                <div className='flex justify-between gap-x-4'>
                    <div className='flex flex-col gap-y-2 w-2/3'>


                        {!summations && (<>
                            <div className="skeleton h-4 w-full"></div>

                            <div className="skeleton h-4 w-full"></div>

                            <div className="skeleton h-4 w-full"></div>
                        </>
                        )}

                        {summations && (<>

                            <Text.LabelDataPair
                                label='Labor Cost'
                                tooltip='The fixed labour cost times the tank time'
                                data={summations.laborCost}

                            />
                            <Text.LabelDataPair
                                label='BOM $/batch'
                                tooltip='The overall cost of each material at the concentration that they are put into the batch. Also includes things like the items Production Usage Cost, Arrival Cost, etc.'
                                data={`${summations.totalBomCostPerBatch}`}
                            />
                            <Text.LabelDataPair
                                label='BOM $/lb'
                                tooltip='The overall cost of each material at the concentration that they are put into the batch. Also includes things like the items Production Usage Cost, Arrival Cost, etc.'
                                data={`${summations.totalBomCostPerLb}`}
                            />

                            <Text.LabelDataPair
                                label='Total $/batch'
                                tooltip='The overall cost of everything per batch'
                                data={`${summations.totalBomCostPerBatch}`}
                            />
                        </>)}



                    </div>

                    {!summations && (<div className='rounded-xl flex w-1/3 flex-col h-32 skeleton' />)}

                    {summations && (
                        <div className=' rounded-xl flex w-1/3 flex-col gap-y-2 p-2 bg-sky-800 items-center justify-center'>
                            <h1 className='font-poppins font-bold text-6xl text-white'>{toFracitonalDigits.curreny(summations.totalCostPerLb)}</h1>
                            <h2 className='font-poppins font-semibold text-lg text-neutral-300'>{`total $/lb`}</h2>
                        </div>
                    )}


                </div>


            </Card.Root>
        </div>
    )
}

export default BasicsPanel
