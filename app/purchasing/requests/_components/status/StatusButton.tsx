import { usePurchasingRequestActions, usePurchasingRequestSelection } from "@/store/purchasingRequestSlice";
import { RequestStatus } from "../../[referenceCode]/_functions/getRequestStatuses";

const StatusButton = ({ status }: { status: RequestStatus }) => {

  const { selectedStatus, statusCounts } = usePurchasingRequestSelection()
  const { setSelectedStatus } = usePurchasingRequestActions();
  const isActive = selectedStatus?.id === status.id
  const count = statusCounts.get(status.id) || 0;


  return (
    <button
      className={`btn-lg btn ${isActive ? 'btn-secondary' : 'btn-soft'} flex w-full  justify-between`}
      onClick={() => setSelectedStatus(status)}
    >
      <span>{status.name}</span>
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-info text-xs font-semibold text-info-content">
        {count}
      </div>
    </button>
  )
}

export default StatusButton
