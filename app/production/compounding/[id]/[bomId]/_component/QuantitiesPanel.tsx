import { ExBillOfMaterials } from '@/app/production/mbpr/_components/step3/materials/MaterialCard'
import { ExBprBom } from '@/types/bprBom'
import { BprStaging } from '@/types/bprStaging'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import React from 'react'

type Props = {
  bomItem: ExBprBom 
  staged: BprStaging[]
}

const QuantitiesPanel = ({ bomItem, staged }: Props) => {
  const requiredQuantity =  bomItem.quantity;
  const stagedQuantity = staged.reduce(( sum: number, current: BprStaging) =>  current.quantity + sum, 0 )
  const remainingQuantity = requiredQuantity - stagedQuantity

  return (
    <div className='grid grid-cols-3 gap-4'>
      <QuantityBox title='Required' quantity={requiredQuantity} />
      <QuantityBox  title='staged Quantity' quantity={stagedQuantity}/>
      <QuantityBox title='remaining Quantity' quantity={remainingQuantity}/>

    </div>
  )
}


const QuantityBox = ({ title, quantity }: { title: string, quantity: number }) => {

  return <div className='flex flex-col gap-y-4 p-6 bg-swirl-100 rounded-lg items-center justify-center'>
    <div className='text-2xl font-poppins font-semibold uppercase'>{title}</div>
    <div className='text-3xl font-medium font-poppins'>{toFracitonalDigits.weight(quantity)} </div>

  </div>
}

export default QuantitiesPanel
