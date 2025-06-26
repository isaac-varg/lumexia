"use server"

import prisma from "@/lib/prisma";

export const getBprBom = async (bprId: string) => {

    const bom = await prisma.bprBillOfMaterials.findMany({
        where: {
            bprId,
        },
        include: {
            bom: {
                include: {
                    item: true
                }
            },
            status: true,
            bpr: true,
            BprStaging: {
                orderBy: {
                    createdAt: 'asc',
                },
                include: {
                    BprStagingVerification: {
                        include: {
                            user: true
                        }
                    },
                    status: true,
                    pulledByUser: true,
                }
            }
        },
        orderBy: {
            bom: {
                identifier: 'asc'
            }
        }
    });



    return bom;
}

export type BprBomItem = Awaited<ReturnType<typeof getBprBom>>[number];
