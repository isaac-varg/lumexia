import { inventoryActions } from "@/actions/inventory";
import StateSetter from "./_components/state/StateSetter";
import TitleRow from "./_components/shared/TitleRow";
import TabSelector from "./_components/shared/TabSelector";
import itemTypeActions from "@/actions/inventory/itemTypeActions";
import procurementTypeActions from "@/actions/inventory/procurementTypeActions";
import inventoryTypeActions from "@/actions/inventory/inventoryTypeActions";
import TabsContainer from "./_components/shared/TabsContainer";

const ItemDetails = async ({ searchParams }: { searchParams: { id: string } }) => {

  // all the data fetching
  const item = await inventoryActions.items.getOne(searchParams.id)
  const itemTypes = await itemTypeActions.getAll();
  const procurementTypes = await procurementTypeActions.getAll();
  const inventoryTypes = await inventoryTypeActions.getAll();

  return (
    <div className="flex flex-col gap-y-6">

      <StateSetter
        itemTypes={itemTypes}
        procurementTypes={procurementTypes}
        inventoryTypes={inventoryTypes}
        item={item}
      />

      <TitleRow />

      <TabSelector />

      <TabsContainer />

    </div>
  )
}

export default ItemDetails; 
