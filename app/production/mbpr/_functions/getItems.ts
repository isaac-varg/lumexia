'use server'

import itemActions from "@/actions/inventory/items"
import { Alias } from "@/types/alias"
import { Item } from "@/types/item"

export const getItems = async () => {
  
  const data = await itemActions.getAll(undefined, ["aliases"]) 

  const items = data.map((item: Item) => {

    const mergedAliases = item.aliases?.map((alias: Alias) => alias.name).join(", ")

    return {
      ...item,
      mergedAliases
    }
  })

  return items


}
