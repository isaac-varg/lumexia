import { Loader } from "@/components/Loading"
import { useProductionSelection } from "@/store/productionSlice"

const StagedViewMode = () => {
  const { stagings, isStagingsLoading } = useProductionSelection()
  return (
    <div>

      {isStagingsLoading && <Loader.Silly isLoading={isStagingsLoading} />}

      {!isStagingsLoading && stagings.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          No staging entries for this item.
        </div>
      )}

      {!isStagingsLoading && stagings.length > 0 && (
        <div className="mt-4 space-y-4">


          {stagings.map((staging) => (
            <div key={staging.id} className="p-4 border rounded-md">
              <p>Lot: {staging.lot.lotNumber}</p>
              <p>Quantity: {staging.quantity} {staging.uom.abbreviation}</p>
              <p>Pulled By: {staging.pulledByUser.name}</p>
              <p>Status: {staging.status.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>


  )
}

export default StagedViewMode
