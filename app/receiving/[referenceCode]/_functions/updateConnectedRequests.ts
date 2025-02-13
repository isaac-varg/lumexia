"use server"

import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma"

export const updateConnectedRequests = async (poId: string,itemId: string, partial: boolean = false) => {

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
    await Promise.all(requests.map( async (request) => {

        const id = request.request.id;
        const statusId = partial ? staticRecords.purchasing.requestStatuses.partialDelivery : staticRecords.purchasing.requestStatuses.delivered

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
                userId: staticRecords.app.lumexia,
                content,
                noteTypeId: staticRecords.purchasing.requestTypes.automated,
            }
        })

        return note
    }))
    
    return requests;

}
