'use client'

import { SingleItem } from "@/actions/inventory/getOneItem";
import { useItemActions, useItemSelection } from "@/store/itemSlice";
import { useEffect } from "react";

type StateSetterProps = {
  item: SingleItem | null
}


const StateSetter = ({
  item,
}: StateSetterProps) => {

  // state actions
  const {
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

  }, [item]);


  return false;
}

export default StateSetter
