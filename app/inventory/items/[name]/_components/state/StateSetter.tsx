'use client'

import { ItemAlias } from "@/actions/inventory/aliases/getByItem";
import { SingleItem } from "@/actions/inventory/getOneItem";
import { ItemNote } from "@/actions/inventory/items/notes/getAllByItem";
import { useItemActions, useItemSelection } from "@/store/itemSlice";
import { useEffect } from "react";
import { ItemActivity } from "../../_actions/basics/getActivity";
import { Inventory } from "@/actions/inventory/getInventory";
import { ItemInventoryAudits } from "../../_actions/inventory/getAudits";
import { DashboardItemPurchaseOrder } from "../../_actions/purchasing/getItemPurchaseOrders";

type StateSetterProps = {
  activity: ItemActivity[],
  aliases: ItemAlias[]
  item: SingleItem | null
  inventory: Inventory | null,
  notes: ItemNote[],
  audits: ItemInventoryAudits,
  purchaseOrders: DashboardItemPurchaseOrder[],
}


const StateSetter = ({
  activity,
  aliases,
  inventory,
  item,
  notes,
  audits,
  purchaseOrders,
}: StateSetterProps) => {

  // state actions
  const {
    setActivity,
    setAliases,
    setAudits,
    setItem,
    setInventory,
    setNotes,
    setPurchaseOrders,
    getOptions,
    getFilteredPurchaseOrders,
  } = useItemActions();

  // current state
  const {
    options,
    purchasingFilterMode,
    filterPurchaseOrdersYear,
  } = useItemSelection()

  useEffect(() => {
    setItem(item)
  }, [item])

  // get options only if the state is empty 
  // saves server calls
  useEffect(() => {

    const isEmpty = Object.values(options).every(arr => arr.length === 0);
    if (isEmpty) {
      getOptions();
    }

    // set states based off item 
    setActivity(activity);
    setAliases(aliases);
    setAudits(audits);
    setInventory(inventory);
    setNotes(notes);
    setPurchaseOrders(purchaseOrders);

  }, [item]);

  useEffect(() => {
    getFilteredPurchaseOrders();
  }, [purchasingFilterMode, filterPurchaseOrdersYear])


  return false;
}

export default StateSetter
