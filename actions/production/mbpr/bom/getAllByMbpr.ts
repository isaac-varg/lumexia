"use server"

import prisma from "@/lib/prisma"

export const getAllBomMaterialsByMbpr = async (mbprId: string) => {
    const materials = await prisma.billOfMaterial.findMany({
        where: {
            mbprId,
        },
        include: {
            item: true
        }
    });
    
    return materials
};

export type  BomMaterialByMbpr = Awaited<ReturnType<typeof getAllBomMaterialsByMbpr>>[number]
