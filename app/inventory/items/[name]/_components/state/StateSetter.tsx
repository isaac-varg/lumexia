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
import { PricingExamination } from "@/actions/accounting/examinations/getAllByItem";
import { ItemPricingData } from "@/actions/accounting/pricing/getItemPricingData";
import { ItemUsage } from "../../_actions/production/getUsage";
import { ItemActiveMbpr } from "../../_actions/production/getActiveMbpr";
import { ItemBpr } from "../../_actions/production/getBprs";

type StateSetterProps = {
  activity: ItemActivity[],
  aliases: ItemAlias[]
  item: SingleItem | null
  inventory: Inventory | null,
  notes: ItemNote[],
  audits: ItemInventoryAudits,
  purchaseOrders: DashboardItemPurchaseOrder[],
  examinations: PricingExamination[],
  pricingData: ItemPricingData,
  usage: ItemUsage,
  activeMbpr: ItemActiveMbpr | null,
  bprs: ItemBpr[],
}


const StateSetter = ({
  activity,
  aliases,
  inventory,
  item,
  notes,
  audits,
  purchaseOrders,
  examinations,
  pricingData,
  usage,
  activeMbpr,
  bprs
}: StateSetterProps) => {

  // state actions
  const {
    setActivity,
    setActiveMbpr,
    setAliases,
    setAudits,
    setBprs,
    setExaminations,
    setItem,
    setInventory,
    setNotes,
    setPricingData,
    setPurchaseOrders,
    setUsage,
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
    setExaminations(examinations);
    setInventory(inventory);
    setNotes(notes);
    setPricingData(pricingData);
    setPurchaseOrders(purchaseOrders);
    setUsage(usage);
    setBprs(bprs);
    setActiveMbpr(activeMbpr)


  }, [item]);

  useEffect(() => {
    getFilteredPurchaseOrders();
  }, [purchasingFilterMode, filterPurchaseOrdersYear])


  return false;
}

export default StateSetter
