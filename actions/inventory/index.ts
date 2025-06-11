import { getAliasByItem } from "./aliases/getByItem";
import { createGenericUnitConversionFactor } from "./genericUnitConversionFactors/create";
import { getConversionByItemSupplierUnique } from "./genericUnitConversionFactors/getByItemSupplierUnique";
import { getAllItems } from "./getAllItems";
import { getAllUom } from "./getAllUom";
import { getAuditRequests } from "./getAuditRequests";
import { getAuditRequestCount } from "./getAuditRequestsCount";
import { getInventory } from "./getInventory";
import { getInventoryOfLot } from "./getInventoryOfLot";
import { getItemLots } from "./getItemLots";
import { getOneAuditRequest } from "./getOneAuditRequest";
import { getOneItem } from "./getOneItem";
import { getPurchasedItems } from "./getPurchasedItems";
import { getAllLots } from "./lots/getAll";
import { getSingleLot } from "./lots/getOne";
import { getReceivables } from "./receiving/getReceivables";

export const inventoryActions = {
    getInventory: getInventory,
    getPurchasedItems: getPurchasedItems,
    auditReqests: {
        getAll: getAuditRequests,
        getOne: getOneAuditRequest,
        getCount: getAuditRequestCount,
    },
    getItemLots: getItemLots,
    items: {
        getOne: getOneItem,
        getAll: getAllItems
    },
    inventory: {
        getByItem: getInventory,
        getByLot: getInventoryOfLot,
    },
    uom: {
        getAll: getAllUom,
    },
    receiving: {
        getReceivables: getReceivables,
    },
    genericUnitsConversion: {
        getBySupplierItemUnique: getConversionByItemSupplierUnique,
        create: createGenericUnitConversionFactor,
    },
    lots: {
        getOne: getSingleLot,
        getAll: getAllLots,
    },
    aliases: {
        getByItem: getAliasByItem,
    }
}


