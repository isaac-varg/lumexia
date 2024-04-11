import Dialog from '@/components/Dialog'
import React from 'react'
import ItemTypesForm from './Form'

const ItemTypesDialog = () => {
  return (
    <Dialog.Root identifier='itemTypes'>
        <Dialog.Title title='Item Types' />
        <ItemTypesForm />
    </Dialog.Root>
  )
}

export default ItemTypesDialog