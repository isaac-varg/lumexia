import { inventoryActions } from "@/actions/inventory";
import StateSetter from "./_components/state/StateSetter";
import TitleRow from "./_components/shared/TitleRow";
import TabSelector from "./_components/shared/TabSelector";
import TabsContainer from "./_components/shared/TabsContainer";
import { getItemActivity } from "./_actions/basics/getActivity";
import { getInventory } from "@/actions/inventory/getInventory";
import { getAudits } from "./_actions/inventory/getAudits";

const ItemDetails = async ({ searchParams }: { searchParams: { id: string } }) => {

  // all the data fetching
  const item = await inventoryActions.items.getOne(searchParams.id)
  const [aliases, notes, activity, inventory, audits] = await Promise.all([
    await inventoryActions.aliases.getByItem(item.id),
    await inventoryActions.items.notes.getAllByItem(item.id),
    await getItemActivity(item.id),
    await getInventory(item.id),
    await getAudits(item.id),
  ])


  return (
    <div className="flex flex-col gap-y-6">

      <StateSetter
        item={item}
        aliases={aliases}
        notes={notes}
        activity={activity}
        inventory={inventory}
        audits={audits}
      />

      <TitleRow />

      <TabSelector />

      <TabsContainer />

    </div>
  )
}

export default ItemDetails; 
