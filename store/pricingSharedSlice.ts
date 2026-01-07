import { FinishedProductFromProduced } from "@/actions/accounting/finishedProducts/getByProducedItem";
import { FinishedProductFromPurchased } from "@/actions/accounting/finishedProducts/getByPurchasedItem";
import { Item } from "@/actions/inventory/items/getOne"
import { FinishedProductsMode } from "@/app/accounting/pricing/[item]/new/_components/shared/finishedProducts/FinishedProducts";
import { create } from "zustand"

type State = {
  item: Item | null;
  finishedProducts: FinishedProductFromProduced[] | FinishedProductFromPurchased[] | null
  isProduced: boolean
  totalCostPerLb: number
  finishedProductsMode: FinishedProductsMode
  selectedFinishedProduct: FinishedProductFromProduced | FinishedProductFromPurchased | null
}

type Actions = {
  actions: {
    setItem: (item: Item) => void,
    setIsProduced: (isProduced: boolean) => void;
    setFinishedProducts: (finishedProducts: FinishedProductFromProduced[] | FinishedProductFromPurchased[] | null) => void,
    setFinishedProductsMode: (mode: FinishedProductsMode) => void,
    setSelectedFinishedProduct: (finishedProduct: FinishedProductFromProduced | FinishedProductFromPurchased | null) => void,
    setTotalCostPerLb: (totalCostPerLb: number) => void;

  }
}

export const usePricingSharedSelection = create<State & Actions>((set, get) => ({
  item: null,
  isProduced: false,
  finishedProducts: null,
  finishedProductsMode: 'normal' as FinishedProductsMode,
  selectedFinishedProduct: null,
  totalCostPerLb: 0,

  actions: {
    setItem: (item) => set(() => ({ item, })),
    setIsProduced: (isProduced) => set(() => ({ isProduced, })),
    setFinishedProducts: (finishedProducts) => set(() => ({ finishedProducts })),
    setFinishedProductsMode: (mode) => set(() => ({ finishedProductsMode: mode })),
    setSelectedFinishedProduct: (finishedProduct) => set(() => ({ selectedFinishedProduct: finishedProduct })),
    setTotalCostPerLb: (totalCostPerLb) => set(() => ({ totalCostPerLb, })),
  },



}))

export const usePricingSharedActions = () => usePricingSharedSelection((state) => state.actions)
