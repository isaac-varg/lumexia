import { createQcParameter } from "./qc/parameters/create";
import { getAllQcParameters } from "./qc/parameters/getAll";
import { createQcTemplate } from "./qc/templates/create";
import { getAllQcTemplates } from "./qc/templates/getAll";

export const qualityActions = {
    qc: {
        parameters: {
            getAll: getAllQcParameters,
            create: createQcParameter,
        },
        templates: {
            getAll: getAllQcTemplates,
            create: createQcTemplate,
        }
    }
};
