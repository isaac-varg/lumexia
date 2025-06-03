import { deleteQcItemParameter } from "./qc/itemParameters/delete";
import { createQcParameter } from "./qc/parameters/create";
import { getAllQcParameters } from "./qc/parameters/getAll";
import { getAllQcParametersByItem } from "./qc/parameters/getAllByItem";
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
    }
};
