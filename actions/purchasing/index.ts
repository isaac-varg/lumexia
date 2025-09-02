import loadJsConfig from "next/dist/build/load-jsconfig";
import { getActiveRequestsByItemId } from "./getActiveRequestsByItemId";
import { getAllRequests } from "./getAllRequests";
import { createRequest } from "./requests/create";
import { getPurchasingRequestsForPlanning } from "./requests/getByItem";
import { getRequestsByStatus } from "./requests/getByStatus";
import { getAllRequestPriorities } from "./requests/priorities/getAll";
import { getAllSuppliers } from "./suppliers/getAll";
import { getInternalNotes } from "./purchaseOrders/notes/interal/getAll";
import { createInternalNote } from "./purchaseOrders/notes/interal/create";
import { getAllInternalNoteTypes } from "./purchaseOrders/notes/interal/getAllInternalNoteTypes";
import { createPoInternalNoteType } from "./purchaseOrders/notes/interal/createInternalNoteType";
import { deletePoPublicNote } from "./purchaseOrders/notes/public/delete";
import { getPoPublicNotes } from "./purchaseOrders/notes/public/getAll";
import { createPoPublicNote } from "./purchaseOrders/notes/public/create";
import { getAllPoPublicNoteTypes } from "./purchaseOrders/notes/public/getAllTypes";
import { createPoPublicNoteType } from "./purchaseOrders/notes/public/createType";
import { deletePoSupplierNote } from "./purchaseOrders/notes/supplier/delete";
import { getAllPoSupplierNotes } from "./purchaseOrders/notes/supplier/getAll";
import { createPoSupplierNote } from "./purchaseOrders/notes/supplier/create";
import { createPoSupplierNoteType } from "./purchaseOrders/notes/supplier/createType";
import { getAllPoSupplierNoteTypes } from "./purchaseOrders/notes/supplier/getAllTypes";
import { getActivity } from "./purchaseOrders/getActivity";

export const purchasingActions = {
  requests: {
    getActiveByItemId: getActiveRequestsByItemId,
    getPurchasingRequestsForPlanning: getPurchasingRequestsForPlanning,
    getAll: getAllRequests,
    getAllByStatus: getRequestsByStatus,
    create: createRequest,
    priorities: {
      getAll: getAllRequestPriorities,
    }
  },
  suppliers: {
    getAll: getAllSuppliers,
  },
  purchaseOrders: {
    getActivity: getActivity,
    notes: {
      internal: {
        getAll: getInternalNotes,
        create: createInternalNote,
        types: {
          getAll: getAllInternalNoteTypes,
          create: createPoInternalNoteType,
        }
      },
      public: {
        getAll: getPoPublicNotes,
        create: createPoPublicNote,
        delete: deletePoPublicNote,
        types: {
          getAll: getAllPoPublicNoteTypes,
          create: createPoPublicNoteType,
        }
      },
      supplier: {
        getAll: getAllPoSupplierNotes,
        create: createPoSupplierNote,
        delete: deletePoSupplierNote,
        types: {
          getAll: getAllPoSupplierNoteTypes,
          create: createPoSupplierNoteType,
        },
      }
    }
  }
}
