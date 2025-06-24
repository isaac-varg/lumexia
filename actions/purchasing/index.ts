import loadJsConfig from "next/dist/build/load-jsconfig";
import { getActiveRequestsByItemId } from "./getActiveRequestsByItemId";
import { getAllRequests } from "./getAllRequests";
import { createRequest } from "./requests/create";
import { getPurchasingRequestsForPlanning } from "./requests/getByItem";
import { getRequestsByStatus } from "./requests/getByStatus";
import { getAllRequestPriorities } from "./requests/priorities/getAll";
import { getAllSuppliers } from "./suppliers/getAll";

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
    }
}
