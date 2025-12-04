import { getAliasByItem } from "./aliases/getByItem";
import { createAuditRequest } from "./auditRequests/create";
import { getAllCompletedAuditRequests } from "./auditRequests/getAllCompleted";
import { createAuditRequestNoteType } from "./auditRequests/noteTypes/create";
import { getAuditRequestNoteTypes } from "./auditRequests/noteTypes/getAll";
import { createAuditRequestNote } from "./auditRequests/notes/create";
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
import { getAllInventoryByBom } from "./inventory/getAllByBom";
import { createDiscreteConversion } from "./items/discreteConversions/create";
import { deleteDiscreteConversion } from "./items/discreteConversions/delete";
import { getAllDiscreteConversions } from "./items/discreteConversions/getAll";
import { updateDiscreteConversion } from "./items/discreteConversions/update";
import { createItemNote } from "./items/notes/createNote";
import { getAllItemNotesByItem } from "./items/notes/getAllByItem";
import { createItemNoteType } from "./items/notes/types/createItemNoteType";
import { getAllItemNoteTypes } from "./items/notes/types/getAllItemNoteTypes";
import { getAllLots } from "./lots/getAll";
import { getSingleLot } from "./lots/getOne";
import { getReceivables } from "./receiving/getReceivables";
import { createInventoryTransaction } from "./transactions/create";

export const inventoryActions = {
  getInventory: getInventory,
  getPurchasedItems: getPurchasedItems,
  auditReqests: {
    noteTypes: {
      create: createAuditRequestNoteType,
      getAll: getAuditRequestNoteTypes,
    },
    notes: {
      create: createAuditRequestNote,
    },
    getAllCompleted: getAllCompletedAuditRequests,
    create: createAuditRequest,
    getAll: getAuditRequests,
    getOne: getOneAuditRequest,
    getCount: getAuditRequestCount,
  },
  getItemLots: getItemLots,
  items: {
    discreteConversions: {
      getAll: getAllDiscreteConversions,
      delete: deleteDiscreteConversion,
      update: updateDiscreteConversion,
      create: createDiscreteConversion,
    },
    notes: {
      getAllByItem: getAllItemNotesByItem,
      create: createItemNote,
      types: {
        getAll: getAllItemNoteTypes,
        create: createItemNoteType,
      }
    },
    getOne: getOneItem,
    getAll: getAllItems,
  },
  inventory: {
    getByItem: getInventory,
    getByLot: getInventoryOfLot,
    getAllByBprBom: getAllInventoryByBom,
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
  },
  transactions: {
    create: createInventoryTransaction,
  }
}


