import { useItemActions, useItemSelection } from "@/store/itemSlice"
import { PlanningTab } from "./TabSelector";
import { useBprPlanningActions, useBprPlanningSelection } from "@/store/bprPlanningSlice";

const TabButton = ({ tab }: { tab: PlanningTab }) => {

  const { currentTab } = useBprPlanningSelection()
  const { setCurrentTab } = useBprPlanningActions()
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
