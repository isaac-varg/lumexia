'use client'
import Card from '@/components/Card'
import { usePricingPurchasedSelection } from '@/store/pricingPurchasedSlice'
import React, { useState } from 'react'
import AddConsumerContainerDialog from './AddConsumerContainerDialog'
import { FilledConsumerContainer } from '@/actions/accounting/consumerContainers/getAllByFillItem'
import FinishedProductCard from '../shared/FinishedProductCard'
import AddFinishedProductButton from './AddFinishedProductButton'
import SelectedFinishedProductPanel from './SelectedFinishedProductPanel'
import { FinishedProduct } from '@/actions/accounting/finishedProducts/getByItem'

const FinishedProducts = ({ fillItemId }: { fillItemId: string }) => {

    const { finishedProducts } = usePricingPurchasedSelection()

    const [selectedFinishedProduct, setSelectedFinishedProduct] = useState<FinishedProduct | null>(null)

    return (
        <div className='col-span-2'>
            <AddConsumerContainerDialog fillItemId={fillItemId} />
            <Card.Root>
                <div className='flex gap-x-6'>


                    <div className='flex flex-col w-1/3 gap-y-6'>
                        <Card.Title>Finished Products</Card.Title>

                        <div className='flex flex-col gap-y-1'>

                            <AddFinishedProductButton />

                            {finishedProducts.map((fp) => <FinishedProductCard
                                key={fp.id}
                                selectedFinishedProductId={selectedFinishedProduct ? selectedFinishedProduct.id : ''}
                                onSelect={setSelectedFinishedProduct}
                                finishedProduct={fp} />)}

                        </div>
                    </div>

                    <div className='flex flex-col w-2/3 '>

                        <SelectedFinishedProductPanel sele={selectedCC} />


                    </div>


                </div>
            </Card.Root>
        </div>
    )
}


export default FinishedProducts
