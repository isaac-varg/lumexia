import { getNewRequests } from "./getNewRequests";
import { getAllRecordStatuses } from "./recordStatuses/getAllRecordStatuses";

export const appActions = {
    sidebar: {
        getNewRequests: getNewRequests,
    },
    recordStatuses: {
        getAll: getAllRecordStatuses,
    }
}
