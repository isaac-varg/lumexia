import { Item } from "@/actions/inventory/getAllItems";
import { Command } from "../CommandType";

export const getItemCommand = (item: Item): Command => {
    return {
       id: item.id,
       commandType: 'item',
       label: item.name,
       terms: [item.aliases.join(",")],
       path: `/inventory/items/${item.name}?id=${item.id}`
    }
}
