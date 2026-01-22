import { ActiveMbpr } from "@/actions/production/getActiveMbpr"
import { ProducedPricingSummations } from "@/app/accounting/pricing/[item]/new/_actions/getBomWithPricing";
import { create } from "zustand"

type State = {
  activeMbpr: ActiveMbpr | null;
  pricingData: ProducedPricingSummations | null
}

type Actions = {
  actions: {
    setActiveMbpr: (activeMbpr: ActiveMbpr | null) => void;
    setPricingData: (pricingData: ProducedPricingSummations | null) => void;
  }
}

export const usePricingProducedSelection = create<State & Actions>((set, get) => ({
  activeMbpr: null,
  pricingData: null,

  actions: {
    setActiveMbpr: (activeMbpr) => set(() => ({ activeMbpr, })),
    setPricingData: (pricingData) => set(() => ({ pricingData, })),
  },



}))

export const usePricingProducedActions = () => usePricingProducedSelection((state) => state.actions)
