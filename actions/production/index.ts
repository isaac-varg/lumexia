import { createCompoundingVessel } from "./compoundingVessels/createCompoundingVessel";
import { getAllCompoundingVessels } from "./compoundingVessels/getAllCompoundinVessels";
import { updateCompoundingVessel } from "./compoundingVessels/updateCompoundingVessel";
import { getActiveMbpr } from "./getActiveMbpr";
import { getAllMbprs } from "./getAllMbprs";
import { getBprStatuses } from "./getBprStatuses";
import { getMbprsByItem } from "./getMbprsByItem";
import { getPlanningBprs } from "./getPlanningBprs";
import { updateBatchSize } from "./mbpr/batchSizes/updateBatchSize";
import { createMbprBOM } from "./mbpr/bom/create";
import { getAllBomMaterialsByMbpr } from "./mbpr/bom/getAllByMbpr";
import { updateMbprBOM } from "./mbpr/bom/update";
import { getAllByProducedItem } from "./mbpr/getAllByProducedItem";
import { getOneMbpr } from "./mbpr/getOneMbpr";
import { getAllByMbpr } from "./mbpr/steps/getAllByMbpr";
import { updateMbpr } from "./mbpr/updateMbpr";
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
        getActive: getActiveMbpr,
        getAllByProducedItem: getAllByProducedItem, //same as below really, not sure why these are separate
        getByItem: getMbprsByItem,
        getAll: getAllMbprs,
        getOne: getOneMbpr,
        update: updateMbpr,
        batchSizes: {
            update: updateBatchSize,
        },
        steps: {
            getAllByMbpr: getAllByMbpr,
        },
        bom: {
            update: updateMbprBOM,
            create: createMbprBOM,
            getAllByMbpr: getAllBomMaterialsByMbpr,
        }
    },
    compoundingVessels: {
        getAll: getAllCompoundingVessels,
        create: createCompoundingVessel,
        update: updateCompoundingVessel,
    }
};
