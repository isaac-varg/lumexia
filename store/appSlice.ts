import { User, getUser } from "@/actions/users/getUser"
import { getUserConfig } from "@/actions/users/getUserConfig"
import { create } from "zustand"

export type Language = 'en' | 'es'

type State = {
  user: User | null
  language: Language
  isSidebarCollapsed: boolean

}

type Actions = {
  actions: {
    getUser: () => void;
    getLanguage: () => void;
    toggleSidebarCollapse: () => void;
  }
}

export const useAppSelection = create<State & Actions>((set, get) => ({
  user: null,
  language: 'en' as Language,
  isSidebarCollapsed: false,

  actions: {
    getUser: async () => {
      try {
        const user = await getUser();
        set(() => ({ user, }))
      } catch (error) {
        console.error(error);
      }

    },

    getLanguage: async () => {

      try {
        const lang = await getUserConfig('language')
        if (!lang) {
          set(() => ({ language: 'en' }))
        } else {
          set(() => ({ language: lang.value as Language }))
        }
      } catch (error) {
        console.error(error)
      }
    },

    toggleSidebarCollapse: () => {
      set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed }))
    }

  },



}))

export const useAppActions = () => useAppSelection((state) => state.actions)
