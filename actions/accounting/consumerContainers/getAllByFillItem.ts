'use server'

import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma"

export const getAllByFillItem = async (fillItemId: string) => {
        
    const consumerContainers = await prisma.itemConsumerContainer.findMany({
       where: {
           itemId: fillItemId,
           NOT: {
               recordStatusId: staticRecords.app.recordStatuses.archived
           }
       } ,
       include: {
           consumerContainer: {
               include: {
                    containerItem: true                   
               }
           },
           uom: true
       }
    })


    return consumerContainers;
    
}

export type FilledConsumerContainer = Awaited<ReturnType<typeof getAllByFillItem>>[number]
