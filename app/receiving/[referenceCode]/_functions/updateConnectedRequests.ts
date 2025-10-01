"use server"

import { requestNoteTypes } from "@/configs/staticRecords/requestNoteTypes";
import { requestStatuses } from "@/configs/staticRecords/requestStatuses";
import { users } from "@/configs/staticRecords/users";
import prisma from "@/lib/prisma"

export const updateConnectedRequests = async (poId: string, itemId: string, partial: boolean = false) => {

  // get connected requests
  const requests = await prisma.requestPurchaseOrder.findMany({
    where: {
      poId,
      request: {
        itemId,
      }
    },
    include: {
      request: true
    }
  });


  // update status to received
  await Promise.all(requests.map(async (request) => {

    const id = request.request.id;
    const statusId = partial ? requestStatuses.partialDelivery : requestStatuses.delivered

    const update = await prisma.purchasingRequest.update({
      where: {
        id,
      },
      data: {
        statusId,
      }
    });

    return update;
  }))


  // add automated note
  await Promise.all(requests.map(async (request) => {

    const id = request.request.id;
    const content = partial ? 'Connected PO was partially received so the status was changed to partial delivery.' : 'Connect PO recieved so the status of this request was automatically changed to Recieved.'

    const note = await prisma.requestNote.create({
      data: {
        requestId: id,
        userId: users.lumexia,
        content,
        noteTypeId: requestNoteTypes.automated,
      }
    })

    return note
  }))

  return requests;

}
