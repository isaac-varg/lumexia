'use server'

import { getUserId } from "@/actions/users/getUserId";
import { staticRecords } from "@/configs/staticRecords"
import { inventoryTypes } from "@/configs/staticRecords/inventoryTypes";
import { procurementTypes } from "@/configs/staticRecords/procurementTypes";
import prisma from "@/lib/prisma"
import { DateTime } from "luxon";



export const createNewItemAndRequest = async (generalRequestId: string, itemTypeId: string, referenceCode: string, name: string, generalRequestReferenceCode: number) => {

  const item = await prisma.item.create({
    data: {
      name,
      referenceCode,
      itemTypeId,
      inventoryTypeId: inventoryTypes.tracked,
      procurementTypeId: procurementTypes.purchased,
    }
  });


  const week = DateTime.now().toFormat("WW")
  const requestingUserId = await getUserId()

  const request = await prisma.purchasingRequest.create({
    data: {
      statusId: '226db3a6-2756-4a5d-a6c5-b741339baeea',
      itemId: item.id,
      title: `${item.name} <Week ${week}>`,
      priorityId: staticRecords.purchasing.requestPriorities.normal,
      requestingUserId,

    }
  });

  await prisma.requestNote.create({
    data: {
      requestId: request.id,
      userId: staticRecords.app.lumexia,
      content: `This was automagically created from General Requst #${generalRequestReferenceCode}`,
      noteTypeId: 'bdf7c7b0-3524-4f2c-a43b-b9a6c8c77322',


    }
  });

  await prisma.requestInventorySnapshot.create({
    data: {
      requestId: request.id,
      objectName: 'New Item',
      onHandQuantity: 0,
      allocatedQuantity: 0,
      availableQuantity: 0,
      warningOverridden: false,
      warningShown: false,
    }
  });




  const requestLink = await prisma.generalRequestLink.create({
    data: {
      purchasingRequestId: request.id,
      generalRequestId,
    }
  });

  return requestLink

}
