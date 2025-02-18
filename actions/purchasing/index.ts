import { getActiveRequestsByItemId } from "./getActiveRequestsByItemId";
import { getAllRequests } from "./getAllRequests";

export const purchasingActions = {
    requests: {
        getActiveByItemId:  getActiveRequestsByItemId,
        getAll: getAllRequests,
    }
}
