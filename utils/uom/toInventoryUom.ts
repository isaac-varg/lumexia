// this implies pounds as the default inventory uom.
// TODO make this configurable

import { staticRecords } from "@/configs/staticRecords"
import { convertUom } from "./convertUom"

export const toInventoryUom = async (currentUomId: string, quantity: number) => {

    const convertedQuantity = await convertUom(currentUomId, staticRecords.inventory.uom.lb, quantity);

    return convertedQuantity; 
}
