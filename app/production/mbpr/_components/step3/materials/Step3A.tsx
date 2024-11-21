import ActionButton from '@/components/ActionButton'
import Dialog from '@/components/Dialog';
import React from 'react'
import { useWizard } from 'react-use-wizard'
import ItemSearch, { ItemDataForSearch } from '../../ItemSearch';
import { Item } from '@/types/item';

const Step3A = ({ items, onItemSelection, isItemSelected  }: { items: ItemDataForSearch[] , onItemSelection: (item: Item) => void, isItemSelected: boolean }) => {

  const { nextStep } = useWizard();
  

  return (
    <div className='flex flex-col gap-y-4 '>

      <Dialog.Title>Select Item</Dialog.Title>

      <ItemSearch items={items} onSelection={onItemSelection} />

      <div className='flex justify-center'>
      {isItemSelected && <ActionButton onClick={() => nextStep()}>Next</ActionButton>}
      </div>
    </div>

  )
}

export default Step3A
