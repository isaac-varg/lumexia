import { toCamelCase } from "./camelCase";
import { capitalize } from "./capitalize";
import { toProperCase } from "./properCase";
import { singularize } from "./singularize";

export const TextUtils = {
    capitalize: capitalize,
    singularize: singularize,
    camelCase: toCamelCase,
    properCase: toProperCase,
}
