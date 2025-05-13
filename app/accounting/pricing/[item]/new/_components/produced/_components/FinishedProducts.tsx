'use client'
import Card from '@/components/Card'
import React, { useState } from 'react'
import { usePricingProducedSelection } from '@/store/pricingProducedSlice'
import FinishedProductCard from '../../shared/FinishedProductCard'
import { FinishedProductFromProduced } from '@/actions/accounting/finishedProducts/getByProducedItem'
import AddFinishedProductButton from '../../purchased/AddFinishedProductButton'
import AddFinishedProductDialog from '../../shared/AddFinishedProductDialog'
import SelectedFinishedProductPanel from './SelectedFinishedProductPanel'

const FinishedProducts = () => {

    const { finishedProducts, activeMbpr } = usePricingProducedSelection()

    // fp is shorthand for finished proudct
    const [selectedFp, setSelectedFp] = useState<FinishedProductFromProduced | null>(null)

    return (
        <div className='col-span-2'>
            <AddFinishedProductDialog produced={true} fillItemId={activeMbpr?.producesItemId || ''} />
            <Card.Root>
                <div className='flex gap-x-6'>

                    <div className='flex flex-col w-1/3 gap-y-6'>
                        <Card.Title>Finished Products</Card.Title>

                        <div className='flex flex-col gap-y-1'>

                            <AddFinishedProductButton />

                            {finishedProducts.map((fp) => <FinishedProductCard key={fp.id} finishedProduct={fp} onSelect={setSelectedFp} selectedFinishedProductId={selectedFp?.id || ''} />)}

                        </div>
                    </div>

                    <div className='flex flex-col w-2/3 '>

                        <SelectedFinishedProductPanel selectedFinishedProduct={selectedFp} />


                    </div>


                </div>
            </Card.Root>
        </div>
    )
}


export default FinishedProducts 
