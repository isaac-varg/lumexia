'use server'

import prisma from "@/lib/prisma";
import { UomConversionError } from "./conversionError";

export type ConversionIO = {
  id: string,
  isStandard: boolean
}

export const convertUom = async (
  inputUom: ConversionIO,
  quantity: number,
  outputUom?: ConversionIO,
  itemId?: string,
  supplierId?: string,
): Promise<number> => {

  // ensures there is a way to determine the targetUomId
  if (!outputUom && !itemId) {
    throw new UomConversionError('MISSING_OUTPUT_UOM', "A outputUomId or itemId is required.",)
  }

  let targetUomId: string;


  // determines targetUomId
  if (outputUom) {

    targetUomId = outputUom.id;

  } else {

    const item = await prisma.item.findUnique({
      where: { id: itemId },
      select: { inventoryUomId: true },
    });

    if (!item) {
      throw new UomConversionError("ITEM_NOT_FOUND",
        "Item was not found.",
        { attemptedItemId: itemId },
        "An item was not found so the inventoryUomId was not able to be determined; This is circumvented by providing either a valid itemId or outputUomId to bypass this query entirely.")
    }

    targetUomId = item.inventoryUomId;
  }


  // already matches target, no conversion necessary
  if (inputUom.id === targetUomId) {
    return quantity;
  }

  // is non-standard unit of uom
  // i.e., requires discrete conversion
  // Check if EITHER the input OR output UOM is non-standard
  const inputIsNonStandard = inputUom && !inputUom.isStandard;
  const outputIsNonStandard = outputUom && !outputUom.isStandard;

  if (inputIsNonStandard || outputIsNonStandard)
    if (itemId && supplierId) {
      const discreteConversion = await prisma.discreteUnitOfMeasurementConversion.findUnique({
        where: {
          item_supplier_unique: {
            itemId,
            supplierId,
          }
        },
      });

      if (!discreteConversion) {
        throw new UomConversionError("DISCRETE_CONVERSION_NOT_FOUND", `A discrete conversion factor was not found for the supplier and item combination.`, {
          itemId,
          supplierId,
        })
      }

      if (discreteConversion) {
        if (discreteConversion.uomAId === inputUom.id) {
          // Direct conversion A -> B
          return quantity * discreteConversion.conversionFactor;
        } else {
          // Inverse conversion B -> A
          return quantity / discreteConversion.conversionFactor;
        }
      }
    }

  // Find standard conversion
  // all other scenarios are false;
  const conversion = await prisma.unitOfMeasurementConversion.findFirst({
    where: {
      OR: [
        { uomAId: inputUom.id, uomBId: targetUomId },
        { uomAId: targetUomId, uomBId: inputUom.id },
      ],
    },
  });

  if (!conversion) {
    throw new UomConversionError('STANDARD_CONVERSION_NOT_FOUND',
      `No conversion factor found between the item inventory UOM and the UOM the item was purchased in. Please either add a discrete UOM conversion or standard conversion for SI units of measurement.`,
      {
        inputUomId: inputUom.id,
        inputUomIsStandard: inputUom.isStandard,
        targetUomId,
        targetUomIsStandard: outputUom?.isStandard ?? 'not provided',
        itemId: itemId ?? 'not provided',
        supplierId: supplierId ?? 'not provided',
        discreteConversionAttempted: (inputIsNonStandard || outputIsNonStandard) && !!itemId && !!supplierId,
      },
    )
  }

  if (conversion.uomAId === inputUom.id) {
    // Direct conversion: A -> B
    return quantity * conversion.conversionFactor;
  } else {
    // Inverse conversion: B -> A
    return quantity / conversion.conversionFactor;
  }
}
