'use client'
import { usePurchasingActions, usePurchasingSelection } from "@/store/purchasingSlice";
import TabButton from "./TabButton";


// define the tabs
export type PurchasingTab = 'items' | 'accounting' | 'notes' | 'activity';

const TabSelector = () => {

  const { purchaseOrder } = usePurchasingSelection()


  const tabs: PurchasingTab[] = ['items', 'accounting', 'notes', 'activity'];

  if (!purchaseOrder) {
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
    </div>
  )
}

export default TabSelector
