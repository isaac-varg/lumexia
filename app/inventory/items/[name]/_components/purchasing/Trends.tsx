import SectionTitle from "@/components/Text/SectionTitle"
import FilterModeButtons from "./FilterModeButtons"
import { useItemSelection } from "@/store/itemSlice"

const Trends = () => {

  const { filteredPurchaseOrders } = useItemSelection()
  console.log(filteredPurchaseOrders)

  return (

    <div className="flex flex-col gap-4">

      <div className="flex justify-between items-center">
        <SectionTitle>Trends</SectionTitle>

        <FilterModeButtons />
      </div>

      <div className="grid grid-cols-4 gap-6">




      </div>


    </div>
  )
}

export default Trends
