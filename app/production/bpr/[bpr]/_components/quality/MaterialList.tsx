import SectionTitle from "@/components/Text/SectionTitle"
import { useProductionSelection } from "@/store/productionSlice"
import MaterialButton from "../shared/MaterialButton"
import Card from "@/components/Card"
import { staticRecords } from "@/configs/staticRecords"

const MaterialList = () => {

  const { bom } = useProductionSelection()
  const sorted = bom.sort((a, b) => parseInt(a.bom.identifier) - parseInt(b.bom.identifier));
  const staged = bom.filter(item => item.statusId === staticRecords.production.bprStagingStatuses.staged)
  const verified = sorted.filter(item => item.statusId === staticRecords.production.bprStagingStatuses.verified);

  return (
    <div className="flex flex-col gap-6 col-span-2">

      <SectionTitle>Bill of Materials</SectionTitle>

      <Card.Root>


        <div className="flex flex-col gap-6">
          <SectionTitle size="small">To Verify</SectionTitle>

          {staged.length === 0 && <p className={"text-base-content text-lg text-medium"}>None</p>}

          <div className="grid grid-cols-1 gap-4">
            {staged.map(item => <MaterialButton key={item.id} material={item} />)}

          </div>

          <SectionTitle size="small">Verified</SectionTitle>
          <div className="grid grid-cols-1 gap-4">
            {verified.map(item => <MaterialButton key={item.id} material={item} />)}
          </div>

        </div>

      </Card.Root>

    </div>
  )
}

export default MaterialList
