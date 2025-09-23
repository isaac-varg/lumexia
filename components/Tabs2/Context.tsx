'use client'

import { createContext, useContext } from 'react';

export interface TabsContextType<T extends string> {
  activeTab: T;
  setActiveTab: (tab: T) => void;
}

export const TabsContext = createContext<TabsContextType<any> | null>(null);

export const useTabs = <T extends string>(): TabsContextType<T> => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a Tabs.Root component');
  }
  return context;
};
