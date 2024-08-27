import ItemSearch, { ItemDataForSearch } from '@/app/production/mbpr/_components/ItemSearch'
import React from 'react'
import { useWizard } from 'react-use-wizard'

const SelectItemStep = ({ items, onItemSelection }: { items: ItemDataForSearch[], onItemSelection: (item: any) => void}) => {
  const {nextStep} = useWizard()
  const handleItemSelection = (item: any) => {
    onItemSelection(item)
    nextStep();
  }
  return (
    <div>
      <ItemSearch items={items} onSelection={handleItemSelection} />
    </div>
  )
}

export default SelectItemStep
