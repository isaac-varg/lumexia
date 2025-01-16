"use server"

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"

export const getLinkableBprs = async (itemId: string) => {

    const linkables = await prisma.bprBillOfMaterials.findMany({
        where: {
            bom: {
                itemId,
            },
            bpr: {
                OR: [
                    { bprStatusId: staticRecords.production.bprStatuses.draft},
                    { bprStatusId: staticRecords.production.bprStatuses.allocatedMaterials},
                    { bprStatusId: staticRecords.production.bprStatuses.awaitingMaterials},
                    { bprStatusId: staticRecords.production.bprStatuses.verifyingBomFulfillment}, 
                    { bprStatusId: staticRecords.production.bprStatuses.knownMaterialArrival}, 
                ]
            }
        },
        include: {
            bpr: {
                include: {
                    mbpr: {
                        include: {
                            producesItem: true
                        }
                    },
                    status: true,
                    batchSize: true
                }
            }, 
            bom: true,
        }
    })

    return linkables
}

export type LinkableBatches = Awaited<ReturnType<typeof getLinkableBprs>>

export type LinkableBatchesEntry = LinkableBatches[number];

