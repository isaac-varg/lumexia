import { createCompoundingVessel } from "./compoundingVessels/createCompoundingVessel";
import { getAllCompoundingVessels } from "./compoundingVessels/getAllCompoundinVessels";
import { updateCompoundingVessel } from "./compoundingVessels/updateCompoundingVessel";
import { getActiveMbpr } from "./getActiveMbpr";
import { getAllMbprs } from "./getAllMbprs";
import { getBprStatuses } from "./getBprStatuses";
import { getMbprsByItem } from "./getMbprsByItem";
import { getPlanningBprs } from "./getPlanningBprs";
import { createAddedum } from "./mbpr/addendums/create";
import { deleteAddendum } from "./mbpr/addendums/delete";
import { getAllAddendumsByMbpr } from "./mbpr/addendums/getAllByMbpr";
import { updateAddendum } from "./mbpr/addendums/update";
import { updateBatchSize } from "./mbpr/batchSizes/updateBatchSize";
import { createMbprBOM } from "./mbpr/bom/create";
import { getAllBomMaterialsByMbpr } from "./mbpr/bom/getAllByMbpr";
import { updateMbprBOM } from "./mbpr/bom/update";
import { getAllByProducedItem } from "./mbpr/getAllByProducedItem";
import { getOneMbpr } from "./mbpr/getOneMbpr";
import { createInstruction } from "./mbpr/instructions/create";
import { deleteInstruction } from "./mbpr/instructions/delete";
import { getAllInstructionsByMbpr } from "./mbpr/instructions/getAllByMbpr";
import { updateInstruction } from "./mbpr/instructions/update";
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
        },
        instructions: {
            getAllByMbpr: getAllInstructionsByMbpr,
            create: createInstruction,
            update: updateInstruction,
            delete: deleteInstruction,
        },
        addendums: {
            getAllByMbpr: getAllAddendumsByMbpr,
            create: createAddedum,
            update: updateAddendum,
            delete: deleteAddendum,
        }
    },
    compoundingVessels: {
        getAll: getAllCompoundingVessels,
        create: createCompoundingVessel,
        update: updateCompoundingVessel,
    }
};
