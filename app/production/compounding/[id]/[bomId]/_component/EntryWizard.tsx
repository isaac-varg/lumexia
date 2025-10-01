"use client"

import React, { Dispatch, useEffect, useState } from 'react'
import { Wizard } from 'react-use-wizard'
import ScanStep from './ScanStep'
import QuantityStep from './QuantityStep'
import { createBprStaging } from '../_functions/createBprStaging'
import { getUserId } from '@/actions/users/getUserId'
import { staticRecords } from '@/configs/staticRecords'
import ReviewStep from './ReviewStep'
import { validateLot } from '../../_functions/validateLot'
import useDialog from '@/hooks/useDialog'
import InvalidLotAlert from './InvalidLotAlert'
import { validateInventory } from '../_functions/validateInventory'
import InvalidQuantityLotAlert from './InvalidQuantityAlert'
import { uom } from '@/configs/staticRecords/unitsOfMeasurement'
import { bprStagingStatuses } from '@/configs/staticRecords/bprStagingStatuses'

const EntryWizard = ({ bomItem, setIsViewMode }: { bomItem: any, setIsViewMode: Dispatch<React.SetStateAction<boolean>> }) => {
  const [lot, setLot] = useState<null | string>(null)
  const [quantity, setQuantity] = useState<null | number>(null)
  const [isQuantityValid, setIsQuantityValid] = useState<boolean>(false);
  const { showDialog } = useDialog();

  const validity: Record<string, boolean> = {
    lot: lot !== null,
    quantity: quantity !== null,
  }

  const data = {
    lot,
    quantity,
    validity,
  }

  useEffect(() => {
    const createEntry = async () => {
      const user = await getUserId()

      const payload = {
        bprBomId: bomItem.id,
        lotId: lot,
        pulledByUserId: user,
        quantity,
        bprStagingStatusId: bprStagingStatuses.staged,
        uomId: uom.pounds,
      }

      await createBprStaging(payload)
      setIsViewMode(false)
      location.reload()



    }
    if (validity.lot && validity.quantity && isQuantityValid) {
      createEntry()

    }
  }, [isQuantityValid, validity.lot, validity.quantity, bomItem.id, lot, quantity, setIsViewMode])

  useEffect(() => {
    const isQuantityValid = async () => {
      if (!lot || !quantity) return;

      const isValid = await validateInventory(quantity, lot);
      console.log('isvalid', isValid)

      if (!isValid) {
        showDialog(`lotQuantityInvalid${lot}`);
        return;
      }


      setIsQuantityValid(true)
    }
    isQuantityValid();
  }, [lot, quantity, showDialog])

  useEffect(() => {
    const isLotValid = async () => {
      if (!lot) return;

      const isValid = await validateLot(lot, bomItem)

      if (!isValid) {
        showDialog(`lotInvalid${lot}`);
      }


    }
    isLotValid()
  }, [lot, bomItem, showDialog])

  return (
    <div>
      <InvalidLotAlert lot={lot} setIsViewMode={setIsViewMode} />
      <InvalidQuantityLotAlert lot={lot} setIsViewMode={setIsViewMode} />
      <Wizard>

        <ScanStep handleScan={setLot} />
        <QuantityStep handleQuantity={setQuantity} />
        <ReviewStep data={data} />
      </Wizard>
    </div>
  )
}

export default EntryWizard
