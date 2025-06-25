'use server'

import prisma from "@/lib/prisma"

export const deleteAuxiliary = async (id: string) => {
    const res = await prisma.finishedProductAuxiliary.delete({
        where: {
            id,
        }
    });

    return res 
}
