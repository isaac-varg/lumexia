import { getAllItems } from "./getAllItems";
import { getAllUom } from "./getAllUom";
import { getAuditRequests } from "./getAuditRequests";
import { getInventory } from "./getInventory";
import { getInventoryOfLot } from "./getInventoryOfLot";
import { getItemLots } from "./getItemLots";
import { getOneAuditRequest } from "./getOneAuditRequest";
import { getPurchasedItems } from "./getPurchasedItems";

export const inventoryActions = {
    getInventory: getInventory,
    getPurchasedItems: getPurchasedItems,
    auditReqests: {
        getAll: getAuditRequests,
        getOne: getOneAuditRequest,
    },
    getItemLots: getItemLots,
    items: {
        getAll: getAllItems
    },
    inventory: {
        getByItem: getInventory,
        getByLot: getInventoryOfLot,
    },
    uom: {
        getAll: getAllUom,
    }
}


