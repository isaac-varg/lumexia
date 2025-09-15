import Card from "@/components/Card"
import MaterialSufficiencyTable from "./MaterialSufficiencyTable"

const BomTab = () => {
  return (
    <Card.Root>

      <Card.Title>Bill of Materials</Card.Title>


      <MaterialSufficiencyTable />
    </Card.Root>
  )
}

export default BomTab
