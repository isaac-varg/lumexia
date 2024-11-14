import { AliasType } from "./aliasType";

export interface Alias {
    id: string;
    name: string;
    itemId: string;
    aliasTypeId: string
    createdAt: Date;
    updatedAt: Date;
    aliasType?: AliasType
}
