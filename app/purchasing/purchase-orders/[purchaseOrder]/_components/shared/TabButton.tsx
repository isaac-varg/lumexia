import { useItemActions, useItemSelection } from "@/store/itemSlice"
import { PurchasingTab } from "./TabSelector";
import { usePurchasingActions, usePurchasingSelection } from "@/store/purchasingSlice";

const TabButton = ({ tab }: { tab: PurchasingTab }) => {

  const { setCurrentTab } = usePurchasingActions()
  const { currentTab } = usePurchasingSelection()
  const isSelected = currentTab === tab;


  return (
    <button
      className={`capitalize min-w-40 btn btn-secondary ${isSelected ? '' : 'btn-dash'}  `}
      onClick={() => setCurrentTab(tab)}
    >
      {tab}
    </button>
  )
}

export default TabButton
