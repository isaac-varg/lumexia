import { createFilledConsumerContainer } from "./consumerContainers/createFilledConsumerContainer";
import { createOneConsumerContainer } from "./consumerContainers/createOne";
import { deletedFilledConsumerContainer } from "./consumerContainers/deleteFilledConsumerContainer";
import { getAllConsumerContainers } from "./consumerContainers/getAll";
import { getAllByFillItem } from "./consumerContainers/getAllByFillItem";
import { getPackagingItems } from "./consumerContainers/getPackagingItems";
import { updateOneFilledConsumerContainer } from "./consumerContainers/updateOneFilledConsumerContainer";
import { createExamination } from "./examinations/create";
import { createExaminationNote } from "./examinations/notes/createExaminationNote";
import { createExaminationNoteType } from "./examinations/notes/createExaminationNoteType";
import { getAllByExamId } from "./examinations/notes/getAllByExamId";
import { getAllNoteTypes } from "./examinations/notes/getAllNoteTypes";
import { getItemPricingData } from "./pricing/getItemPricingData";
import { getLastItemPrice } from "./pricing/getLastItemPrice";

export const accountingActions = {
    pricing: {
        item: {
            getItemPricingData: getItemPricingData,
            getLastItemPrice: getLastItemPrice,
        }
    },
    filledConsumerContainers: {
        getAllByFillItem: getAllByFillItem,
        createOne: createFilledConsumerContainer,
        update: updateOneFilledConsumerContainer,
        delete: deletedFilledConsumerContainer,
    },
    consumerContainers: {
        getPackagingItems: getPackagingItems,
        getAll: getAllConsumerContainers,
        createOne: createOneConsumerContainer,
    },
    examinations: {
        notes: {
            getAllNoteTypes: getAllNoteTypes,
            getAll: getAllByExamId,
            createNoteType: createExaminationNoteType,
            create: createExaminationNote,
        },
        create: createExamination,
    }
}
