import Card from "@/components/Card";
import LabelDataPair from "@/components/Text/LabelDataPair";
import item from "@/prisma/seed/data/item";
import { Item } from "@/types/item";
import React from "react";

const BasicsPanel = ({ item }: { item: Item }) => {
  if (!item || !item.itemType || !item.procurementType || !item.inventoryType)
    return null;
  return (
    <Card.Root>
      <Card.Title>Basic Details</Card.Title>
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
