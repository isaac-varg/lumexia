'use server'

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"

const { warehouseSupplies, productionBase, officeSupplies, labSupplies, packaging } = staticRecords.inventory.itemTypes

export const beginDiscrepancyAuditCascade = async (itemTypeId: string | null) => {

    // get the items
    const items = await prisma.item.findMany({
        where: {
            itemTypeId: itemTypeId ? itemTypeId : {
                notIn: [
                    warehouseSupplies,
                    productionBase,
                    officeSupplies,
                    labSupplies,
                    packaging
                ]
            }
        },
    });

    // get the item inventories


    //create the audit
    //create the audit items
    //profit




}
