import { useMemo } from "react";
import { usePurchasingRequestActions, usePurchasingRequestSelection } from "@/store/purchasingRequestSlice"
import StatusButton from "./StatusButton";
import RequestCard from "../shared/RequestCard";

const StatusTab = () => {
  const { requests, selectedStatus, options } = usePurchasingRequestSelection()
  const { setSelectedStatus } = usePurchasingRequestActions()

  const presentStatusIds = useMemo(() => new Set(requests.map(r => r.statusId)), [requests]);

  const presentStatuses = useMemo(() =>
    options.statuses.filter(status => presentStatusIds.has(status.id)),
    [options.statuses, presentStatusIds]
  );

  const filteredRequests = useMemo(() => {
    if (!selectedStatus) {
      return requests
    }
    return requests.filter(b => b.statusId === selectedStatus?.id)
  },
    [requests, selectedStatus]
  );

  return (
    <div className="flex flex-col gap-y-6">

      <div className="grid grid-cols-3 gap-4">
        <button
          className={`btn-lg btn ${!selectedStatus ? 'btn-secondary' : 'btn-soft'} flex w-full  justify-between`}
          onClick={() => setSelectedStatus(null)}
        >
          <span>All</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-info text-xs font-semibold text-info-content">
            {requests.length}
          </div>
        </button>

        {presentStatuses.map(status => <StatusButton key={status.id} status={status} />)}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filteredRequests.map(r => <RequestCard key={r.id} request={r} />)}
      </div>

    </div>
  )
}

export default StatusTab
