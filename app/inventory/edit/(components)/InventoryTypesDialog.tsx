import Dialog from '@/components/Dialog'
import React from 'react'
import InventoryTypesForm from './InventoryTypesForm'

const InventoryTypesDialog = () => {
  return (
    <Dialog.Root identifier='inventoryTypes'>
        <Dialog.Title title='Inventory Types' />
        <InventoryTypesForm />
    </Dialog.Root>
  )
}

export default InventoryTypesDialog