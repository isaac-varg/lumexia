import inventoryTypeActions from "@/actions/inventory/inventoryTypeActions";
import itemTypeActions from "@/actions/inventory/itemTypeActions";
import procurementTypeActions from "@/actions/inventory/procurementTypeActions";
import React from "react";
import CreateItemForm from "./CreateItemForm";

const CreateItem = async () => {
  const itemTypesData = await itemTypeActions.getAll();
  const procurementTypesData = await procurementTypeActions.getAll();
  const inventoryTypesData = await inventoryTypeActions.getAll();

  const [itemTypes, procurementTypes, inventoryTypes] = await Promise.all([
    itemTypesData,
    procurementTypesData,
    inventoryTypesData,
  ]);

  return (
    <>
      <CreateItemForm itemTypes={itemTypes} procurementTypes={procurementTypes} inventoryTypes={inventoryTypes}/>
    </>
  );
};

export default CreateItem;
