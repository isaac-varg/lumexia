import { SingleItem } from "@/actions/inventory/getOneItem"
import { ItemTab } from "@/app/inventory/items/[name]/_components/shared/TabSelector";
import { create } from "zustand"



type State = {
  item: SingleItem | null;
  currentTab: ItemTab;
}

type Actions = {
  actions: {
    setCurrentTab: (tab: ItemTab) => void;
    setItem: (item: SingleItem | null) => void;

  }
}

export const useItemSelection = create<State & Actions>((set) => ({
  currentTab: 'basics',
  item: null,

  actions: {
    setCurrentTab: (tab) => {
      set(() => ({ currentTab: tab }))
    },

    setItem: (item) => {
      set(() => ({ item }))
    }


  },



}))

export const useItemActions = () => useItemSelection((state) => state.actions)
