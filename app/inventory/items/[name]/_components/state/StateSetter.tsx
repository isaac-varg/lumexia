'use client'

import { SingleItem } from "@/actions/inventory/getOneItem";
import { useItemActions } from "@/store/itemSlice";
import { InventoryType, ItemType, ProcurementType } from "@prisma/client";
import { useEffect } from "react";

type StateSetterProps = {
  item: SingleItem | null
  procurementTypes: ProcurementType[]
  itemTypes: ItemType[]
  inventoryTypes: InventoryType[]
}

const StateSetter = ({
  item,
  procurementTypes,
  itemTypes,
  inventoryTypes,
}: StateSetterProps) => {

  const {
    setItem
  } = useItemActions();

  useEffect(() => {
    setItem(item)
  }, [item])


  return false;
}

export default StateSetter
