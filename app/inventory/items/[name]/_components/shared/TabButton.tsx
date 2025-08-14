import { useItemActions, useItemSelection } from "@/store/itemSlice"
import { ItemTab } from "./TabSelector"

const TabButton = ({ tab }: { tab: ItemTab }) => {

  const { setCurrentTab } = useItemActions()
  const { currentTab } = useItemSelection()
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
