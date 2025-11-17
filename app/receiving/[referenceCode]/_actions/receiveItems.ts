'use server'

import { PurchaseOrderItem } from "@/actions/purchasing/purchaseOrders/items/getAll"
import { purchaseOrderStatuses } from "@/configs/staticRecords/purchaseOrderStatuses"
import prisma from "@/lib/prisma"
import { generateLotNumber } from "@/utils/lot/generateLotNumber"
import { uomUtils } from "@/utils/uom"
import { updateConnectedRequests } from "./updateConnectedRequests"
import { accountingActions } from "@/actions/accounting"
import { Lot, UnitOfMeasurement } from "@prisma/client"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const receiveItems = async (items: PurchaseOrderItem[], isFullyReceived: boolean = false, partialAmounts?: Map<string, number>,) => {

  const isPartial: boolean = partialAmounts !== undefined && partialAmounts !== null;

  const responses = await Promise.all(items.map(async (item) => {

    const quantity = isPartial ? getPartialQuantity(item, partialAmounts) : item.quantity;
    const lot = await handleLot(item, quantity);

    if (isPartial) {
      await handlePartialSplit(item, quantity);
    }

    await handleLotOrigin(lot.id, item.purchaseOrderId);
    await updatePo(item.purchaseOrderId, item.id, isPartial, isFullyReceived, lot.id);
    await updateConnectedRequests(item.purchaseOrderId, item.itemId, isPartial);
    await createPricingQueue(item);
    await createActivityLogs(item, lot, isPartial)
  }))

  return responses;
}

const getPartialQuantity = (item: PurchaseOrderItem, partialAmounts?: Map<string, number>) => {
  if (!partialAmounts?.has((item.id))) {
    throw new Error('Partial quantity not found.');
  };

  const partialQuantity = partialAmounts.get(item.id);
  if (!partialQuantity) {
    throw new Error('Partial quantity was not found');
  }
  return partialQuantity;
}

const handleLot = async (item: PurchaseOrderItem, quantityRecieved: number) => {

  const lotNumber = generateLotNumber(item.item.referenceCode);
  const isUomMatching = await uomUtils.isUomMatching(item.uomId, item.item.inventoryUomId);

  const quantity = isUomMatching ? quantityRecieved : await uomUtils.convert(item.uomId, quantityRecieved, item.item.inventoryUomId, item.itemId, item.purchaseOrders.supplierId)


  const lot = await prisma.lot.create({
    data: {
      itemId: item.item.id,
      lotNumber,
      initialQuantity: quantity,
      uomId: item.item.inventoryUomId,
    },
    include: {
      uom: true
    }
  })

  return lot;
};

const handleLotOrigin = async (lotId: string, purchaseOrderId: string) => {
  return await prisma.lotOrigin.create({
    data: {
      lotId,
      purchaseOrderId,
      originType: 'purchaseOrderReceiving'
    }
  });
}

const updatePo = async (purchaseOrderId: string, purchaseOrderItemId: string, isPartial: boolean, isFullyReceived: boolean, lotId: string) => {
  // ispartial has to do with the line items
  // is fully receieved has to do with the entire po

  const statusId = (isFullyReceived && !isPartial)
    ? purchaseOrderStatuses.received
    : purchaseOrderStatuses.partiallyReceived;

  await prisma.purchaseOrder.update({
    where: {
      id: purchaseOrderId,
    },
    data: {
      statusId
    }
  })

  return await prisma.purchaseOrderItem.update({
    where: {
      id: purchaseOrderItemId,
    },
    data: {
      purchaseOrderStatusId: purchaseOrderStatuses.received,
      lotId,
    }
  })
}


const createPricingQueue = async (item: PurchaseOrderItem) => {
  if (item.item.itemType && item.item.itemType.config && item.item.itemType.config.isPricingExaminationTriggerEnabled) {
    createActivityLog('Pricing Enqueued', 'item', item.itemId, { context: `Added to pricing queue from PO reception: PO #${item.purchaseOrders.referenceCode}.` })
    return await accountingActions.pricing.createQueue({
      itemId: item.item.id,
      isCompleted: false,
    })
  }
}

const handlePartialSplit = async (item: PurchaseOrderItem, recievedQuantity: number) => {

  const remainingQuantity = item.quantity - recievedQuantity;

  await prisma.purchaseOrderItem.update({
    where: {
      id: item.id,
    },
    data: {
      quantity: recievedQuantity,
    }
  })

  return await prisma.purchaseOrderItem.create({
    data: {
      purchaseOrderId: item.purchaseOrderId,
      itemId: item.item.id,
      quantity: remainingQuantity,
      pricePerUnit: item.pricePerUnit,
      uomId: item.uomId,
      purchaseOrderStatusId: purchaseOrderStatuses.partiallyReceived,
    }
  });

}

const createActivityLogs = async (item: PurchaseOrderItem, lot: Lot & { uom: UnitOfMeasurement }, isPartial: boolean) => {

  // new lot lot creation
  createActivityLog('Lot Created', 'item', item.itemId, { context: `Lot ${lot.lotNumber} was created from receiving PO #${item.purchaseOrders.referenceCode}` })

  // update of po
  const poAction = isPartial ? 'Item Partially Received' : 'Item Received';
  // unsure if this uom should be the purchasing uom or the converted (if necessary) uom
  createActivityLog(poAction, 'purchaseOrder', item.purchaseOrderId, { context: `${item.item.name}: ${isPartial ? 'Partially Received' : 'Received'}  ${lot.initialQuantity} ${lot.uom.abbreviation}` })

  // pricing queue


}






