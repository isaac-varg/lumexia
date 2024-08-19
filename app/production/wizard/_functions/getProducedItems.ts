'use server'

import itemActions from "@/actions/inventory/items"
import { staticRecords } from "@/configs/staticRecords"

export const getProducedItems = async () => {
  const items = await itemActions.getAll({procurementTypeId: staticRecords.inventory.producedProcurementId}) 



  return items
}
