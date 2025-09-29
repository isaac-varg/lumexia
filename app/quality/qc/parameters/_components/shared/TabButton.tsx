import { useQcParameterActions, useQcParameterSelection } from "@/store/qcParametersSlice";
import { QcParameterTab } from "./TabSelector";

const TabButton = ({ tab }: { tab: QcParameterTab }) => {

  const { setCurrentTab } = useQcParameterActions()
  const { currentTab } = useQcParameterSelection()
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
