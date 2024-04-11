import PageTitle from "@/components/Text/PageTitle";
import InventoryTypesPanel from "./_components/inventoryTypes/Panel";
import inventoryTypeActions from "@/actions/inventory/inventoryTypeActions";
import ProcurementTypesPanel from "./_components/procurementTypes/Panel";
import procurementTypeActions from "@/actions/inventory/procurementTypeActions";
import itemTypeActions from "@/actions/inventory/itemTypeActions";
import ItemTypesPanel from "./_components/itemTypes/Panel";
import aliasTypeActions from "@/actions/inventory/aliasTypes";
import AliasTypesPanel from "./_components/aliasTypes/Panel";

const InventoryEditPage = async () => {
  const inventoryTypesData = await inventoryTypeActions.getAll();
  const procurementTypesData = await procurementTypeActions.getAll();
  const itemTypesData = await itemTypeActions.getAll();
  const aliasTypesData = await aliasTypeActions.getAll();

  const [inventoryTypes, procurementTypes, itemTypes, aliasTypes] = await Promise.all([inventoryTypesData, procurementTypesData, itemTypesData, aliasTypesData]);

  return (
    <div className="flex flex-col gap-y-6">
      <PageTitle title="Edit Inventory" />

      <InventoryTypesPanel inventoryTypes={inventoryTypes} />

      <ProcurementTypesPanel procurementTypes={procurementTypes} />

      <ItemTypesPanel itemTypes={itemTypes} />

      <AliasTypesPanel aliasTypes={aliasTypes} />


    </div>
  );
};

export default InventoryEditPage;
