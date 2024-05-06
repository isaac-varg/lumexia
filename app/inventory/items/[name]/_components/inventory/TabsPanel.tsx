import React from "react";
import Tabs from "./Tabs";
import { Item } from "@/types/item";
import containerActions from "@/actions/inventory/containerActions";
import { flattenLots } from "../../_functions/flattenLots";
import lotActions from "@/actions/inventory/lotActions";
import prisma from "@/lib/prisma";
import containerTypeActions from "@/actions/inventory/containerTypeActions";

const TabsPanel = async ({ item }: { item: Item }) => {

  const lots = await lotActions.getByItem(item.id);
  // console.dir(lots, {depth: 99})
  const containerTypes = await containerTypeActions.getAll();
  const flattenedLots =  flattenLots(lots as any);


  return (
    <div>
      <Tabs item={item} lots={flattenedLots} containerTypes={containerTypes} />
    </div>
  );
};

export default TabsPanel;
