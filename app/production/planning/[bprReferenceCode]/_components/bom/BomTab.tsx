import Card from "@/components/Card"
import MaterialSufficiencyTable from "./MaterialSufficiencyTable"
import BasicsTab from "../basics/BasicsTab"

const BomTab = () => {
  return (
    <div className="flex flex-col gap-6">

      <BasicsTab />

      <Card.Root>

        <Card.Title>Bill of Materials</Card.Title>


        <MaterialSufficiencyTable />
      </Card.Root>

    </div>
  )
}

export default BomTab
