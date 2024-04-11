"use client";
import ActionButton from "@/components/ActionButton";
import Card from "@/components/Card";
import useDialog from "@/hooks/useDialog";
import { InventoryType } from "@prisma/client";
import React from "react";
import ProcurementTypesDialog from "./Dialog";
import Layout from "@/components/Layout";

interface InventoryTypesPanelProps {
  inventoryTypes: InventoryType[];
}

const InventoryTypesPanel: React.FC<InventoryTypesPanelProps> = ({
  inventoryTypes,
}) => {
  const { showDialog } = useDialog();

  const handleAddClick = () => {
    showDialog("inventoryTypes");
  };
  return (
    <>
      <ProcurementTypesDialog />
      <Card.Root>
        <Layout.Row>
          <Card.Title>Inventory Types</Card.Title>
          <ActionButton label="Add" onClick={handleAddClick} />
        </Layout.Row>
        <div className="flex flex-col gap-y-2 pt-6">

        {inventoryTypes.map((inventoryType) => (
          <button className="bg-limed-spruce-100 p-4 rounded-lg" key={inventoryType.id}>{inventoryType.name}</button>
        ))}
        </div>
      </Card.Root>
    </>
  );
};

export default InventoryTypesPanel;
