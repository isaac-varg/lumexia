"use server"

import prisma from "@/lib/prisma"

export const getBprStaging = async (bprBomId: string) => {

 const staging = await prisma.bprStaging.findMany({
    where: {
      bprBomId, 
    },
    include: {
      lot: true,
      pulledByUser: true
    }
 }) 
 return staging;
}
