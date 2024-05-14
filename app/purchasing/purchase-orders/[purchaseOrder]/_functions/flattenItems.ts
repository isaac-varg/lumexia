import { Item } from "@/types/item";

export const flattenItems = (items: Item[]) => {
  return items.map((item) => {
    const flattenAliases = item.aliases?.map((alias) => alias.name).join(", ");

    return {
      ...item,
      aliasesAll: flattenAliases,
    };
  });
};
