"use server"
import { ExBprBom } from "@/types/bprBom";
import { getLot } from "./getLot"

 

export const validateLot = async (scannedLotId: string, bomItem: ExBprBom) => {

  const lotData = await getLot(scannedLotId);
  
  const isValid = bomItem.bom.itemId === lotData.item.id

  return isValid
}
