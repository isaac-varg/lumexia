import batchSizeActions from '@/actions/production/batchSizes'
import Dialog from '@/components/Dialog'
import { staticRecords } from '@/configs/staticRecords'
import { BatchSize } from '@/types/batchSize'
import React, { useEffect, useState } from 'react'
import { createBpr } from '../../_functions/createBpr'
import useDialog from '@/hooks/useDialog'

const BatchSizeStep = ({ selectedMbprId }: { selectedMbprId: string | null }) => {

  const [sizes, setSizes] = useState<BatchSize[]>([])
  const { resetDialogContext} = useDialog()

  const handleSizeSelection =  async (size: BatchSize) => {

    if (!selectedMbprId) { throw new Error("No MBPR selected.")}
  
    const data = {
      size,
      mbprId: selectedMbprId,
    }
    await createBpr(data)
    resetDialogContext()


  }

  useEffect(() => {
    const getSizes = async () => {
      if (!selectedMbprId) {
        return
      }

      const sizes = await batchSizeActions.getAll({ mbprId: selectedMbprId, recordStatusId: staticRecords.app.recordStatuses.active }, ["uom"])
      setSizes(sizes)

    };

    

    getSizes();
  }, [selectedMbprId])


  return (
    <div>
      <Dialog.Title>Select Batch Size</Dialog.Title>
      <div className='grid grid-cols-2 gap-4'>
        {sizes.map(s => <div key={s.id} className='flex flex-col bg-swirl-100 rounded-lg p-4 font-poppins font-semibold text-swirl-900' onClick={() => handleSizeSelection(s)}>
          <div className='flex  gap-y-2'><p>{s.quantity}</p><p>{s.uom.abbreviation}</p></div></div>)}
      </div>

    </div>
  )
}

export default BatchSizeStep
