import { usePurchasingSelection } from "@/store/purchasingSlice"
import ViewMode from "./ViewMode"
import EditMode from "./EditMode"

export type LineItemsMode = 'view' | 'edit'

const LineItems = () => {

  const { lineItemsMode } = usePurchasingSelection()


  return (
    <div>

      {lineItemsMode === 'view' && <ViewMode />}

      {lineItemsMode === 'edit' && <EditMode />}

    </div>

  )
}

export default LineItems
