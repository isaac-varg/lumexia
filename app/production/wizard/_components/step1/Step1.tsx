import React, { useEffect, useState } from 'react'
import { getProducedItems } from '../../_functions/getProducedItems'
import ItemSearch from '../ItemSearch';
import { Item } from '@/types/item';
import useProductionWizard from '@/hooks/useProductionWizard';

const Step1 = () => {

  const [items, setItems] = useState([]);
  const { setSelectedProducibleItem } = useProductionWizard()

  const handleSelect = (item: Item) => {
      setSelectedProducibleItem(item);
  } 

  useEffect(() => {

    const getItems = async () => {
      const items = await getProducedItems();

      setItems(items);
    }

    getItems()
  }, [])

  return (
    <div>
      <ItemSearch items={items} onSelection={handleSelect} />

    </div> 
  )
}

export default Step1
