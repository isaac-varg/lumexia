import { Item } from "@/types/item";

export const flattenItem = (items: Item[]) => {
  return items.map((item) => {

    if (!item.itemType || !item.procurementType) {
      return;
    }

    const {
      itemType: { name: itemTypeName },
      procurementType: { name: procurementTypeName },
      aliases
    } = item;

    const flattenAliases = aliases?.map((alias) => alias.name).join(", ");

    return { ...item, itemTypeName, procurementTypeName, aliasesAll: flattenAliases};
  });
};
