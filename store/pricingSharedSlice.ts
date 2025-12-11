import { FinishedProductFromProduced } from "@/actions/accounting/finishedProducts/getByProducedItem";
import { FinishedProductFromPurchased } from "@/actions/accounting/finishedProducts/getByPurchasedItem";
import { Item } from "@/actions/inventory/items/getOne"
import { create } from "zustand"

type State = {
  item: Item | null;
  finishedProducts: FinishedProductFromProduced[] | FinishedProductFromPurchased[] | null
}

type Actions = {
  actions: {
    setItem: (item: Item) => void,
    setFinishedProducts: (finishedProducts: FinishedProductFromProduced[] | FinishedProductFromPurchased[] | null) => void,
  }
}

export const usePricingSharedSelection = create<State & Actions>((set, get) => ({
  item: null,
  finishedProducts: null,

  actions: {
    setItem: (item) => set(() => ({ item, })),
    setFinishedProducts: (finishedProducts) => set(() => ({ finishedProducts })),

  },



}))

export const usePricingSharedActions = () => usePricingSharedSelection((state) => state.actions)
