'use client'

import { ItemAlias } from "@/actions/inventory/aliases/getByItem";
import { SingleItem } from "@/actions/inventory/getOneItem";
import { ItemNote } from "@/actions/inventory/items/notes/getAllByItem";
import { useItemActions, useItemSelection } from "@/store/itemSlice";
import { useEffect } from "react";
import { ItemActivity } from "../../_actions/basics/getActivity";
import { Inventory } from "@/actions/inventory/getInventory";

type StateSetterProps = {
  activity: ItemActivity[],
  aliases: ItemAlias[]
  item: SingleItem | null
  inventory: Inventory | null,
  notes: ItemNote[],
}


const StateSetter = ({
  activity,
  aliases,
  inventory,
  item,
  notes,


}: StateSetterProps) => {

  // state actions
  const {
    setActivity,
    setAliases,
    setItem,
    setInventory,
    setNotes,
    getOptions,
  } = useItemActions();

  // current state
  const {
    options,
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
    setInventory(inventory);
    setNotes(notes);


  }, [item]);


  return false;
}

export default StateSetter
