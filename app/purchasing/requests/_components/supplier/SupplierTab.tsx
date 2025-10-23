import { usePurchasingRequestActions, usePurchasingRequestSelection } from "@/store/purchasingRequestSlice"
import SupplierButton from "./SupplierButton"
import { useMemo } from "react"
import RequestCard from "../shared/RequestCard"
import SupplierGroup from "./SupplierGroup"

const SupplierTab = () => {

  const { requests, suppliersGrouped, selectedSupplierId, options } = usePurchasingRequestSelection()
  const { setSelectedSupplierId } = usePurchasingRequestActions();


  const filteredRequests = useMemo(() => {
    if (!selectedSupplierId) {
      return requests
    }

    return suppliersGrouped.get(selectedSupplierId);
  },
    [suppliersGrouped, selectedSupplierId]
  );

  const sortedSupplierIds = useMemo(() => {
    return Array.from(suppliersGrouped.keys()).sort((a, b) => {
      if (a === 'untagged') return -1;
      if (b === 'untagged') return 1;

      const groupA = suppliersGrouped.get(a);
      const supplierA = groupA?.[0]?.suppliers.find(s => s.id === a);
      const nameA = supplierA?.name || '';

      const groupB = suppliersGrouped.get(b);
      const supplierB = groupB?.[0]?.suppliers.find(s => s.id === b);
      const nameB = supplierB?.name || '';

      return nameA.localeCompare(nameB);
    });
  }, [suppliersGrouped]);

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
        {sortedSupplierIds.map((supplierId) => <SupplierButton key={supplierId} supplierId={supplierId} />)}

      </div>

      {selectedSupplierId && filteredRequests && filteredRequests.length !== 0 && (
        <div className="grid grid-cols-3 gap-6">
          {filteredRequests.map(r => <RequestCard key={r.id} request={r} />)}
        </div>
      )}

      {!selectedSupplierId && (
        <div className="flex flex-col gap-4">
          {sortedSupplierIds.map(supplierId => {
            const selection = suppliersGrouped.get(supplierId) || [];
            const supplierName = supplierId === 'untagged' ? 'Untagged' : options.suppliers.get(supplierId) || '';

            return (
              <SupplierGroup key={supplierId} requests={selection} supplierName={supplierName} />
            )
          })}
        </div>
      )}


    </div>
  )
}

export default SupplierTab
