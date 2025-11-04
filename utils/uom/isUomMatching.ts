'use server'

import prisma from "@/lib/prisma";

export const isUomMatching = async (inputUomId: string, inventoryUomId?: string, itemId?: string): Promise<boolean> => {
  // determines if the incoming uom is the same as the
  // item's inventory uom;
  // if false, likely requires conversion

  if (!inventoryUomId && !itemId) {
    throw new Error("Either an inventory uom id or item id must be provided");
  }

  if (inventoryUomId) {
    return inputUomId === inventoryUomId;
  }

  // if we've reached here, inventoryUomId is not provided, so we must have itemId
  const item = await prisma.item.findUnique({
    where: { id: itemId },
    select: { inventoryUomId: true }
  });

  if (!item) {
    throw new Error("Item not found");
  }

  return inputUomId === item.inventoryUomId;
}
