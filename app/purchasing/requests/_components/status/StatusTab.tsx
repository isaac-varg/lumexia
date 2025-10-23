import { useMemo } from "react";
import { usePurchasingRequestActions, usePurchasingRequestSelection } from "@/store/purchasingRequestSlice"
import StatusButton from "./StatusButton";
import RequestCard from "../shared/RequestCard";
import { groupByProperty } from "@/utils/data/groupByProperty";
import { RequestForDashboard } from "../../_functions/getRequests";
import StatusGroup from "./StatusGroup";

const StatusTab = () => {
  const { requests, selectedStatus, options } = usePurchasingRequestSelection()
  const { setSelectedStatus } = usePurchasingRequestActions()
  const statuses = new Map(options.statuses.map(s => [s.id, s.name]));

  const presentStatusIds = useMemo(() => new Set(requests.map(r => r.statusId)), [requests]);

  const presentStatuses = useMemo(() =>
    options.statuses.filter(status => presentStatusIds.has(status.id)),
    [options.statuses, presentStatusIds]
  );

  const filteredRequests = useMemo(() => {
    if (!selectedStatus) {
      const grouped = groupByProperty(requests, 'statusId');
      return new Map(Object.entries(grouped));
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

      {selectedStatus && Array.isArray(filteredRequests) && (
        <div className="grid grid-cols-3 gap-6">
          {filteredRequests.map((r: RequestForDashboard) => <RequestCard key={r.id} request={r} />)}
        </div>
      )}

      {(!selectedStatus && (filteredRequests instanceof Map)) && (
        <div className="flex flex-col gap-4">
          {Array.from(filteredRequests.entries()).map(([r, selection]) => {
            console.log('fr', filteredRequests)
            console.log(selection);
            return (
              <StatusGroup key={r} requests={selection} statusName={statuses.get(r) || ''} />
            )
          })}
        </div>
      )}

    </div>
  )
}

export default StatusTab
