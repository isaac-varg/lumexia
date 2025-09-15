import { useItemActions, useItemSelection } from "@/store/itemSlice"
import { BprTab } from "./TabSelector";
import { useBprDetailsActions, useBprDetailsSelection } from "@/store/bprDetailsSlice";

const TabButton = ({ tab }: { tab: BprTab }) => {

  const { setCurrentTab } = useBprDetailsActions()
  const { currentTab } = useBprDetailsSelection()
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
