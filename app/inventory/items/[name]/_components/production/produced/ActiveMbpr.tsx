import Card from "@/components/Card"
import { staticRecords } from "@/configs/staticRecords"
import { useItemSelection } from "@/store/itemSlice"
import { useEffect, useState } from "react"
import { ItemActiveMbprBatchSize } from "../../../_actions/production/getActiveMbpr"
import { recordStatuses } from "@/configs/staticRecords/recordStatuses"


const ActiveMbpr = () => {

  const { activeMbpr } = useItemSelection()
  const [activeSize, setActiveSize] = useState<ItemActiveMbprBatchSize>();

  useEffect(() => {
    if (!activeMbpr) return;
    const size = activeMbpr.BatchSize.filter(bz => bz.recordStatusId === recordStatuses.active)[0]

    setActiveSize(size)
  }, [activeMbpr])

  if (!activeMbpr || !activeSize) return false;


  return (
    <Card.Root span={2}>

      <Card.Title>Info</Card.Title>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <tbody>
            <tr>
              <th>Batch Size</th>
              <td>{activeSize.quantity} lbs</td>
            </tr>

            <tr>
              <th>Version Label</th>
              <td>{activeMbpr.versionLabel}</td>
            </tr>

            <tr>
              <th>Production Vessel</th>
              <td>{activeSize.batchSizeCompoundingVessels[0].compoundingVessel.equipment.name}</td>
            </tr>



          </tbody>
        </table>
      </div>

    </Card.Root>
  )
}

export default ActiveMbpr
