'use server'

import { getOnHandByItem } from "@/actions/inventory/inventory/getOnHandByItem"
import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"

const { warehouseSupplies, productionBase, officeSupplies, labSupplies, packaging } = staticRecords.inventory.itemTypes
const { purchased } = staticRecords.inventory.procurementTypes;


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
            },
            procurementTypeId: purchased,
        },
        select: {
            id: true
        }
    });

    // get the item inventories

    const withInventory = await Promise.all(items.map(async (item) => {
        const results = await getOnHandByItem(item.id);


        const lotsCount = results.lots.length;
        const depletedLotsCount = results.lots.filter(l => l.totalQuantityOnHand <= 0).length;

        return {
            ...results,
            lotsCount,
            depletedLotsCount,
        }
    }))


    //create the audit
    const audit = await prisma.discrepancyAudit.create({
        data: {
            ...(itemTypeId && { itemTypeId }),
            statusId: staticRecords.inventory.discrepancyAudits.statuses.open,
        }
    });

    //create the audit items
    const defaultItemStatus = staticRecords.inventory.discrepancyAudits.items.statuses.notChecked;
    const lb = staticRecords.inventory.uom.lb;
    const auditItems = await Promise.all(withInventory.map(async (item) => {
        const itemResponse = await prisma.discrepancyAuditItem.create({
            data: {
                itemId: item.item?.id || '',
                statusId: defaultItemStatus,
                discrepancyAuditId: audit.id,
                startingTotalQuantity: item.totalQuantityOnHand,
                quantitiesUomId: lb,
                startingLotsCount: item.lotsCount,
                startingDepletedLotsCount: item.depletedLotsCount,
            }
        })

        return itemResponse;
    }));

    return auditItems;
}
