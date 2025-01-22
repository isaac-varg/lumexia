"use client"

import ModeSelector from "./ModeSelector"
import { usePanelActions, usePanelSelection } from "@/store/panelSelectionSlice"
import { PurchaseOrderDetails } from "../../_functions/getPurchaseOrder"
import { PoFlattenedOrderItems } from "../../_functions/flattenOrderItems"
import { PoFlatItems } from "../../_functions/flattenItems"
import ItemTable from "../ItemTable"
import PlanningView from "../PlanningView"

export type PoViewModes = 'planning' | 'table'

type ViewModeProps = {
    purchaseOrder: PurchaseOrderDetails;
    orderItems: PoFlattenedOrderItems;
    items: PoFlatItems;
}

const ViewMode = ({ purchaseOrder, orderItems, items }: ViewModeProps) => {
    const { poViewMode } = usePanelSelection()
    const { setPanelState } = usePanelActions()

    const handleViewModeChange = (viewMode: PoViewModes) => {
        setPanelState('poViewMode', viewMode)
    }


    return (
        <div className="flex flex-col gap-y-6">
            <ModeSelector
                onClick={handleViewModeChange}
                activeMode={poViewMode}
            />

            {poViewMode === 'table' && <ItemTable
                purchaseOrder={purchaseOrder}
                orderItems={orderItems}
                items={items}

            />
            }

            {poViewMode === 'planning' && (
                <PlanningView
                    purchaseOrder={purchaseOrder}
                    orderItems={orderItems}
                    items={items}
                />
            )}


        </div>
    )
}

export default ViewMode
