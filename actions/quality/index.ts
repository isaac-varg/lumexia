import { getAllExaminationTypes } from "./qc/examinationTypes/getAll";
import { deleteQcItemParameter } from "./qc/itemParameters/delete";
import { createQcParameter } from "./qc/parameters/create";
import { getAllQcParameters } from "./qc/parameters/getAll";
import { getAllQcParametersByItem } from "./qc/parameters/getAllByItem";
import { createRecordNote } from "./qc/recordNotes/create";
import { getAllRecordNotesByRecord } from "./qc/recordNotes/getAllByRecord";
import { createQcRecordNoteType } from "./qc/recordNotes/types/create";
import { getAllQcRecordNoteTypes } from "./qc/recordNotes/types/getAll";
import { createQcRecord } from "./qc/records/create";
import { getAllQcRecordStatuses } from "./qc/records/statuses/getAll";
import { createTemplateParameter } from "./qc/templateParameters/create";
import { deleteTemplateParameter } from "./qc/templateParameters/delete";
import { createQcTemplate } from "./qc/templates/create";
import { getAllQcTemplates } from "./qc/templates/getAll";

export const qualityActions = {
    qc: {
        parameters: {
            getAll: getAllQcParameters,
            create: createQcParameter,
        },
        itemParameters: {
            getByItem: getAllQcParametersByItem,
            delete: deleteQcItemParameter
        },
        templates: {
            getAll: getAllQcTemplates,
            create: createQcTemplate,
        },
        templateParameters: {
            create: createTemplateParameter,
            delete: deleteTemplateParameter,
        },
        examinationTypes: {
            getAll: getAllExaminationTypes,
        },
        recordNotes: {
            create: createRecordNote,
            getAllByRecord: getAllRecordNotesByRecord,
            types: {
                getAll: getAllQcRecordNoteTypes,
                create: createQcRecordNoteType,
            }
        },
        records: {
            create: createQcRecord,
            statsues: {
                getAll: getAllQcRecordStatuses,
            }
        }
    }
};
