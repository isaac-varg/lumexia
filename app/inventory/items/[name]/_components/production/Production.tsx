import { staticRecords } from "@/configs/staticRecords"
import { useItemSelection } from "@/store/itemSlice"

const { produced } = staticRecords.inventory.procurementTypes;

const Production = () => {
  const { item } = useItemSelection()
  const isProduced = item?.procurementTypeId === produced;
  return (
    <div>

      { }

    </div>
  )
}

export default Production
