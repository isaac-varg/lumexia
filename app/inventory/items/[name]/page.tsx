import aliasActions from "@/actions/inventory/aliases";
import itemActions from "@/actions/inventory/items";
import Layout from "@/components/Layout";
import PageTitle from "@/components/Text/PageTitle";
import AliasesPanel from "./_components/alias/AliasesPanel";
import BasicsPanel from "./_components/BasicsPanel";
import Tabs from "./_components/inventory/Tabs";
import TabsPanel from "./_components/inventory/TabsPanel";

type ItemDashboardProps = {
  params: {
    name: string;
  };
  searchParams: {
    id: string;
  };
};

const ItemDashboard = async ({ params, searchParams }: ItemDashboardProps) => {
  const item = await itemActions.getOne(searchParams.id, undefined, [
    "itemType",
    "procurementType",
    "inventoryType",
  ]);

  const aliases = await aliasActions.getAll({ itemId: item.id }, ["aliasType"]);

  return (
    <div className="flex flex-col gap-y-6">
      <PageTitle title={item.name} />

      <Layout.Grid>
        <BasicsPanel item={item} />

        <AliasesPanel aliases={aliases} item={item} />
      </Layout.Grid>

      <TabsPanel item={item} />

      
    </div>
  );
};

export default ItemDashboard;
