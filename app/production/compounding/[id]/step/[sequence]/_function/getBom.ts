"use server"

import prisma from "@/lib/prisma"

export const getBom = async (batchStepId: string) => {
    const bom = await prisma.billOfMaterial.findMany({
        where: {
            stepId: batchStepId,
        },
        include: {
            item: {
                include: {
                    aliases: true
                }
            }
        }
    })


    const updatedBom = bom.map((entry) => {

        const flattenAliases = entry.item.aliases?.map((alias) => alias.name).join(", ");

        return {
            ...entry,
            aliasesAll: flattenAliases,
        }

    })

    return updatedBom


}

