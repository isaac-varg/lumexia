import React from 'react'
import Table from './_components/Table'
import itemTypeActions from '@/actions/inventory/itemTypeActions'
import itemActions from '@/actions/inventory/items'
import CreateItem from './_components/CreateItem'


const ItemsPage = async () => {

  const items = await itemActions.getAllWithIncludes(['itemType', 'procurementType', 'inventoryType', 'aliases']);


  return (
    <div><Table items={items} />
    
    <CreateItem />
    </div>
  )
}

export default ItemsPage