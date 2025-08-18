'use client'

import { ItemAlias } from "@/actions/inventory/aliases/getByItem";
import { SingleItem } from "@/actions/inventory/getOneItem";
import { useItemActions, useItemSelection } from "@/store/itemSlice";
import { useEffect } from "react";

type StateSetterProps = {
  aliases: ItemAlias[]
  item: SingleItem | null
}


const StateSetter = ({
  aliases,
  item,

}: StateSetterProps) => {

  // state actions
  const {
    setAliases,
    setItem,
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
    setAliases(aliases);

  }, [item]);


  return false;
}

export default StateSetter
