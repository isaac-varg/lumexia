import { PricingExamination } from "@/actions/accounting/examinations/getAllByItem";
import { ItemPricingData } from "@/actions/accounting/pricing/getItemPricingData";
import { InventoryLot } from "@/actions/auxiliary/getLotsByItem";
import { inventoryActions } from "@/actions/inventory";
import aliasTypeActions from "@/actions/inventory/aliasTypes";
import { ItemAlias } from "@/actions/inventory/aliases/getByItem";
import { Inventory } from "@/actions/inventory/getInventory";
import { SingleItem } from "@/actions/inventory/getOneItem"
import inventoryTypeActions from "@/actions/inventory/inventoryTypeActions";
import itemTypeActions from "@/actions/inventory/itemTypeActions";
import { ItemNote } from "@/actions/inventory/items/notes/getAllByItem";
import { ItemNoteType } from "@/actions/inventory/items/notes/types/getAllItemNoteTypes";
import { LotNote, getAllLotNotesByLot } from "@/actions/inventory/lots/notes/getAllByLot";
import { LotNoteType, getAllLotNoteTypes } from "@/actions/inventory/lots/notes/types/getAll";
import procurementTypeActions from "@/actions/inventory/procurementTypeActions";
import uomActions from "@/actions/inventory/uomActions";
import supplierActions from "@/actions/purchasing/supplierActions";
import { ItemActivity } from "@/app/inventory/items/[name]/_actions/basics/getActivity";
import { ItemInventoryAudits } from "@/app/inventory/items/[name]/_actions/inventory/getAudits";
import { LotTransaction, getTransactionsByLot } from "@/app/inventory/items/[name]/_actions/inventory/getTransactionsByLot";
import { ItemUsage } from "@/app/inventory/items/[name]/_actions/production/getUsage";
import { FilteredPurchaseOrder, PurchasingFilterMode, getFilteredPurchases } from "@/app/inventory/items/[name]/_actions/purchasing/getFilteredPurchases";
import { DashboardItemPurchaseOrder } from "@/app/inventory/items/[name]/_actions/purchasing/getItemPurchaseOrders";
import { LotsViewMode } from "@/app/inventory/items/[name]/_components/inventory/Lots";
import { ItemTab } from "@/app/inventory/items/[name]/_components/shared/TabSelector";
import { AliasType, InventoryType, ItemType, ProcurementType, Supplier, UnitOfMeasurement } from "@prisma/client";
import { create } from "zustand"


export type ItemOptions = {
  itemTypes: ItemType[],
  inventoryTypes: InventoryType[],
  procurementTypes: ProcurementType[],
  aliasTypes: AliasType[],
  suppliers: Supplier[],
  noteTypes: ItemNoteType[],
  lotNoteTypes: LotNoteType[],
  uom: UnitOfMeasurement[],
}


// the state
type State = {
  activity: ItemActivity[],
  aliases: ItemAlias[];
  audits: ItemInventoryAudits | null;
  currentTab: ItemTab;
  examinations: PricingExamination[],
  filterPurchaseOrdersYear: string | undefined;
  filteredPurchaseOrders: FilteredPurchaseOrder[];
  item: SingleItem | null;
  inventory: Inventory | null;
  lotsViewMode: LotsViewMode;
  notes: ItemNote[],
  options: ItemOptions;
  pricingData: ItemPricingData | null;
  purchasingFilterMode: PurchasingFilterMode;
  purchaseOrders: DashboardItemPurchaseOrder[];
  selectedAlias: ItemAlias | null;
  selectedLot: InventoryLot | null;
  selectedLotNotes: LotNote[];
  selectedLotTransactions: LotTransaction[];
  usage: ItemUsage | null;

}

type Actions = {
  actions: {
    getOptions: () => void;
    getFilteredPurchaseOrders: () => void;
    getSelectedLotNotes: () => void;
    getSelectedLotTransactions: () => void;
    setActivity: (activity: ItemActivity[]) => void;
    setAliases: (aliases: ItemAlias[]) => void;
    setAudits: (audits: ItemInventoryAudits | null) => void;
    setCurrentTab: (tab: ItemTab) => void;
    setExaminations: (examinations: PricingExamination[]) => void;
    setItem: (item: SingleItem | null) => void;
    setInventory: (inventory: Inventory | null) => void;
    setLotsViewMode: (mode: LotsViewMode) => void;
    setNotes: (notes: ItemNote[]) => void;
    setPricingData: (pricingData: ItemPricingData) => void;
    setPurchaseOrders: (purchaseOrders: DashboardItemPurchaseOrder[]) => void;
    setPurchasingFilterMode: (filter: PurchasingFilterMode, year?: string) => void;
    setSelectedAlias: (alias: ItemAlias | null) => void;
    setSelectedLot: (lot: InventoryLot | null) => void;
    setUsage: (usage: ItemUsage | null) => void;
  }
}

