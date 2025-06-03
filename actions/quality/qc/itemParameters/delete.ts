'use server'

import prisma from "@/lib/prisma"

export const deleteQcItemParameter = async (id: string) => {
    const res = await prisma.qcItemParameter.delete({
        where: {
            id,
        }
    });

    return res
}
