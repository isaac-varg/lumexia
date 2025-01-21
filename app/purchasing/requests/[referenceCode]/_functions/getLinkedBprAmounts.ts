"use server"

import prisma from "@/lib/prisma"

export const getLinkedBprsAmounts = async (bprIds: string[], itemId: string) => {

    const bprs = bprIds.map(async (id) => {

        const bpr = await prisma.bprBillOfMaterials.findMany({
            where: {
                bom: {
                    itemId,
                },
                bprId: id, 
            },
            include: {
                bom: {
                    include: {
                        mbpr: {
                            include: {
                                producesItem: true
                            }
                        }
                    }
                },

            }
        });


        type Bpr = typeof bpr[number]

        // total if there are multiples of the same ingredient in that bom
        const total = bpr.reduce((acc: number, curr: Bpr) => acc + curr.quantity, 0)

        return {
            bprBom: bpr,
            total,
        }
    })


    const bprBoms = await Promise.all(bprs);

    type BprBoms = typeof bprBoms[number]

    const totalNeeded = bprBoms.reduce((acc: number, curr: BprBoms) => acc + curr.total, 0);


    console.log(bprBoms)

    return {
        bprBoms,
        totalNeeded,
    }

}


export type LinkedBprsAmounts = Awaited<ReturnType<typeof getLinkedBprsAmounts>>;
