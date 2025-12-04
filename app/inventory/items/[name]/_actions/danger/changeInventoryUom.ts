'use server'

import { inventoryActions } from "@/actions/inventory"
import prisma from "@/lib/prisma"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import { UnitOfMeasurement } from "@prisma/client"

export const changeInventoryUom = async (itemId: string, newUom: UnitOfMeasurement, oldUom: UnitOfMeasurement) => {

  await prisma.discreteUnitOfMeasurementConversion.deleteMany({
    where: { itemId }
  });

  await createActivityLog('Modify Inventory UOM', 'itemId', itemId, {
    context: `Changed Inventory UOM from ${oldUom.name} to ${newUom.name}`
  })

  const res = await prisma.item.update({
    where: { id: itemId },
    data: {
      inventoryUomId: newUom.id,
    }
  });

  return res;

}
