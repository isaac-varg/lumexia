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
import procurementTypeActions from "@/actions/inventory/procurementTypeActions";
import supplierActions from "@/actions/purchasing/supplierActions";
import { ItemActivity } from "@/app/inventory/items/[name]/_actions/basics/getActivity";
import { LotsViewMode } from "@/app/inventory/items/[name]/_components/inventory/Lots";
import { ItemTab } from "@/app/inventory/items/[name]/_components/shared/TabSelector";
import { AliasType, InventoryType, ItemType, ProcurementType, Supplier } from "@prisma/client";
import { create } from "zustand"


export type ItemOptions = {
  itemTypes: ItemType[],
  inventoryTypes: InventoryType[],
  procurementTypes: ProcurementType[],
  aliasTypes: AliasType[],
  suppliers: Supplier[],
  noteTypes: ItemNoteType[],
}


// the state
type State = {
  activity: ItemActivity[],
  aliases: ItemAlias[];
  currentTab: ItemTab;
  item: SingleItem | null;
  inventory: Inventory | null;
  lotsViewMode: LotsViewMode;
  notes: ItemNote[],
  options: ItemOptions;
  selectedAlias: ItemAlias | null;
  selectedLot: InventoryLot | null;
}

type Actions = {
  actions: {
    getOptions: () => void;
    setActivity: (activity: ItemActivity[]) => void;
    setAliases: (aliases: ItemAlias[]) => void;
    setCurrentTab: (tab: ItemTab) => void;
    setItem: (item: SingleItem | null) => void;
    setInventory: (inventory: Inventory | null) => void;
    setLotsViewMode: (mode: LotsViewMode) => void;
    setNotes: (notes: ItemNote[]) => void;
    setSelectedAlias: (alias: ItemAlias | null) => void;
    setSelectedLot: (lot: InventoryLot | null) => void;
  }
}

export const useItemSelection = create<State & Actions>((set) => ({
  activity: [],
  aliases: [],
  currentTab: 'basics',
  item: null,
  inventory: null,
  lotsViewMode: 'table',
  notes: [],
  options: {
    itemTypes: [],
    inventoryTypes: [],
    procurementTypes: [],
    aliasTypes: [],
    suppliers: [],
    noteTypes: [],
  },
  selectedAlias: null,
  selectedLot: null,


  actions: {
    getOptions: async () => {
      //fetch the data
      const [itemTypes, procurementTypes, inventoryTypes, aliasTypes, suppliers, noteTypes] = await Promise.all([
        await itemTypeActions.getAll(),
        await procurementTypeActions.getAll(),
        await inventoryTypeActions.getAll(),
        await aliasTypeActions.getAll(),
        await supplierActions.getAll(undefined, undefined, [{ name: 'asc' }]),
        await inventoryActions.items.notes.types.getAll(),
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
        }
      }));
    },

    setActivity: (activity) => {
      set(() => ({ activity, }))
    },

    setAliases: (aliases) => {
      set(() => ({ aliases, }))
    },

    setCurrentTab: (tab) => {
      set(() => ({ currentTab: tab }))
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

    setSelectedAlias: (alias) => {
      set(() => ({ selectedAlias: alias }))
    },

    setSelectedLot: (lot) => {
      set(() => ({ selectedLot: lot }))
    }

  },



}))

export const useItemActions = () => useItemSelection((state) => state.actions)
