'use server'

import prisma from "@/lib/prisma"

export const deletePricingTemplateAuxiliary = async (id: string) => {
    const res = await prisma.pricingTemplateAuxiliary.delete({
        where: {
            id,
        }
    })

    return res
}
