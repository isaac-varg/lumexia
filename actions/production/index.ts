import { update } from "../classes/update";
import { createCompoundingVessel } from "./compoundingVessels/createCompoundingVessel";
import { getAllCompoundingVessels } from "./compoundingVessels/getAllCompoundinVessels";
import { updateCompoundingVessel } from "./compoundingVessels/updateCompoundingVessel";
import { getAllMbprs } from "./getAllMbprs";
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
        getAll: getAllMbprs,
    },
    compoundingVessels: {
        getAll: getAllCompoundingVessels,
        create: createCompoundingVessel,
        update: updateCompoundingVessel,
    }
};
