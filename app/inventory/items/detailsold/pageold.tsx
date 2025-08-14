import itemActions from "@/actions/inventory/items";
import Layout from "@/components/Layout";
import PageTitle from "@/components/Text/PageTitle";
import AliasesPanel from "./_componentsxx/alias/AliasesPanel";
import BasicsPanel from "./_componentsxx/BasicsPanel";
import TabsPanel from "./_componentsxx/TabsPanel";
import itemTypeActions from "@/actions/inventory/itemTypeActions";
import procurementTypeActions from "@/actions/inventory/procurementTypeActions";
import inventoryTypeActions from "@/actions/inventory/inventoryTypeActions";
import { ItemType } from "@/types/itemType";
import { ProcurementType } from "@/types/procurementType";
import { InventoryType } from "@/types/inventoryType";
import { getAliases } from "./_functions/getAliases";
import TopActions from "./_componentsxx/TopActions";
import StateSetter from "./_componentsxx/StateSetter";

type ItemDashboardProps = {
  searchParams: {
    id: string;
  };
};

export type ItemEditSelectables = {
  itemTypes: ItemType[]
  procurementTypes: ProcurementType[]
  inventoryTypes: InventoryType[]
}

const ItemDashboard = async ({ searchParams }: ItemDashboardProps) => {
  const item = await itemActions.getOne(searchParams.id, undefined, [
    "itemType",
    "procurementType",
    "inventoryType",
  ]);

  const itemTypes = await itemTypeActions.getAll()
  const procurementTypes = await procurementTypeActions.getAll();
  const inventoryTypes = await inventoryTypeActions.getAll();

  const itemEditSelectables: ItemEditSelectables = {
    itemTypes,
    procurementTypes,
    inventoryTypes,
  }


  const aliases = await getAliases(item.id)

  return (
    <div className="flex flex-col gap-y-6">
      <StateSetter itemId={searchParams.id} />

      <div className="flex justify-between items-center">
        <PageTitle title={item.name} />

        <TopActions itemId={item.id} />
      </div>

      <Layout.Grid gap={6}>
        <BasicsPanel item={item} itemEditSelectables={itemEditSelectables} />

        <AliasesPanel aliases={aliases} item={item} />
      </Layout.Grid>

      <TabsPanel item={item} />


    </div>
  );
};

export default ItemDashboard;
