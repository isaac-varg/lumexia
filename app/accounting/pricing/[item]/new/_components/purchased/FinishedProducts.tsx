'use client'
import Card from '@/components/Card'
import { usePricingPurchasedSelection } from '@/store/pricingPurchasedSlice'
import React, { useState } from 'react'
import FinishedProductCard from '../shared/FinishedProductCard'
import AddFinishedProductButton from './AddFinishedProductButton'
import { FinishedProduct } from '@/actions/accounting/finishedProducts/getByItem'
import AddFinishedProductDialog from '../shared/AddFinishedProductDialog'
import SelectedFinishedProductPanel from './SelectedFinishedProductPanel'
import { FinishedProductFromPurchased } from '@/actions/accounting/finishedProducts/getByPurchasedItem'
import UsePricingTemplateButton from '../shared/pricingTemplates/UsePricingTemplateButton'
import TemplateDialog from '../shared/pricingTemplates/TemplateDialog'

const FinishedProducts = ({ fillItemId, itemTypeId }: { fillItemId: string, itemTypeId: string }) => {

    const { finishedProducts } = usePricingPurchasedSelection()

    const [selectedFinishedProduct, setSelectedFinishedProduct] = useState<FinishedProductFromPurchased | null>(null)

    return (
        <div className='col-span-2'>
            <AddFinishedProductDialog fillItemId={fillItemId} />
            <TemplateDialog filledWithItemId={fillItemId} itemTypeId={itemTypeId} />
            

            <Card.Root>
                <div className='flex gap-x-6'>


                    <div className='flex flex-col w-1/3 gap-y-6'>
                        <Card.Title>Finished Products</Card.Title>

                        <div className='flex flex-col gap-y-1'>

                            <div className='grid grid-cols-2 gap-2'>
                                <AddFinishedProductButton />
                                <UsePricingTemplateButton />
                            </div>


                            {finishedProducts.map((fp) => <FinishedProductCard
                                key={fp.id}
                                selectedFinishedProductId={selectedFinishedProduct ? selectedFinishedProduct.id : ''}
                                onSelect={setSelectedFinishedProduct}
                                finishedProduct={fp} />)}

                        </div>
                    </div>

                    <div className='flex flex-col w-2/3 '>

                        <SelectedFinishedProductPanel selectedFinishedProduct={selectedFinishedProduct} />


                    </div>


                </div>
            </Card.Root>
        </div>
    )
}


export default FinishedProducts
