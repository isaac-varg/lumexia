import { usePurchasingRequestActions, usePurchasingRequestSelection } from "@/store/purchasingRequestSlice";

const SupplierButton = ({ supplierId }: { supplierId: string }) => {

  const { selectedSupplierId, supplierCounts, options } = usePurchasingRequestSelection()
  const { setSelectedSupplierId } = usePurchasingRequestActions();
  const supplierName = options.suppliers.has(supplierId) ? options.suppliers.get(supplierId) : 'Untagged'
  const isActive = selectedSupplierId === supplierId
  const count = supplierCounts.get(supplierId) || 0;


  return (
    <button
      className={`btn-lg btn ${isActive ? 'btn-secondary' : 'btn-soft'} flex w-full  justify-between`}
      onClick={() => setSelectedSupplierId(supplierId)}
    >
      <span>{supplierName}</span>
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-info text-xs font-semibold text-info-content">
        {count}
      </div>
    </button>
  )
}

export default SupplierButton 