export const useItemSelection = create<State & Actions>((set, get) => ({
  activity: [],
  aliases: [],
  audits: null,
  currentTab: 'basics' as ItemTab,
  examinations: [],
  filteredPurchaseOrders: [],
  item: null,
  inventory: null,
  lotsViewMode: 'table' as LotsViewMode,
  notes: [],
  options: {
    itemTypes: [],
    inventoryTypes: [],
    procurementTypes: [],
    aliasTypes: [],
    suppliers: [],
    noteTypes: [],
    lotNoteTypes: [],
    uom: [],
  },
  filterPurchaseOrdersYear: undefined,
  pricingData: null,
  purchasingFilterMode: 'yearToDate' as PurchasingFilterMode,
  purchaseOrders: [],
  selectedAlias: null,
  selectedLot: null,
  selectedLotNotes: [],
  selectedLotTransactions: [],
  usage: null,


  actions: {

    getFilteredPurchaseOrders: () => {

      const { purchaseOrders, purchasingFilterMode, filterPurchaseOrdersYear } = get();

      const filtered = getFilteredPurchases(purchaseOrders, purchasingFilterMode, filterPurchaseOrdersYear);

      set(() => ({ filteredPurchaseOrders: filtered }));

    },

    getOptions: async () => {
      //fetch the data
      const [itemTypes, procurementTypes, inventoryTypes, aliasTypes, suppliers, noteTypes, lotNoteTypes, uom] = await Promise.all([
        await itemTypeActions.getAll(),
        await procurementTypeActions.getAll(),
        await inventoryTypeActions.getAll(),
        await aliasTypeActions.getAll(),
        await supplierActions.getAll(undefined, undefined, [{ name: 'asc' }]),
        await inventoryActions.items.notes.types.getAll(),
        await getAllLotNoteTypes(),
        await uomActions.getAll(),
      ]);

      // set state
      set(() => ({
        options: {
          inventoryTypes,
          itemTypes,
          procurementTypes,
          aliasTypes,
          suppliers,
          noteTypes,
          lotNoteTypes,
          uom,
        }
      }));
    },

    getSelectedLotNotes: async () => {
      const { selectedLot } = get()
      if (!selectedLot) return;

      const lotNotes = await getAllLotNotesByLot(selectedLot.id);
      set(() => ({
        selectedLotNotes: lotNotes,
      }))
    },

    getSelectedLotTransactions: async () => {
      const { selectedLot } = get()

      if (!selectedLot) return;

      const data = await getTransactionsByLot(selectedLot.id);

      set(() => ({
        selectedLotTransactions: data.transactions,
      }))

    },

    setActivity: (activity) => {
      set(() => ({ activity, }))
    },

    setAliases: (aliases) => {
      set(() => ({ aliases, }))
    },

    setAudits: (audits) => {
      set(() => ({ audits, }))
    },

    setCurrentTab: (tab) => {
      set(() => ({ currentTab: tab }))
    },

    setExaminations: (examinations) => {
      set(() => ({ examinations, }))
    },

    setItem: (item) => {
      set(() => ({ item }))
    },

    setInventory: (inventory) => {
      set(() => ({ inventory, }));
    },

    setLotsViewMode: (mode) => { set(() => ({ lotsViewMode: mode })) },

    setNotes: (notes) => {
      set(() => ({ notes, }))
    },

    setPricingData: (pricingData) => {
      set(() => ({ pricingData, }));
    },

    setPurchasingFilterMode: (mode, year) => {
      set(() => ({ purchasingFilterMode: mode, filterPurchaseOrdersYear: year }));
    },

    setPurchaseOrders: (purchaseOrders) => {
      set(() => ({ purchaseOrders, }))
    },

    setSelectedAlias: (alias) => {
      set(() => ({ selectedAlias: alias }))
    },

    setSelectedLot: (lot) => {
      set(() => ({ selectedLot: lot }))
    },

    setUsage: (usage) => {
      set(() => ({ usage, }))
    },

  },



}))

export const useItemActions = () => useItemSelection((state) => state.actions)
