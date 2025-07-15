'use client';

import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import { type TagStore, createTagStore, type TagState } from './store/tag-store';

//context to hold the zustand store
const TagContext = createContext<TagStore<any> | null>(null);

// provider component that will wrap our atomic component
export const TagSelectorProvider = <T,>({
    children,
    initialTags,
}: {
    children: React.ReactNode;
    initialTags: T[];
}) => {
    const storeRef = useRef<TagStore<T>>();
    if (!storeRef.current) {
        storeRef.current = createTagStore(initialTags);
    }

    return (
        <TagContext.Provider value={storeRef.current}>
            {children}
        </TagContext.Provider>
    );
}

// custom hook to access the store within the component
export function useTagSelector<T>() {
    const store = useContext(TagContext);
    if (!store) {
        throw new Error('useCounter must be used within a CounterProvider');
    }
    // `useStore` is the hook that makes our component re-render on state changes
    return useStore(store) as TagState<T>;
}
