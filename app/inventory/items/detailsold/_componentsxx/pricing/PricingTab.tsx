import { ItemPricingData } from '@/actions/accounting/pricing/getItemPricingData'
import ActionButton from '@/components/ActionButton'
import Card from '@/components/Card'
import Text from '@/components/Text'
import React, { useState } from 'react'
import { TbEdit } from 'react-icons/tb'
import ViewMode from './ViewMode'
import FormMode from './FormMode'
import { Uom } from '@/actions/inventory/getAllUom'

const PricingTab = ({ pricing, itemId, uom }: { itemId: string, pricing: ItemPricingData, uom: Uom[] }) => {

  const [mode, setMode] = useState<'view' | 'edit'>('view')

  const handleEditPricingParameters = () => {
    setMode('edit');
  }

  return (
    <div>
      <div className='flex justify-between'>
        <Text.SectionTitle size='small'>Pricing Parameters</Text.SectionTitle>
        <button className='btn btn-soft btn-secondary' onClick={() => handleEditPricingParameters()}>
          <div className='flex items-center gap-2'>
            <TbEdit />
            <p>Edit</p>
          </div>
        </button>

      </div>

      {mode === 'edit' && <FormMode itemId={itemId} pricing={pricing} uom={uom} />}
      {mode === 'view' && <ViewMode pricing={pricing} />}

    </div>
  )
}

export default PricingTab
