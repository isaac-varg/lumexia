import { useProductionSelection } from "@/store/productionSlice"
import MaterialList from "./MaterialList"
import StagingDetails from "./StagingDetails"
import StagingHeader from "./StagingHeader"

const Staging = () => {
  const { selectedBomItem } = useProductionSelection()

  return (

    <div className="flex flex-col gap-6">

      <StagingHeader />
      {!selectedBomItem && <MaterialList />}
      <StagingDetails />


    </div>

  )
}

export default Staging
