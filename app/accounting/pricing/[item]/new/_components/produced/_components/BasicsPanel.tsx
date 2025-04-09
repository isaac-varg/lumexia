"use client"
import Card from '@/components/Card'
import Text from '@/components/Text'
import useDialog from '@/hooks/useDialog'
import { usePricingProducedSelection } from '@/store/pricingProducedSlice'
import React, { useEffect } from 'react'
import MissingBomDataAlert from './MissingBomDataAlert'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'

const BasicsPanel = () => {

    const { bomObject } = usePricingProducedSelection()
    const { showDialog } = useDialog()

    useEffect(() => {

        if (!bomObject) return;

        if (bomObject.missingPricingData.length !== 0) {
            showDialog("missingBomData")
        }
    }, [bomObject])


    return (
        <div className='col-span-2'>
            <Card.Root>
                <MissingBomDataAlert />
                <Card.Title>Basics</Card.Title>

                <div className='flex justify-between gap-x-4'>
                    <div className='flex flex-col gap-y-2 w-2/3'>


                        {!bomObject && (<>
                            <div className="skeleton h-4 w-full"></div>

                            <div className="skeleton h-4 w-full"></div>
                        </>
                        )}

                        {bomObject && (<>
                            <Text.LabelDataPair
                                label='BOM $/batch'
                                tooltip='The overall cost of each material at the concentration that they are put into the batch. Also includes things like Production Usage Cost, Arrival Cost, etc.'
                                data={`${bomObject?.overallBomCostPerBatch}`}
                            />

                            <Text.LabelDataPair
                                label='BOM Count'
                                tooltip='The amount of items in the BOM'
                                data={bomObject?.bom.length || 0}

                            /></>)}



                    </div>

                    {!bomObject && (<div className='rounded-xl flex w-1/3 flex-col h-32 skeleton' />)}

                    {bomObject && (
                        <div className=' rounded-xl flex w-1/3 flex-col gap-y-2 p-2 bg-sky-800 items-center justify-center'>
                            <h1 className='font-poppins font-bold text-6xl text-white'>{toFracitonalDigits.curreny(bomObject?.overallBomCostPerLb || 0)}</h1>
                            <h2 className='font-poppins font-semibold text-lg text-neutral-300'>{`$/lb`}</h2>
                        </div>
                    )}


                </div>


            </Card.Root>
        </div>
    )
}

export default BasicsPanel
