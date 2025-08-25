import SectionTitle from "@/components/Text/SectionTitle"
import { useItemSelection } from "@/store/itemSlice"
import { groupByProperty } from "@/utils/data/groupByProperty"

const PurchaseOrders = () => {

  const { purchaseOrders } = useItemSelection()
  return (

    <div>
      <SectionTitle>Purchase Orders</SectionTitle>
    </div>
  )
}

export default PurchaseOrders
