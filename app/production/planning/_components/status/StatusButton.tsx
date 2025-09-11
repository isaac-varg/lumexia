import { BprStatus } from "@/actions/production/bprs/statuses/getAll"
import { useBprPlanningActions, useBprPlanningSelection } from "@/store/bprPlanningSlice"

const StatusButton = ({ status }: { status: BprStatus }) => {

  const { currentStatusId, statusCounts } = useBprPlanningSelection()
  const { setCurrentStatusId } = useBprPlanningActions()
  const isActive = currentStatusId === status.id
  const count = statusCounts.get(status.id) || 0;


  return (
    <button
      className={`btn-lg btn ${isActive ? 'btn-secondary' : 'btn-soft'} flex w-full items-center justify-between`}
      onClick={() => setCurrentStatusId(status.id)}
    >
      <span>{status.name}</span>
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-info text-xs font-semibold text-info-content">
        {count}
      </div>
    </button>
  )
}

export default StatusButton
