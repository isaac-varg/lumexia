import { create } from 'zustand'
import { TableStateName } from './tableFacetsSlice'

type StateData = {
    pageSize: number,
    pageIndex: number,

}

type State = {
    items: StateData
    pos: StateData
    productionPlanningList: StateData
    poDetailsItems: StateData
    supplierDetailsPurchasesTab: StateData
    suppliers: StateData
    itemDetailsLot: StateData
    poRequests: StateData
    receiving: StateData
    itemDetailsLotDialog: StateData
    itemDetailsTransactons: StateData
    itemDetailsPurchasesTab: StateData
    receivingRecentlyCompleted: StateData
    requestArchive: StateData
    itemPricingExamiantions: StateData
}


type Actions = {
    setPagination: (filterName: TableStateName, value: StateData) => void;

}

export const useTablePagination = create<State & Actions>((set) => ({
    items: { pageSize: 50, pageIndex: 0 },
    pos: { pageSize: 50, pageIndex: 0 },
    productionPlanningList: { pageSize: 50, pageIndex: 0 },
    poDetailsItems: { pageSize: 50, pageIndex: 0 },
    supplierDetailsPurchasesTab: { pageSize: 50, pageIndex: 0 },
    suppliers: { pageSize: 50, pageIndex: 0 },
    itemDetailsLot: { pageSize: 50, pageIndex: 0 },
    poRequests: { pageSize: 50, pageIndex: 0 },
    receiving: { pageSize: 50, pageIndex: 0 },
    itemDetailsLotDialog: { pageSize: 50, pageIndex: 0 },
    itemDetailsTransactons: { pageSize: 50, pageIndex: 0 },
    itemDetailsPurchasesTab: { pageSize: 50, pageIndex: 0 },
    receivingRecentlyCompleted: { pageSize: 50, pageIndex: 0 },
    requestArchive: { pageSize: 50, pageIndex: 0 },
    itemPricingExamiantions: { pageSize: 50, pageIndex: 0 },

    setPagination: (filterName, value) =>
        set((state) => ({
            ...state,
            [filterName]: value,
        })),

}))
