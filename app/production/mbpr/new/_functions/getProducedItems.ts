'use server'

import itemActions from "@/actions/inventory/items"
import { staticRecords } from "@/configs/staticRecords"
import { procurementTypes } from "@/configs/staticRecords/procurementTypes"
import { Alias } from "@/types/alias"
import { Item } from "@/types/item"

export const getProducedItems = async () => {
  const data = await itemActions.getAll({ procurementTypeId: procurementTypes.produced }, [
    'aliases'
  ])

  const items = data.map((item: Item) => {


    const mergedAliases = item.aliases?.map((alias: Alias) => alias.name).join(", ")

    return {
      ...item,
      mergedAliases
    }
  })

  return items


}
