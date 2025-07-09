'use server'

import { accountingActions } from "@/actions/accounting"
import { staticRecords } from "@/configs/staticRecords"
import { PurchaseOrder } from "@prisma/client"

export const fixPos = async (pos: PurchaseOrder[]) => {
    const fixes = await Promise.all(pos.map(async (po) => {
        const fixedPo = await accountingActions.pos.details.create({
            statusId: staticRecords.accounting.pos.statuses.default,
            purchaseOrderId: po.id,
            paid: false,
            packingSlipReceived: false,
            paperworkGivenToAdmin: false,

        })

        return fixedPo
    }));

    return fixes;
}
