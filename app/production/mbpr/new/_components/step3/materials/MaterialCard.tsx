import { BatchStep } from '@/types/batchStep';
import { BillOfMaterials } from '@/types/billOfMaterials'
import { Item } from '@/types/item'
import React from 'react'

export interface ExBillOfMaterials extends BillOfMaterials {
  item: Item;
  step: BatchStep
}

const MaterialCard = ({ material }: { material: ExBillOfMaterials }) => {
  return (
    <div className='border border-cararra-700 rounded-lg p-4'>

    <span className='font-poppins font-semibold text-xl'>{material.item.name}</span>
   
    <span className='flex gap-x-4 font-poppins font-semibold text-xl'>
    <span className='text-cararra-800'>{material.concentration}</span>

   <span className='text-cararra-500'>% w/w </span>
    </span>

    </div>
  )
}

export default MaterialCard
