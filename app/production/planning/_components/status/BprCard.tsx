import { PlanningBpr } from "@/actions/production/getPlanningBprs"
import Card from "@/components/Card"
import { useRouter } from "next/navigation"

const BprCard = ({ bpr }: { bpr: PlanningBpr }) => {
  const router = useRouter()
  return (
    <div className="bg-base-300  hover:cursor-pointer hover:bg-accent/45 p-6 rounded-xl"

      onClick={() => router.push(`/production/planning/${bpr.referenceCode}?id=${bpr.id}`)}
    >
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
