import Dialog from '@/components/Dialog'
import React from 'react'
import InventoryTypesForm from './Form'

const ProcurementTypesDialog = () => {
  return (
    <Dialog.Root identifier='procurementTypes'>
        <Dialog.Title title='Procurement Types' />
        <InventoryTypesForm />
    </Dialog.Root>
  )
}

export default ProcurementTypesDialog