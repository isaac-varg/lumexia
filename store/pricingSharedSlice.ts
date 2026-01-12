import { FinishedProductFromProduced } from "@/actions/accounting/finishedProducts/getByProducedItem";
import { FinishedProductFromPurchased } from "@/actions/accounting/finishedProducts/getByPurchasedItem";
import { Item } from "@/actions/inventory/items/getOne"
import { FinishedProductsMode } from "@/app/accounting/pricing/[item]/new/_components/shared/finishedProducts/FinishedProducts";
import { create } from "zustand"

// types

export type ProcessedFinishedProduct = {
  consumerPrice: number
  profit: number
  markup: number
  profitPercentage: number
  valid: boolean
}

type PriceAltering = Map<string, ProcessedFinishedProduct | false>;

type State = {
  item: Item | null;
  finishedProducts: FinishedProductFromProduced[] | FinishedProductFromPurchased[] | null
  isProduced: boolean
  totalCostPerLb: number
  finishedProductsMode: FinishedProductsMode
  selectedFinishedProduct: FinishedProductFromProduced | FinishedProductFromPurchased | null
  processedFinishedProducts: PriceAltering
}

type Actions = {
  actions: {
    setItem: (item: Item) => void,
    setIsProduced: (isProduced: boolean) => void;
    setFinishedProducts: (finishedProducts: FinishedProductFromProduced[] | FinishedProductFromPurchased[] | null) => void,
    setFinishedProductsMode: (mode: FinishedProductsMode) => void,
    setProcessedFinishedProduct: (id: string, data: ProcessedFinishedProduct | false) => void;
    getProcessedFinishedProduct: (id: string) => ProcessedFinishedProduct | false | undefined
    setSelectedFinishedProduct: (finishedProduct: FinishedProductFromProduced | FinishedProductFromPurchased | null) => void,
    setTotalCostPerLb: (totalCostPerLb: number) => void;

  }
}


// the slice

export const usePricingSharedSelection = create<State & Actions>((set, get) => ({
  item: null,
  isProduced: false,
  finishedProducts: null,
  finishedProductsMode: 'normal' as FinishedProductsMode,
  processedFinishedProducts: new Map(),
  selectedFinishedProduct: null,
  totalCostPerLb: 0,

  actions: {
    setItem: (item) => set(() => ({ item, })),
    setIsProduced: (isProduced) => set(() => ({ isProduced, })),
    setFinishedProducts: (finishedProducts) => set(() => ({ finishedProducts })),
    setFinishedProductsMode: (mode) => set(() => ({ finishedProductsMode: mode })),
    setProcessedFinishedProduct: (id, data) => set((state) => {
      const newMap = new Map(state.processedFinishedProducts);
      newMap.set(id, data);
      return { processedFinishedProducts: newMap };
    }),
    getProcessedFinishedProduct: (id) => get().processedFinishedProducts.get(id),
    setSelectedFinishedProduct: (finishedProduct) => set(() => ({ selectedFinishedProduct: finishedProduct })),
    setTotalCostPerLb: (totalCostPerLb) => set(() => ({ totalCostPerLb, })),
  },



}))

export const usePricingSharedActions = () => usePricingSharedSelection((state) => state.actions)
