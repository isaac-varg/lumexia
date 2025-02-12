import { getAuditRequests } from "./getAuditRequests";
import { getInventory } from "./getInventory";
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
}


