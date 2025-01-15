import { create } from 'zustand'
import { TableStateName } from './tableFacetsSlice'

type State = {
    items: string
    pos: string
}


type Actions = {
    setFilter: (filterName: TableStateName, value: string) => void;

}

export const useTableFilter = create<State & Actions>((set) => ({
    items: "",
    pos: "",
    setFilter: (filterName, value) => set((state) => ({
        ...state,
        [filterName]: value,
    })),

}))
