import { usePurchasingActions, usePurchasingSelection } from "@/store/purchasingSlice"
import ViewMode from "./ViewMode"
import EditMode from "./EditMode"
import { useHotkeys } from "react-hotkeys-hook"

export type LineItemsMode = 'view' | 'edit'

const LineItems = () => {

  const { lineItemsMode } = usePurchasingSelection()
  const { setLineItemsMode } = usePurchasingActions()

  useHotkeys('ctrl+e', () => setLineItemsMode(lineItemsMode === 'edit' ? "view" : 'edit'), {
    preventDefault: true,
  })


  return (
    <div>

      {lineItemsMode === 'view' && <ViewMode />}

      {lineItemsMode === 'edit' && <EditMode />}

    </div>

  )
}

export default LineItems
