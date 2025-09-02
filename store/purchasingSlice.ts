import { accountingActions } from "@/actions/accounting"
import { PaymentMethod } from "@/actions/accounting/paymentMethods/getAll"
import { appActions } from "@/actions/app"
import { purchasingActions } from "@/actions/purchasing"
import purchaseOrderStatusActions from "@/actions/purchasing/purchaseOrderStatusActions"
import { PoInternalNote } from "@/actions/purchasing/purchaseOrders/notes/interal/getAll"
import { PoInternalNoteType } from "@/actions/purchasing/purchaseOrders/notes/interal/getAllInternalNoteTypes"
import { PoPublicNote } from "@/actions/purchasing/purchaseOrders/notes/public/getAll"
import { PoPublicNoteType } from "@/actions/purchasing/purchaseOrders/notes/public/getAllTypes"
import { PoSupplierNote } from "@/actions/purchasing/purchaseOrders/notes/supplier/getAll"
import { PoSupplierNoteType } from "@/actions/purchasing/purchaseOrders/notes/supplier/getAllTypes"
import { AccountingFileTypes, getAccountingFileTags } from "@/app/accounting/pos/_actions/getAccountingFileTags"
import { AccountingFile } from "@/app/accounting/pos/_actions/getAccountingFilesByPo"
import { getAllAccountingNoteTypes } from "@/app/accounting/pos/_actions/getAllAccountingNoteTypes"
import { PoAccountingStatus, getAllPoAccountingStatuses } from "@/app/accounting/pos/_actions/getAllAccountingStatuses"
import { PoWithAccounting } from "@/app/accounting/pos/_actions/getPoWithAccountingDetails"
import { PurchasingTab } from "@/app/purchasing/purchase-orders/[purchaseOrder]/_components/shared/TabSelector"
import { FlattenedOrderItem, flattenOrderItems } from "@/app/purchasing/purchase-orders/[purchaseOrder]/_functions/flattenOrderItems"
import { PurchasableItem, getAllItems } from "@/app/purchasing/purchase-orders/[purchaseOrder]/_functions/getAllItems"
import { POItem } from "@/app/purchasing/purchase-orders/[purchaseOrder]/_functions/getPOItems"
import { PurchaseOrderDetails } from "@/app/purchasing/purchase-orders/[purchaseOrder]/_functions/getPurchaseOrder"
import { Config, PoAccountingNoteType, PurchaseOrderStatus } from "@prisma/client"
import { create } from "zustand"

type Options = {
  company: Config[]
  fileTypes: AccountingFileTypes[]
  poStatuses: PurchaseOrderStatus[]
  paymentMethods: PaymentMethod[]
  accountingStatuses: PoAccountingStatus[]
  accountingNoteTypes: PoAccountingNoteType[]
  internalNoteTypes: PoInternalNoteType[]
  publicNoteTypes: PoPublicNoteType[]
  poSupplierNoteTypes: PoSupplierNoteType[]
}


type State = {
  currentTab: PurchasingTab
  files: AccountingFile[]
  options: Options
  orderItems: FlattenedOrderItem[]
  poWithAccounting: PoWithAccounting | null
  purchasableItems: PurchasableItem[]
  purchaseOrder: PurchaseOrderDetails | null
  internalNotes: PoInternalNote[]
  publicNotes: PoPublicNote[]
  poSupplierNotes: PoSupplierNote[]
}

type Actions = {
  actions: {
    getOptions: () => void;
    getPurchasableItems: () => void;
    setCurrentTab: (tab: PurchasingTab) => void;
    setFiles: (files: AccountingFile[]) => void;
    setOrderItems: (serverOrderItems: POItem[]) => void;
    setPoWithAccounting: (poWithAccounting: PoWithAccounting | null) => void;
    setPurchaseOrder: (purchaseOrder: PurchaseOrderDetails | null) => void;
    setInternalNotes: (notes: PoInternalNote[]) => void;
    setPublicNotes: (notes: PoPublicNote[]) => void;
    setPoSupplierNotes: (notes: PoSupplierNote[]) => void;
  }
}

export const usePurchasingSelection = create<State & Actions>((set) => ({
  currentTab: 'items' as PurchasingTab,
  options: {
    company: [],
    poStatuses: [],
    fileTypes: [],
    paymentMethods: [],
    accountingStatuses: [],
    accountingNoteTypes: [],
    internalNoteTypes: [],
    publicNoteTypes: [],
    poSupplierNoteTypes: [],
  },
  files: [],
  orderItems: [],
  poWithAccounting: null,
  purchasableItems: [],
  purchaseOrder: null,
  publicNotes: [],
  internalNotes: [],
  poSupplierNotes: [],

  actions: {

    getOptions: async () => {

      const [
        company,
        poStatuses,
        fileTypes,
        paymentMethods,
        accountingStatuses,
        accountingNoteTypes,
        internalNoteTypes,
        publicNoteTypes,
        poSupplierNoteTypes,
      ] = await Promise.all([
        await appActions.configs.getByGroup('company'),
        await purchaseOrderStatusActions.getAll(),
        await getAccountingFileTags(),
        await accountingActions.paymentMethods.getAll(),
        await getAllPoAccountingStatuses(),
        await getAllAccountingNoteTypes(),
        await purchasingActions.purchaseOrders.notes.internal.types.getAll(),
        await purchasingActions.purchaseOrders.notes.public.types.getAll(),
        await purchasingActions.purchaseOrders.notes.supplier.types.getAll(),
      ])

      set(() => ({
        options: {
          company,
          poStatuses,
          fileTypes,
          paymentMethods,
          accountingStatuses,
          accountingNoteTypes,
          internalNoteTypes,
          publicNoteTypes,
          poSupplierNoteTypes,
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
    setPoWithAccounting: (poWithAccounting) => set(() => ({ poWithAccounting, })),
    setPurchaseOrder: (purchaseOrder) => set(() => ({ purchaseOrder, })),
    setFiles: (files) => set(() => ({ files, })),
    setInternalNotes: (notes) => set(() => ({ internalNotes: notes })),
    setPublicNotes: (notes) => set(() => ({ publicNotes: notes, })),
    setPoSupplierNotes: (notes) => set(() => ({ poSupplierNotes: notes })),

  },



}))

export const usePurchasingActions = () => usePurchasingSelection((state) => state.actions)
