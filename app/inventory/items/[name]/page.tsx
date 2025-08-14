import { inventoryActions } from "@/actions/inventory";
import StateSetter from "./_components/state/StateSetter";
import TitleRow from "./_components/shared/TitleRow";
import TabSelector from "./_components/shared/TabSelector";
import TabsContainer from "./_components/shared/TabsContainer";

const ItemDetails = async ({ searchParams }: { searchParams: { id: string } }) => {

  // all the data fetching
  const item = await inventoryActions.items.getOne(searchParams.id)



  return (
    <div className="flex flex-col gap-y-6">

      <StateSetter
        item={item}
      />

      <TitleRow />

      <TabSelector />

      <TabsContainer />

    </div>
  )
}

export default ItemDetails; 
