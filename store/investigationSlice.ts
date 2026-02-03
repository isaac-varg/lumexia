import { SingleItem } from "@/actions/inventory/getOneItem"
import { ItemNote } from "@/actions/inventory/items/notes/getAllByItem"
import { ItemInventoryAudits } from "@/app/inventory/items/[name]/_actions/inventory/getAudits"
import { DashboardItemPurchaseOrder } from "@/app/inventory/items/[name]/_actions/purchasing/getItemPurchaseOrders"
import { InvestigationAuditRequest, InvestigationLot } from "@/app/inventory/investigation/[name]/_actions/getInvestigationData"
import { create } from "zustand"

export type InvestigationTab = 'lots' | 'purchaseOrders' | 'audits' | 'notes'

type State = {
  item: SingleItem | null
  lots: InvestigationLot[]
  purchaseOrders: DashboardItemPurchaseOrder[]
  audits: ItemInventoryAudits | null
  auditRequests: InvestigationAuditRequest[]
  notes: ItemNote[]
  currentTab: InvestigationTab
  expandedLotIds: string[]
}

type Actions = {
  actions: {
    setItem: (item: SingleItem | null) => void
    setLots: (lots: InvestigationLot[]) => void
    setPurchaseOrders: (pos: DashboardItemPurchaseOrder[]) => void
    setAudits: (audits: ItemInventoryAudits | null) => void
    setAuditRequests: (requests: InvestigationAuditRequest[]) => void
    setNotes: (notes: ItemNote[]) => void
    setCurrentTab: (tab: InvestigationTab) => void
    toggleLotExpanded: (lotId: string) => void
  }
}

export const useInvestigationSelection = create<State & Actions>((set, get) => ({
  item: null,
  lots: [],
  purchaseOrders: [],
  audits: null,
  auditRequests: [],
  notes: [],
  currentTab: 'lots' as InvestigationTab,
  expandedLotIds: [],

  actions: {
    setItem: (item) => set(() => ({ item })),
    setLots: (lots) => set(() => ({ lots })),
    setPurchaseOrders: (purchaseOrders) => set(() => ({ purchaseOrders })),
    setAudits: (audits) => set(() => ({ audits })),
    setAuditRequests: (auditRequests) => set(() => ({ auditRequests })),
    setNotes: (notes) => set(() => ({ notes })),
    setCurrentTab: (tab) => set(() => ({ currentTab: tab })),
    toggleLotExpanded: (lotId) => {
      const { expandedLotIds } = get()
      const isExpanded = expandedLotIds.includes(lotId)
      set(() => ({
        expandedLotIds: isExpanded
          ? expandedLotIds.filter(id => id !== lotId)
          : [...expandedLotIds, lotId]
      }))
    },
  },
}))

export const useInvestigationActions = () => useInvestigationSelection((state) => state.actions)
