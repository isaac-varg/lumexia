import { create } from 'zustand';

// map where each set belongs to the name of the facet or really column name
type NamedSets<T> = Map<string, Set<T>>;

type State = {
    items: NamedSets<string>;
    pos: NamedSets<string>;
};

export type TableStateName = keyof State;

type Actions = {
    setFilter: (filterName: TableStateName, value: NamedSets<any>) => void;
    addToNamedSet: <T>(filterName: TableStateName, setName: string, value: T) => void;
    removeNamedSet: (filterName: TableStateName, setName: string) => void;
    resetNamedSet: (filterName: TableStateName, setName: string) => void;
    removeValueFromNamedSet: <T>(filterName: TableStateName, setName: string, value: T) => void;
};

export const useTableFacets = create<State & Actions>((set) => ({
    items: new Map<string, Set<string>>(),
    pos: new Map<string, Set<string>>(),

    setFilter: (filterName, value) =>
        set((state) => ({
            ...state,
            [filterName]: value,
        })),

    addToNamedSet: (filterName, setName, value) =>
        set((state) => {
            const map = state[filterName] as NamedSets<any>;
            // create a copy of the map.
            const updatedMap = new Map(map);

            // use existing set if it exists or create a new one if it dne
            const existingSet = updatedMap.get(setName) || new Set();
            // add the value to the set
            existingSet.add(value);

            // update the map with the modified est.
            updatedMap.set(setName, existingSet);

            return { ...state, [filterName]: updatedMap };
        }),
    removeNamedSet: (filterName, setName) =>
        set((state) => {
            const map = state[filterName] as NamedSets<any>;
            const updatedMap = new Map(map);

            updatedMap.delete(setName);

            return { ...state, [filterName]: updatedMap };
        }),

    resetNamedSet: (filterName, setName) =>
        set((state) => {
            const map = state[filterName] as NamedSets<any>;
            const updatedMap = new Map(map);

            updatedMap.set(setName, new Set());

            return { ...state, [filterName]: updatedMap };
        }),
    removeValueFromNamedSet: (filterName, setName, value) =>
        set((state) => {
            const map = state[filterName] as NamedSets<any>;
            const updatedMap = new Map(map); 

            const existingSet = updatedMap.get(setName);
            if (existingSet) {
                existingSet.delete(value); 
                updatedMap.set(setName, existingSet); 
            }

            return { ...state, [filterName]: updatedMap };
        }),
}));

