import { getAllInventoryTypes } from '@/actions/inventory/inventoryTypes';
import Card from '@/components/Card';
import PageTitle from '@/components/Text/PageTitle'
import React from 'react'

const InventoryEditPage = async () => {
  const inventoryTypesData = await getAllInventoryTypes();

  const [inventoryTypes] = await Promise.all([inventoryTypesData]);
  return (
    <div>
      <PageTitle title="Edit Inventory" />
      
      <Card.Root>
        <Card.Title>Edit Inventory</Card.Title>
      </Card.Root>
    </div>
  )
}

export default InventoryEditPage