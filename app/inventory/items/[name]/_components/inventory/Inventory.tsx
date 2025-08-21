import Audits from "./Audits"
import InventoryAmounts from "./InventoryAmounts"
import Lots from "./Lots"

const Inventory = () => {

  return (
    <div className="grid grid-cols-3 gap-6">

      <InventoryAmounts />

      <Lots />

      <Audits />




    </div>
  )
}

export default Inventory
