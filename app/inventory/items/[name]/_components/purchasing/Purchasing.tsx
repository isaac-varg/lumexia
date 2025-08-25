import PurchaseOrders from "./PurchaseOrders"
import Trends from "./Trends"

const Purchasing = () => {

  // trends
  // add to existing drafts?
  // purchase order logs

  return (
    <div className="flex flex-col gap-6">
      <Trends />

      <PurchaseOrders />
    </div>
  )
}

export default Purchasing
