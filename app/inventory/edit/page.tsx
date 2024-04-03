import { getAllInventoryTypes } from "@/actions/inventory/inventoryTypes";
import ActionButton from "@/components/ActionButton";
import Card from "@/components/Card";
import PageTitle from "@/components/Text/PageTitle";
import React from "react";
import InventoryTypesPanel from "./(components)/InventoryTypesPanel";

const InventoryEditPage = async () => {
  const inventoryTypesData = await getAllInventoryTypes();

  const [inventoryTypes] = await Promise.all([inventoryTypesData]);
  return (
    <div>
      <PageTitle title="Edit Inventory" />

      <InventoryTypesPanel inventoryTypes={inventoryTypes} />
      
    </div>
  );
};

export default InventoryEditPage;
