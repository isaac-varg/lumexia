import { useItemSelection } from "@/store/itemSlice"
import Produced from "./produced/Produced";
import Purchased from "./purchased/Purchased";
import { procurementTypes } from "@/configs/staticRecords/procurementTypes";

const { produced } = procurementTypes;

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
