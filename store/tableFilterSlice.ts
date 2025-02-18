import { create } from 'zustand'
import { TableStateName } from './tableFacetsSlice'

type State = {
    items: string
    pos: string
    productionPlanningList: string
    poDetailsItems: string
    supplierDetailsPurchasesTab: string
    suppliers: string
    itemDetailsLot: string
    poRequests: string
    receiving: string
    itemDetailsLotDialog: string
    itemDetailsTransactons: string
    itemDetailsPurchasesTab: string
    receivingRecentlyCompleted: string
    requestArchive: string
}


type Actions = {
    setFilter: (filterName: TableStateName, value: string) => void;

}

export const useTableFilter = create<State & Actions>((set) => ({
    items: "",
    pos: "",
    productionPlanningList: "",
    poDetailsItems: "",
    supplierDetailsPurchasesTab: "",
    suppliers: "",
    itemDetailsLot: "",
    poRequests: "",
    receiving: "",
    itemDetailsLotDialog: "",
    itemDetailsTransactons: "",
    itemDetailsPurchasesTab: "",
    receivingRecentlyCompleted: "",
    requestArchive: "",

    setFilter: (filterName, value) => set((state) => ({
        ...state,
        [filterName]: value,
    })),

}))
