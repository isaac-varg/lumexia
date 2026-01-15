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

export type ModifyModes = "new" | "edit"

type PriceAltering = Map<string, ProcessedFinishedProduct | false>;


export type InterimFinishedProductDetails = {
  name: string
  fillQuantity: number
  declaredQuantity: number
  difficultyAdjustmentCost: number
  freeShippingCost: number
}


export type InterimAuxiliaryDetails = {
  isNew: boolean
  id: string
  quantity: number
  name: string
  difficultyAdjustmentCost: number
  isDirty: boolean // was it modified
}

type InterimProductDataValues =
  | string
  | number
  | InterimFinishedProductDetails
  | InterimAuxiliaryDetails
  | string[]

type InterimFinishedProductData = Map<string, InterimProductDataValues>;

type State = {
  item: Item | null;
  finishedProducts: FinishedProductFromProduced[] | FinishedProductFromPurchased[] | null
  isProduced: boolean
  interimFinishedProductData: InterimFinishedProductData
  totalCostPerLb: number
  finishedProductsMode: FinishedProductsMode
  modifyMode: ModifyModes
  modifyCurrentStep: number
  selectedFinishedProduct: FinishedProductFromProduced | FinishedProductFromPurchased | null
  processedFinishedProducts: PriceAltering
}

type Actions = {
  actions: {
    setItem: (item: Item) => void,
    setIsProduced: (isProduced: boolean) => void;
    setInterimFinishedProductDatum: (key: string, value: InterimProductDataValues) => void,
    setFinishedProducts: (finishedProducts: FinishedProductFromProduced[] | FinishedProductFromPurchased[] | null) => void,
    setFinishedProductsMode: (mode: FinishedProductsMode) => void,
    setModifyMode: (mode: ModifyModes) => void,
    setModifyCurrentStep: (step: number) => void,
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
  interimFinishedProductData: new Map(),
  finishedProducts: null,
  finishedProductsMode: 'normal' as FinishedProductsMode,
  modifyCurrentStep: 0,
  modifyMode: 'new' as ModifyModes,
  processedFinishedProducts: new Map(),
  selectedFinishedProduct: null,
  totalCostPerLb: 0,

  actions: {
    setItem: (item) => set(() => ({ item, })),
    setIsProduced: (isProduced) => set(() => ({ isProduced, })),
    setInterimFinishedProductDatum: (key, value) => {
      set((state) => {
        const newMap = new Map(state.interimFinishedProductData);
        newMap.set(key, value);
        return { interimFinishedProductData: newMap };
      })
    },
    setFinishedProducts: (finishedProducts) => set(() => ({ finishedProducts })),
    setFinishedProductsMode: (mode) => set(() => ({ finishedProductsMode: mode })),
    setModifyCurrentStep: (step) => set(() => ({ modifyCurrentStep: step })),
    setModifyMode: (mode) => set(() => ({ modifyMode: mode })),
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
