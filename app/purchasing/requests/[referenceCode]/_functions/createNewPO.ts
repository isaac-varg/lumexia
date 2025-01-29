"use server"

import { getUserId } from "@/actions/users/getUserId";
import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { revalidatePath } from "next/cache";

export const createNewPO = async (supplierId: string, itemId: string, requestId: string) => {

    const userId = await getUserId()
    const po = await createPO(supplierId, userId);
    const poItem = await createPOItem(po.id, itemId)

    const link = await prisma.requestPurchaseOrder.create({
        data: {
            requestId,
            poId: po.id,
        }
    });

    await createActivityLog('connectPoToRequest', 'purchasingRequest', requestId, { context: `Purchase Order #${po.referenceCode} was linked to the request` })

    revalidatePath('/purchasing/requests/[referenceCode]');

    return link

}

const createPO = async (supplierId: string, userId: string) => {

    const response = await prisma.purchaseOrder.create({
        data: {
            supplierId,
            submittingUserId: userId,
            statusId: staticRecords.purchasing.poStatuses.draft,
        }
    })


    await createActivityLog('createPurchaseOrder', 'purchaseOrder', response.id, { context: `PO #${response.referenceCode} created` })

    return response;

}


const createPOItem = async (poId: string, itemId: string) => {

    const response = await prisma.purchaseOrderItem.create({
        data: {
            purchaseOrderId: poId,
            itemId,
            quantity: 0,
            pricePerUnit: 0,
            uomId: staticRecords.inventory.uom.lb,
            purchaseOrderStatusId: staticRecords.purchasing.poStatuses.draft
        },
        include: {
            item: true,
            purchaseOrders: true
        }
    })

    await prisma.purchaseOrderItemDetail.create({
        data: {
            poItemId: response.id,
            containerTypeId: staticRecords.inventory.containerTypes.drum,
            weightPerContainer: 0,
            weightUomId: staticRecords.inventory.uom.lb,
            quantityOfContainers: 0,
        }
    })

    await createActivityLog('createPurchaseOrderItem', 'purchaseOrder', poId, { context: `New ${response.item.name} was added to PO #${response.purchaseOrders.referenceCode}`, poItemId: response.id, itemId: response.item.id })

    return response

}
