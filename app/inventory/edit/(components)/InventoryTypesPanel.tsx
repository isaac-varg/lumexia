"use client";
import ActionButton from "@/components/ActionButton";
import Card from "@/components/Card";
import { InventoryType } from "@prisma/client";
import React from "react";

interface InventoryTypesPanelProps {
  inventoryTypes: InventoryType[];
}

const InventoryTypesPanel: React.FC<InventoryTypesPanelProps> = ({
  inventoryTypes,
}) => {
  return (
    <Card.Root>
      <Card.Row>
        <Card.Title>Edit Inventory</Card.Title>
        <ActionButton
          label="Delete"
          onClick={() => {
            throw new Error("Function not implemented.");
          }}
        />
      </Card.Row>
    </Card.Root>
  );
};

export default InventoryTypesPanel;
