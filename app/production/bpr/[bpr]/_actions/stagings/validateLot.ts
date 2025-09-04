'use server'

import { BprBomItem } from "../getBprBom"
import prisma from "@/lib/prisma"

export const validateLot = async (scannedLotId: string, seletedBomItemId: string) => {

  const scannedLot = await prisma.lot.findFirst({
    where: {
      id: scannedLotId
    },
    select: {
      itemId: true
    }
  })

  if (!scannedLot) return false


  const isValid = scannedLot.itemId === seletedBomItemId;



  return isValid;

}
