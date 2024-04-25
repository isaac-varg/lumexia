import aliasActions from "@/actions/inventory/aliases";
import itemActions from "@/actions/inventory/items";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import LabelDataPair from "@/components/Text/LabelDataPair";
import PageTitle from "@/components/Text/PageTitle";
import { Alias } from "@/types/alias";
import AliasesPanel from "./_components/AliasesPanel";

type ItemDashboardProps = {
  params: {
    name: string;
  };
  searchParams: {
    id: string;
  };
};

const ItemDashboard = async ({ params, searchParams }: ItemDashboardProps) => {
  const item = await itemActions.getOne(searchParams.id, [
    "itemType",
    "procurementType",
    "inventoryType",
  ]);

  const aliases = await aliasActions.getAll({ itemId: item.id }, ["aliasType"]);

  return (
    <div className="flex flex-col gap-y-6">
      <PageTitle title={item.name} />

      <Layout.Grid>
        <Card.Root>
          <Card.Title>Basic Details</Card.Title>
          <LabelDataPair label="Name" data={item.name} />
          <LabelDataPair label="Reference Code" data={item.referenceCode} />
          <LabelDataPair label="Item Type" data={item.itemType.name} />
          <LabelDataPair
            label="Procurement Type"
            data={item.procurementType.name}
          />
          <LabelDataPair
            label="Inventory Type"
            data={item.inventoryType.name}
          />
        </Card.Root>

        <AliasesPanel aliases={aliases} item={item} />
      </Layout.Grid>
    </div>
  );
};

export default ItemDashboard;
