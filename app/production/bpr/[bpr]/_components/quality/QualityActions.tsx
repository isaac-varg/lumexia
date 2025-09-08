import Card from "@/components/Card"
import { TbChecks } from "react-icons/tb"

const QualityActions = () => {
  return (
    <Card.Root>

      <Card.Title>Actions</Card.Title>

      <div className="grid grid-cols-1 gap-2">

        <button className="btn btn-success btn-soft">
          <TbChecks className="size-6" />
          Approve All
        </button>


      </div>
    </Card.Root>

  )
}

export default QualityActions
