import Card from "@/components/Card"
import { useItemSelection } from "@/store/itemSlice"

const FrequencyChart = () => {


  const { filteredPurchaseOrders } = useItemSelection()


  return (
    <Card.Root span={3}>
      <Card.Title>Frequency Trend</Card.Title>




    </Card.Root>
  )
}

export default FrequencyChart
