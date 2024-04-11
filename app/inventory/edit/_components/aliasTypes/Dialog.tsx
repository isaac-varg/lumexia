import Dialog from '@/components/Dialog'
import React from 'react'
import AliasTypeForm from './Form'

const AliasTypesDialog = () => {
  return (
    <Dialog.Root identifier='aliasTypes'>
        <Dialog.Title title='Alias Types' />
        <AliasTypeForm />
    </Dialog.Root>
  )
}

export default AliasTypesDialog