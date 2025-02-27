'use server'

import { inventoryActions } from "@/actions/inventory"

export const validateInventory = async (quantity: number, lotId: string) => {

    const inventory = await inventoryActions.inventory.getByLot(lotId);

    const isValid = quantity <= inventory.totalQuantityOnHand;

    return isValid;

}
