'use server'

import prisma from "@/lib/prisma"

export const createDiscreteConversion = async (inventoryUomId: string, supplierUomId: string, inventoryUomQuantity: number, supplierId: string, itemId: string) => {

  // this is confusing naming
  // so the conversion is 1 quantity of supplierUom is equal to x quantity of inventoryUom  for this itemId
  const conversion = await prisma.discreteUnitOfMeasurementConversion.create({
    data: {
      uomAId: supplierUomId,
      uomBId: inventoryUomId,
      conversionFactor: inventoryUomQuantity,
      supplierId,
      itemId,
    }
  });


  return conversion
}
