import { User, getUser } from "@/actions/users/getUser"
import { create } from "zustand"

type State = {
    user: User | null
    isSidebarCollapsed: boolean
}

type Actions = {
    actions: {
        getUser: () => void;
        toggleSidebarCollapse: () => void;
    }
}

export const useAppSelection = create<State & Actions>((set) => ({
    user: null,
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

        toggleSidebarCollapse: () => {
            set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed }))
        }

    },



}))

export const useAppActions = () => useAppSelection((state) => state.actions)
