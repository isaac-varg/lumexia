import { createQcParameter } from "./qc/parameters/create";
import { getAllQcParameters } from "./qc/parameters/getAll";

export const qualityActions = {
    qc: {
        parameters: {
            getAll: getAllQcParameters,
            create: createQcParameter,
        }
    }
};
