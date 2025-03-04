'use server'

import prisma from "@/lib/prisma"

export const getAllByFillItem = async (fillItemId: string) => {
        
    const consumerContainers = await prisma.itemConsumerContainer.findMany({
       where: {
           itemId: fillItemId,
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
