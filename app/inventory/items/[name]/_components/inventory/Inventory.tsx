import InventoryAmounts from "./InventoryAmounts"
import Lots from "./Lots"

const Inventory = () => {

  // todo
  // add lots table
  // hide zerod out lots by default
  // inventory audits history
  // overhaul on lot click
  //  - show history of audits for that lot
  //  - show history of usage in bprs
  //  - show transaction historyu ?
  //
  //

  return (
    <div className="grid grid-cols-3 gap-6">

      <InventoryAmounts />

      <Lots />


    </div>
  )
}

export default Inventory
