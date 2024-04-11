"use client";
import ActionButton from "@/components/ActionButton";
import Card from "@/components/Card";
import useDialog from "@/hooks/useDialog";
import { ProcurementType } from "@prisma/client";
import React from "react";
import Layout from "@/components/Layout";
import ItemTypesDialog from "./Dialog";
import { ItemType } from "@/types/itemType";

interface ItemTypesPanelProps {
  itemTypes: ItemType[];
}

const ItemTypesPanel: React.FC<ItemTypesPanelProps> = ({
  itemTypes,
}) => {
  const { showDialog } = useDialog();

  const handleAddClick = () => {
    showDialog("itemTypes");
  };
  return (
    <>
      <ItemTypesDialog />
      <Card.Root>
        <Layout.Row>
          <Card.Title>Item Types</Card.Title>
          <ActionButton label="Add" onClick={handleAddClick} />
        </Layout.Row>
        <div className="flex flex-col gap-y-2 pt-6">

        {itemTypes.map((type) => (
          <button className="bg-limed-spruce-100 p-4 rounded-lg" key={type.id}>{type.name}</button>
        ))}
        </div>
      </Card.Root>
    </>
  );
};

export default ItemTypesPanel;
