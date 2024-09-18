"use client"

import React, { Dispatch, useEffect, useState } from 'react'
import { Wizard } from 'react-use-wizard'
import ScanStep from './ScanStep'
import QuantityStep from './QuantityStep'
import ImageStep from './ImageStep'
import { createBprStaging } from '../_functions/createBprStaging'
import { getUserId } from '@/actions/users/getUserId'
import { staticRecords } from '@/configs/staticRecords'
import { revalidatePage } from '@/actions/app/revalidatePage'
import ReviewStep from './ReviewStep'

const EntryWizard = ({ bomItem, setIsViewMode }: { bomItem: any, setIsViewMode: Dispatch<React.SetStateAction<boolean>> }) => {
  const [lot, setLot] = useState<null | string>(null)
  const [quantity, setQuantity] = useState<null | number>(null)
  
  const data = {
    lot,
    quantity,
  }



  const validity: Record<string, boolean> = {
    lot: lot !== null,
    quantity: quantity !== null
  }

  useEffect(() => {
    const createEntry = async () => {
      const user = await getUserId()

      const payload = {
        bprBomId: bomItem.id,
        lotId: lot,
        pulledByUserId: user,
        quantity,
        bprStagingStatusId: staticRecords.production.bprBomStatuses.staged,
        uomId: staticRecords.inventory.uom.lb,
      }

      await createBprStaging(payload)
      setIsViewMode(false)
      location.reload()

     

    }
    if (validity.lot && validity.quantity) {
      createEntry()

    }
  })

  return (
    <div>
      <Wizard>
        <ScanStep handleScan={setLot} />
        <QuantityStep handleQuantity={setQuantity} />
        <ReviewStep data={data} /> 
      </Wizard>
    </div>
  )
}

export default EntryWizard