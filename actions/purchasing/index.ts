import { getActiveRequestsByItemId } from "./getActiveRequestsByItemId";
import { getAllRequests } from "./getAllRequests";
import { getRequestsByStatus } from "./requests/getByStatus";

export const purchasingActions = {
    requests: {
        getActiveByItemId: getActiveRequestsByItemId,
        getAll: getAllRequests,
        getAllByStatus: getRequestsByStatus,
    }
}
