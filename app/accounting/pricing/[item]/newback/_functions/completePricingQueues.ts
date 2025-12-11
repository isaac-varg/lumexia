'use server'

import prisma from "@/lib/prisma"

export const completePricingQueues = async (itemId: string) => {

 const response = await prisma.pricingQueue.updateMany({    
    where: {
        itemId,
    },
    data: {
        isCompleted: true,
    }
 });

 return response;
    
}
