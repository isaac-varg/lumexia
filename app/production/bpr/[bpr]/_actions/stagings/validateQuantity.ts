'use server'

import { inventoryActions } from "@/actions/inventory"

export const validateQuantity = async (lotId: string, stagedQuantity: number) => {

  const inventory = await inventoryActions.inventory.getByLot(lotId);

  const isValid = inventory.totalQuantityOnHand >= stagedQuantity;

  return isValid;

}
