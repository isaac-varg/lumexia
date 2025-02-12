import AuditRequest from '@/app/production/planning/[bprReference]/_components/AuditRequest'
import Dialog from '@/components/Dialog'
import React from 'react'

const RequestInventoryAuditDialog = ({itemId} : {itemId: string}) => {
    
  return (
      <Dialog.Root identifier='requestnewinventoryaudit'>
            <Dialog.Title>Request Inventory Audit</Dialog.Title>
            
            <div>
               <AuditRequest itemId={itemId} /> 
            </div>
      </Dialog.Root>
  )
}

export default RequestInventoryAuditDialog
