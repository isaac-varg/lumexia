import { PlanningBpr } from "@/actions/production/getPlanningBprs"
import Card from "@/components/Card"

const BprCard = ({ bpr }: { bpr: PlanningBpr }) => {
  return (
    <div className="bg-base-300  hover:cursor-pointer hover:bg-accent/45 p-6 rounded-xl">
      <div className="flex flex-col gap-4">
        <div className="badge badge-xl badge-info font-medium">
          {bpr.referenceCode}
        </div>
        <Card.Title>{bpr.producedItemName}</Card.Title>
      </div>

    </div>
  )
}

export default BprCard
