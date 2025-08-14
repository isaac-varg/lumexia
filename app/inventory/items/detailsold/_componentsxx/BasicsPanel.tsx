import Card from "@/components/Card";
import LabelDataPair from "@/components/Text/LabelDataPair";
import { Item } from "@/types/item";
import React from "react";
import BasicsCardTitle from "./basics/CardTitle";
import { ItemEditSelectables } from "../page";

const BasicsPanel = ({ item , itemEditSelectables }: { item: Item, itemEditSelectables: ItemEditSelectables }) => {
  if (!item || !item.itemType || !item.procurementType || !item.inventoryType)
    return null;
  return (
    <Card.Root>
      <BasicsCardTitle item={item} itemEditSelectables={itemEditSelectables} />
      <LabelDataPair label="Name" data={item.name} />
      <LabelDataPair label="Reference Code" data={item.referenceCode} />
      <LabelDataPair label="Item Type" data={item.itemType.name} />
      <LabelDataPair
        label="Procurement Type"
        data={item.procurementType.name}
      />
      <LabelDataPair label="Inventory Type" data={item.inventoryType.name} />
    </Card.Root>
  );
};

export default BasicsPanel;
