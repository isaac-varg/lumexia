import { PurchasingTab } from "./TabSelector";
import { useTabActions, useTabSelection } from "@/store/tabSlice";

const TabButton = ({ tab }: { tab: PurchasingTab }) => {

  const { activeTab } = useTabSelection()
  const { setActiveTab } = useTabActions()
  const currentTab = activeTab['purchasing'];
  const isSelected = currentTab === tab;



  return (
    <button
      className={`capitalize min-w-40 btn btn-secondary ${isSelected ? '' : 'btn-dash'}  `}
      onClick={() => setActiveTab('purchasing', tab)}
    >
      {tab}
    </button>
  )
}

export default TabButton
