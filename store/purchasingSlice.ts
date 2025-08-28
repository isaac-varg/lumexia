import { appActions } from "@/actions/app"
import purchaseOrderStatusActions from "@/actions/purchasing/purchaseOrderStatusActions"
import { PurchasingTab } from "@/app/purchasing/purchase-orders/[purchaseOrder]/_components/shared/TabSelector"
import { FlattenedOrderItem, flattenOrderItems } from "@/app/purchasing/purchase-orders/[purchaseOrder]/_functions/flattenOrderItems"
import { PurchasableItem, getAllItems } from "@/app/purchasing/purchase-orders/[purchaseOrder]/_functions/getAllItems"
import { POItem } from "@/app/purchasing/purchase-orders/[purchaseOrder]/_functions/getPOItems"
import { PurchaseOrderDetails } from "@/app/purchasing/purchase-orders/[purchaseOrder]/_functions/getPurchaseOrder"
import { Config, PurchaseOrderStatus } from "@prisma/client"
import { create } from "zustand"

type Options = {
  company: Config[]
  poStatuses: PurchaseOrderStatus[]
}


type State = {
  currentTab: PurchasingTab
  options: Options
  orderItems: FlattenedOrderItem[]
  purchasableItems: PurchasableItem[]
  purchaseOrder: PurchaseOrderDetails | null
}

type Actions = {
  actions: {
    getOptions: () => void;
    getPurchasableItems: () => void;
    setCurrentTab: (tab: PurchasingTab) => void;
    setOrderItems: (serverOrderItems: POItem[]) => void;
    setPurchaseOrder: (purchaseOrder: PurchaseOrderDetails | null) => void;
  }
}

export const usePurchasingSelection = create<State & Actions>((set, get) => ({
  currentTab: 'items',
  options: {
    company: [],
    poStatuses: [],
  },
  orderItems: [],
  purchasableItems: [],
  purchaseOrder: null,

  actions: {

    getOptions: async () => {

      const [
        company,
        poStatuses,
      ] = await Promise.all([
        await appActions.configs.getByGroup('company'),
        await purchaseOrderStatusActions.getAll(),
      ])

      set(() => ({
        options: {
          company,
          poStatuses,
        }
      }))

    },

    getPurchasableItems: async () => {
      const items = await getAllItems();
      set(() => ({ purchasableItems: items }));
    },

    setCurrentTab: (tab) => set(() => ({ currentTab: tab })),

    setOrderItems: (serverOrderItems) => {
      const orderItems = flattenOrderItems(serverOrderItems);
      set(() => ({ orderItems, }));
    },
    setPurchaseOrder: (purchaseOrder) => set(() => ({ purchaseOrder, })),

  },



}))

export const usePurchasingActions = () => usePurchasingSelection((state) => state.actions)
