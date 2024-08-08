import aliasActions from "@/actions/inventory/aliases";
import itemActions from "@/actions/inventory/items";
import Layout from "@/components/Layout";
import PageTitle from "@/components/Text/PageTitle";
import AliasesPanel from "./_components/alias/AliasesPanel";
import BasicsPanel from "./_components/BasicsPanel";
import TabsPanel from "./_components/TabsPanel";
import itemTypeActions from "@/actions/inventory/itemTypeActions";
import procurementTypeActions from "@/actions/inventory/procurementTypeActions";
import inventoryTypeActions from "@/actions/inventory/inventoryTypeActions";
import { ItemType } from "@/types/itemType";
import { ProcurementType } from "@/types/procurementType";
import { InventoryType } from "@/types/inventoryType";

type ItemDashboardProps = {
  params: {
    name: string;
  };
  searchParams: {
    id: string;
  };
};

export type ItemEditSelectables = {
  itemTypes: ItemType[]
  procurementTypes: ProcurementType[]
  inventoryTypes: InventoryType[]
}

const ItemDashboard = async ({ params, searchParams }: ItemDashboardProps) => {
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
  

  const aliases = await aliasActions.getAll({ itemId: item.id }, ["aliasType"]);

  return (
    <div className="flex flex-col gap-y-6">
      <PageTitle title={item.name} />

      <Layout.Grid>
        <BasicsPanel item={item} itemEditSelectables={itemEditSelectables} />

        <AliasesPanel aliases={aliases} item={item} />
      </Layout.Grid>

      <TabsPanel item={item} />

      
    </div>
  );
};

export default ItemDashboard;
