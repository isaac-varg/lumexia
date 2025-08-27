import { staticRecords } from "@/configs/staticRecords"
import { useItemSelection } from "@/store/itemSlice"
import Produced from "./produced/Produced";
import Purchased from "./purchased/Purchased";

const { produced } = staticRecords.inventory.procurementTypes;

const Production = () => {
  const { item } = useItemSelection()
  const isProduced = item?.procurementTypeId === produced;
  return (
    <div>

      {isProduced && <Produced />}
      {!isProduced && <Purchased />}

    </div>
  )
}

export default Production
