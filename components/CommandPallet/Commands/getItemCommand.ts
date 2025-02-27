import { Item } from "@/actions/inventory/getAllItems";
import { Command } from "../CommandType";
import { getSlug } from "@/utils/general/getSlug";

export const getItemCommand = (item: Item): Command => {
    const slug = getSlug(item.name);
    return {
       id: item.id,
       commandType: 'item',
       label: item.name,
       terms: [item.aliases.join(",")],
       path: `/inventory/items/${slug}?id=${item.id}`
    }
}
