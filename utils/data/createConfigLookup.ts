import { Config } from "@prisma/client";

// faster than looping and doing a check for the key
// can then use variable['key']
export const createConfigLookup = (config: Config[]): Record<string, string> => {
    return config.reduce((acc: Record<string, string>, item) => {
        acc[item.key] = item.value;
        return acc;
    }, {});
}


