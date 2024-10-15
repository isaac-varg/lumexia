"use client"

import Dialog from '@/components/Dialog'
import React, { useEffect, useState } from 'react'
import { ItemDataForSearch } from '../../../mbpr/_components/ItemSearch'
import { getProducedItems } from '../../../mbpr/_functions/getProducedItems'
import { Wizard  } from 'react-use-wizard'
import SelectItemStep from './SelectItemStep'
import BatchSizeStep from './BatchSizeStep'
import { BatchSize } from '@/types/batchSize'
import MbprStep from './MbprStep'
import { MasterBatchProductionRecord } from '@/types/masterBatchProductionRecord'

const BprForm = () => {

  const [items, setItems] = useState<ItemDataForSearch[]>([])
  const [selectedItem, setSelectedItem] = useState<ItemDataForSearch>()
  const [selectedMbpr, setSelectedMbpr] = useState<MasterBatchProductionRecord>()

  const handleItemSelection = (item: ItemDataForSearch) => {
      setSelectedItem(item);

  }

  const handleMbprSelection = (mbpr: MasterBatchProductionRecord) => {
      setSelectedMbpr(mbpr)
  }

  useEffect(() => {

    const getItems = async () => {
      const items = await getProducedItems();

      setItems(items)
    }

    getItems()
  }, [])


  

  return (
    <Dialog.Root identifier='newBprForm' >
      <Wizard>
          <SelectItemStep items={items} onItemSelection={handleItemSelection}/>
          <MbprStep selectedItemId={selectedItem ? selectedItem.id : null  } onMbprSelection={handleMbprSelection} />
          <BatchSizeStep selectedMbprId={selectedMbpr ? selectedMbpr.id : null} />
      </Wizard>
    </Dialog.Root>
  )
}

export default BprForm
