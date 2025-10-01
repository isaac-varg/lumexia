'use server'

import { accountingActions } from "@/actions/accounting"
import { poAccountingStatuses } from "@/configs/staticRecords/poAccountingStatuses"
import { PurchaseOrder } from "@prisma/client"

export const fixPos = async (pos: PurchaseOrder[]) => {
  const fixes = await Promise.all(pos.map(async (po) => {
    const fixedPo = await accountingActions.pos.details.create({
      statusId: poAccountingStatuses.notStarted,
      purchaseOrderId: po.id,
      paid: false,
      packingSlipReceived: false,
      paperworkGivenToAdmin: false,

    })

    return fixedPo
  }));

  return fixes;
}
