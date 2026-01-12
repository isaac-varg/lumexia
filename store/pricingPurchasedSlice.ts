import { ItemPricingData } from "@/actions/accounting/pricing/getItemPricingData"
import { LastItemPrice } from "@/actions/accounting/pricing/getLastItemPrice"
import { create } from "zustand"

type State = {
  pricingData: ItemPricingData | null
  lastPrice: LastItemPrice | null
}

type Actions = {
  actions: {
    setPricingData: (pricingData: ItemPricingData) => void;
    setLastPrice: (lastPrice: LastItemPrice) => void;
  }
}

export const usePricingPurchasedSelection = create<State & Actions>((set, get) => ({
  pricingData: null,
  lastPrice: null,

  actions: {
    setPricingData: (pricingData) => set(() => ({ pricingData, })),
    setLastPrice: (lastPrice) => set(() => ({ lastPrice })),
  },



}))

export const usePricingPurchasedActions = () => usePricingPurchasedSelection((state) => state.actions)
