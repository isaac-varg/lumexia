import aliasTypeActions from "@/actions/inventory/aliasTypes";
import { ItemAlias } from "@/actions/inventory/aliases/getByItem";
import { SingleItem } from "@/actions/inventory/getOneItem"
import inventoryTypeActions from "@/actions/inventory/inventoryTypeActions";
import itemTypeActions from "@/actions/inventory/itemTypeActions";
import procurementTypeActions from "@/actions/inventory/procurementTypeActions";
import supplierActions from "@/actions/purchasing/supplierActions";
import { ItemTab } from "@/app/inventory/items/[name]/_components/shared/TabSelector";
import { AliasType, InventoryType, ItemType, ProcurementType, Supplier } from "@prisma/client";
import { create } from "zustand"


export type ItemOptions = {
  itemTypes: ItemType[],
  inventoryTypes: InventoryType[],
  procurementTypes: ProcurementType[],
  aliasTypes: AliasType[],
  suppliers: Supplier[],
}

// the state
type State = {
  aliases: ItemAlias[];
  currentTab: ItemTab;
  item: SingleItem | null;
  options: ItemOptions;
  selectedAlias: ItemAlias | null;
}

type Actions = {
  actions: {
    getOptions: () => void;
    setAliases: (aliases: ItemAlias[]) => void;
    setCurrentTab: (tab: ItemTab) => void;
    setItem: (item: SingleItem | null) => void;
    setSelectedAlias: (alias: ItemAlias | null) => void;
  }
}

export const useItemSelection = create<State & Actions>((set) => ({
  aliases: [],
  currentTab: 'basics',
  item: null,
  options: {
    itemTypes: [],
    inventoryTypes: [],
    procurementTypes: [],
    aliasTypes: [],
    suppliers: [],
  },
  selectedAlias: null,


  actions: {
    getOptions: async () => {
      //fetch the data
      const [itemTypes, procurementTypes, inventoryTypes, aliasTypes, suppliers] = await Promise.all([
        itemTypeActions.getAll(),
        procurementTypeActions.getAll(),
        inventoryTypeActions.getAll(),
        aliasTypeActions.getAll(),
        supplierActions.getAll(undefined, undefined, [{ name: 'asc' }]),
      ]);

      // set state
      set(() => ({
        options: {
          inventoryTypes,
          itemTypes,
          procurementTypes,
          aliasTypes,
          suppliers,
        }
      }));
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

    setSelectedAlias: (alias) => {
      set(() => ({ selectedAlias: alias }))
    },


  },



}))

export const useItemActions = () => useItemSelection((state) => state.actions)
