import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


export type TabsConfig = {
  itemDetails: 'basics' | 'inventory' | 'purchasing' | 'pricing' | 'production' | 'quality' | 'files';
};

type TabGroupKey = keyof TabsConfig;
type TabValue<K extends TabGroupKey> = TabsConfig[K];

type TabState = {
  activeTab: { [K in TabGroupKey]?: TabValue<K> };
}

type TabActions = {
  actions: {
    setActiveTab: <K extends TabGroupKey>(key: K, tab: TabValue<K>) => void;
  }
}

const initialState: TabState = {
  activeTab: {
    itemDetails: 'basics',
  },
}

export const useTabSelection = create<TabState & TabActions>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        setActiveTab: (key, tab) => {
          set((state) => ({
            activeTab: {
              ...state.activeTab,
              [key]: tab,
            },
          }));
        },
      },
    }),
    {
      name: 'active-tab',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ activeTab: state.activeTab }),
    },
  ),
);

export const useTabActions = () => useTabSelection((state) => state.actions)
