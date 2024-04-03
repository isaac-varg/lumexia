"use client";
import ActionButton from "@/components/ActionButton";
import Card from "@/components/Card";
import useDialog from "@/hooks/useDialog";
import { InventoryType } from "@prisma/client";
import React from "react";
import InventoryTypesDialog from "./InventoryTypesDialog";
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
      <InventoryTypesDialog />
      <Card.Root>
        <Layout.Row>
          <Card.Title>Edit Inventory</Card.Title>
          <ActionButton label="Add" onClick={handleAddClick} />
        </Layout.Row>
      </Card.Root>
    </>
  );
};

export default InventoryTypesPanel;
