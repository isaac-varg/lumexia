import { useProductionSelection } from "@/store/productionSlice"
import StagedViewMode from "./StagedViewMode"
import StagedAddMode from "./StagedAddMode"

const StagedEntries = () => {

  const { stagingsMode } = useProductionSelection()

  return (
    <div>
      {stagingsMode === 'view' && <StagedViewMode />}
      {stagingsMode === 'add' && <StagedAddMode />}

    </div>

  )
}

export default StagedEntries
