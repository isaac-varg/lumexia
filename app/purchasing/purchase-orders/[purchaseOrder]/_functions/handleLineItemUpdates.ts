"use server"

import prisma from "@/lib/prisma";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";
import { toMathFractionalDigits } from "@/utils/data/toMathFractionalDigits";


type LineItemUpdateObj = {
  id: string;
  uomId: string;
  itemName: string;
  quantity: number;
  pricePerUnit: number;
}

export const handleLineItemUpdates = async (data: LineItemUpdateObj[], poId: string) => {

  return await Promise.all(data.map(async (d) => {

    const { pricePerUnit, uomId, quantity } = d;

    await createActivityLog('Modify Line Item', 'purchaseOrder', poId, { context: `Updated ${d.itemName} to quantity of ${toFracitonalDigits.weight(quantity)} at $ ${toFracitonalDigits.curreny(d.pricePerUnit)} }` })

    return await prisma.purchaseOrderItem.update({
      where: { id: d.id },
      data: {
        pricePerUnit,
        uomId,
        quantity,
      }
    });
  }));
}
