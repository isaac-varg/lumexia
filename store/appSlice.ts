import { User, getUser } from "@/actions/users/getUser"
import { create } from "zustand"

type State = {
    user: User | null
}

type Actions = {
    actions: {
        getUser: () => void;
    }
}

export const useAppSelection = create<State & Actions>((set) => ({
    user: null,

    actions: {
        getUser: async () => {
            try {
                const user = await getUser();
                set(() => ({ user, }))
            } catch (error) {
                console.error(error);
            }

        }

    },



}))

export const useAppActions = () => useAppSelection((state) => state.actions)
