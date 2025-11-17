'use server'

import { uom } from "@/configs/staticRecords/unitsOfMeasurement";
import prisma from "@/lib/prisma";

export const convertUom = async (
  inputUomId: string,
  quantity: number,
  outputUomId?: string,
  itemId?: string,
  supplierId?: string,
): Promise<number> => {

  if (!outputUomId && !itemId) {
    throw new Error("Either an output uom id or item id must be provided");
  }

  const isGenericUnit = inputUomId === uom.units;

  if (isGenericUnit) {
    if (!itemId || !supplierId) {
      // Not enough information to convert a generic unit, return original quantity
      console.error('Missing data for generic unit conversion: itemId or supplierId')
      return quantity;
    }

    const genericConversion = await prisma.genericUnitConversionFactor.findUnique({
      where: {
        item_supplier_unique: {
          itemId,
          supplierId,
        },
      },
    });

    if (!genericConversion) {
      // No specific conversion factor for this item/supplier, return original quantity
      return quantity;
    }

    // The target UOM is defined by the generic conversion record
    const targetUomId = genericConversion.convertToUomId;
    if (inputUomId === targetUomId) {
      return quantity;
    }
    return quantity * genericConversion.conversionFactor;
  }

  let targetUomId: string;

  if (outputUomId) {
    targetUomId = outputUomId;
  } else {
    const item = await prisma.item.findUnique({
      where: { id: itemId },
      select: { inventoryUomId: true },
    });
    if (!item) {
      throw new Error("Item not found to determine inventory UoM.");
    }
    targetUomId = item.inventoryUomId;
  }

  if (inputUomId === targetUomId) {
    return quantity;
  }

  // Find standard conversion
  const conversion = await prisma.unitOfMeasurementConversion.findFirst({
    where: {
      OR: [
        { uomAId: inputUomId, uomBId: targetUomId },
        { uomAId: targetUomId, uomBId: inputUomId },
      ],
    },
  });

  if (!conversion) {
    throw new Error(`No conversion factor found between UOM ${inputUomId} and ${targetUomId}`);
  }

  if (conversion.uomAId === inputUomId) {
    // Direct conversion: A -> B
    return quantity * conversion.conversionFactor;
  } else {
    // Inverse conversion: B -> A
    return quantity / conversion.conversionFactor;
  }
}
