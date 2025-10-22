import { usePurchasingRequestActions, usePurchasingRequestSelection } from "@/store/purchasingRequestSlice"
import SupplierButton from "./SupplierButton"
import { useMemo } from "react"
import RequestCard from "../shared/RequestCard"

const SupplierTab = () => {

  const { requests, suppliersGrouped, selectedSupplierId } = usePurchasingRequestSelection()
  const { setSelectedSupplierId } = usePurchasingRequestActions()

  const filteredRequests = useMemo(() => {
    if (!selectedSupplierId) {
      return requests
    }

    return suppliersGrouped.get(selectedSupplierId);
  },
    [suppliersGrouped, selectedSupplierId]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-4">
        <button
          className={`btn-lg btn ${!selectedSupplierId ? 'btn-secondary' : 'btn-soft'} flex w-full  justify-between`}
          onClick={() => setSelectedSupplierId(null)}
        >
          <span>All</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-info text-xs font-semibold text-info-content">
            {requests.length}
          </div>
        </button>

        {Array.from(suppliersGrouped.entries()).map(([group, supplier]) => <SupplierButton key={group} supplierId={group} />)}

      </div>

      {filteredRequests && filteredRequests.length !== 0 && (
        <div className="grid grid-cols-3 gap-6">
          {filteredRequests.map(r => <RequestCard key={r.id} request={r} />)}
        </div>
      )}


    </div>
  )
}

export default SupplierTab
