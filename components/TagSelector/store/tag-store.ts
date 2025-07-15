import { createStore } from 'zustand';

// Define the state and actions for our store
export interface TagState<T> {
    tags: T[];
}

// Create a function that creates a new store instance
export const createTagStore = <T>(initialTags: T[]) => {
    return createStore<TagState<T>>((set) => ({
        tags: initialTags,
    }));
};

// We will use this type later
export type TagStore<T> = ReturnType<typeof createTagStore<T>>;
