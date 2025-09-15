import Dropdown from "@/components/Dropdown"
import { useItemActions, useItemSelection } from "@/store/itemSlice"
import { useMemo } from "react"
import { getPurchaseOrdersYears } from "../../_actions/purchasing/getPurchaseOrdersYears"

const FilterModeButtons = () => {

  const { setPurchasingFilterMode } = useItemActions()
  const { purchaseOrders, item, purchasingFilterMode, filterPurchaseOrdersYear } = useItemSelection()
  const purchaseOrderYears = useMemo(() => getPurchaseOrdersYears(purchaseOrders), [purchaseOrders])

  return (
    <div className="flex gap-4">
      <Dropdown.General
        onClick={(value) => {
          setPurchasingFilterMode('yearSelection', value)
        }}
        label={(purchasingFilterMode === 'yearSelection' && filterPurchaseOrdersYear) ? filterPurchaseOrdersYear : 'Select Year'}
        options={purchaseOrderYears.map((year) => ({ label: year.toString(), value: year.toString() }))}


      />
      <button className={`btn  ${purchasingFilterMode === 'all' ? 'btn-accent' : 'btn-soft'}`}
        onClick={() => setPurchasingFilterMode("all")}
      >
        All
      </button>
      <button className={`btn  ${purchasingFilterMode === 'yearToDate' ? 'btn-accent' : 'btn-soft'}`}
        onClick={() => setPurchasingFilterMode("yearToDate")}
      >
        This Year
      </button>
      <button className={`btn  ${purchasingFilterMode === 'lastYear' ? 'btn-accent' : 'btn-soft'}`}
        onClick={() => setPurchasingFilterMode("lastYear")}
      >
        Last Year
      </button>
    </div>
  )
}

export default FilterModeButtons
