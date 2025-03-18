import { getBprStatuses } from "./getBprStatuses";
import { getMbprsByItem } from "./getMbprsByItem";
import { getPlanningBprs } from "./getPlanningBprs";
import { updateBpr } from "./updateBpr";

export const productionActions = {
    planning: {
        getBprs: getPlanningBprs,
    },
    bprs: {
        statuses: {
            getAll: getBprStatuses,
        },
        update: updateBpr,
    },
    mbprs: {
        getByItem: getMbprsByItem,
    }
};
