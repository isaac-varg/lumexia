import inventoryTypeActions from "@/actions/inventory/inventoryTypeActions";
import itemTypeActions from "@/actions/inventory/itemTypeActions";
import procurementTypeActions from "@/actions/inventory/procurementTypeActions";
import React from "react";
import CreateItemForm from "./CreateItemForm";
import { inventoryActions } from "@/actions/inventory";

const CreateItem = async () => {
  const itemTypesData = await itemTypeActions.getAll();
  const procurementTypesData = await procurementTypeActions.getAll();
  const inventoryTypesData = await inventoryTypeActions.getAll();
  const uomsData = await inventoryActions.uom.getAll()

  const [itemTypes, procurementTypes, inventoryTypes, uom] = await Promise.all([
    itemTypesData,
    procurementTypesData,
    inventoryTypesData,
    uomsData,
  ]);

  return (
    <>
      <CreateItemForm itemTypes={itemTypes} procurementTypes={procurementTypes} inventoryTypes={inventoryTypes} uoms={uom} />
    </>
  );
};

export default CreateItem;
