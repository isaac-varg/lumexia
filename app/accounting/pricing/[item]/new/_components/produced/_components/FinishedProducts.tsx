'use client'
import Card from '@/components/Card'
import React, { useState } from 'react'
import { FilledConsumerContainer } from '@/actions/accounting/consumerContainers/getAllByFillItem'
import { usePricingProducedSelection } from '@/store/pricingProducedSlice'
import SelectedConsumerContainerPanel from './SelectedConsumerContainerPanel'

const FinishedProducts = ({ fillItemId }: { fillItemId: string }) => {

    const { filledConsumerContainers } = usePricingProducedSelection()
    const {   } = usePricingProducedSelection()

    // CC shorthand for consumer container
    const [selectedCC, setSelectedCC] = useState<FilledConsumerContainer | null>(null)

    return (
        <div className='col-span-2'>
            <AddConsumerContainerDialog produced={true} fillItemId={fillItemId} />
            <Card.Root>
                <div className='flex gap-x-6'>

                    <div className='flex flex-col w-1/3 gap-y-6'>
                        <Card.Title>Consumer Containers</Card.Title>

                        <div className='flex flex-col gap-y-1'>

                            <AddConsumerContainerButton />

                            {filledConsumerContainers.map((cc) => <FilledConsumerContainerCard key={cc.id} selectedConsumerContainerId={selectedCC ? selectedCC.id : ''} onSelect={setSelectedCC} filledConsumerContainer={cc} />)}

                        </div>
                    </div>

                    <div className='flex flex-col w-2/3 '>

                        <SelectedConsumerContainerPanel selectedConsumerContainer={selectedCC} />


                    </div>


                </div>
            </Card.Root>
        </div>
    )
}


export default FinishedProducts 
