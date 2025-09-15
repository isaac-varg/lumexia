import { create } from 'zustand';

type State = {
  itemDetails: string
  productionItemDetails: string
  supplierDetails: string
  requestInventory: string
  requestDashboard: 'all' | 'new'
  planningDashboard: 'byStatus' | 'byTable'
}

const panelDefaults: State = {
  itemDetails: "inventory",
  productionItemDetails: 'inventory',
  supplierDetails: 'purchases',
  requestInventory: 'current',
  requestDashboard: 'all',
  planningDashboard: 'byStatus'
}

export type PanelStates = keyof State

type Actions = {
  actions: {
    setPanelState: (panelStateName: PanelStates, value?: string) => void;
  }
}

export const usePanelSelection = create<State & Actions>((set) => ({
  itemDetails: "inventory",
  productionItemDetails: "inventory",
  supplierDetails: 'purchases',
  requestInventory: 'current',
  requestDashboard: 'all' as any,
  planningDashboard: 'byStatus' as any,

  actions: {
    setPanelState: (panelStateName, value) => {
      const determinedValue = value ? value : panelDefaults[panelStateName]
      set(() => ({
        [panelStateName]: determinedValue,
      }))
    },
  }


}))

export const usePanelActions = () => usePanelSelection((state) => state.actions) 
