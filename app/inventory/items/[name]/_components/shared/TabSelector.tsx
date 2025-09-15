'use client'
import { staticRecords } from "@/configs/staticRecords"
import TabButton from "./TabButton";
import { useItemSelection } from "@/store/itemSlice";

// get static
const { produced } = staticRecords.inventory.procurementTypes;

// define the tabs
export type ItemTab = 'basics' | 'inventory' | 'purchasing' | 'pricing' | 'production' | 'quality' | 'files';

const TabSelector = () => {

  const { item } = useItemSelection()
  const isProduced = item?.procurementTypeId === produced;


  const tabs: ItemTab[] = ['basics', 'inventory', 'pricing', 'production', 'files',];

  // produced items do not need purchased tab
  if (!isProduced) {
    tabs.splice(2, 0, 'purchasing')
  }

  if (!item) {
    return <Skeleton />
  }

  return (
    <div className="flex items-center justify-start gap-x-6">

      {tabs.map(tab => <TabButton key={tab} tab={tab} />)}
    </div>
  )
}

const Skeleton = () => {
  return (
    <div className="flex items-center justify-start gap-x-6">
      <button className="skeleton btn w-40"></button>
      <button className="skeleton btn w-40"></button>
      <button className="skeleton btn w-40"></button>
      <button className="skeleton btn w-40"></button>
    </div>
  )
}

export default TabSelector
