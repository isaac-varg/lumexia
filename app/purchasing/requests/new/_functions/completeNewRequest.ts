'use server'

import prisma from "@/lib/prisma"
import { InterimNote, InterimSnapshotWarnings } from "../_components/MainPanel"
import { getUserId } from "@/actions/users/getUserId"
import { inventoryActions } from "@/actions/inventory"
import { revalidatePath } from "next/cache"
import { requestPriorities } from "@/configs/staticRecords/requestPriorities"
import { requestStatuses } from "@/configs/staticRecords/requestStatuses"

export const completeNewRequest = async (itemId: string, notes: InterimNote[], snapshotWarnings: InterimSnapshotWarnings) => {

  const userId = await getUserId()
  const inventory = await inventoryActions.getInventory(itemId)

  if (!inventory || !inventory.item) { throw new Error("Inventory of item not found.") }

  const requestTitle = inventory.item.name


  // add the request
  const request = await prisma.purchasingRequest.create({
    data: {
      itemId,
      requestingUserId: userId,
      statusId: requestStatuses.requested,
      title: requestTitle,
      priorityId: requestPriorities.normal,
    }
  });


  // add snapshot details
  const inventorySnapshot = await prisma.requestInventorySnapshot.create({
    data: {
      objectName: '',
      requestId: request.id,
      onHandQuantity: inventory.totalQuantityOnHand,
      allocatedQuantity: inventory.totalQuantityAllocated,
      availableQuantity: inventory.totalQuantityAvailable,
      allocatedBprIds: inventory.allocated.map((bpr) => bpr.bpr.id),
      pendingPoIds: inventory.purchases.map((po) => po.purchaseOrderId),
      warningShown: snapshotWarnings.warningShown,
      warningOverridden: snapshotWarnings.warningOverridden,
    }
  })

  // add notes 

  const notesPromises = Promise.all(notes.map(async (note) => {
    const response = await prisma.requestNote.create({
      data: {
        requestId: request.id,
        userId,
        content: note.content,
        noteTypeId: note.noteTypeId,
      }
    })

    return response;
  }))

  revalidatePath('/purchasing/requests')

  return request;

}
