import React, { useEffect, useState } from 'react'
import { getProducedItems } from '../../_functions/getProducedItems'
import ItemSearch from '../ItemSearch';

const Step1 = () => {

  const [items, setItems] = useState([]);

  useEffect(() => {

    const getItems = async () => {
      const items = await getProducedItems();

      setItems(items);
    }

    getItems()
  }, [])

  return (
    <div>
      <ItemSearch items={items} />

    </div>
  )
}

export default Step1
