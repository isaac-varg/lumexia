// this implies pounds as the default inventory uom.
// TODO make this configurable

import { uom } from "@/configs/staticRecords/unitsOfMeasurement"
import { convertUom } from "./convertUom"

export const toInventoryUom = async (currentUomId: string, quantity: number) => {

    const convertedQuantity = await convertUom(currentUomId, uom.pounds, quantity);

    return convertedQuantity; 
}
