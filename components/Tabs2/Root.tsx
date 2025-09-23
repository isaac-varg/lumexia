'use client'

import React, { useState, ReactNode } from 'react';
import { TabsContext } from './Context';

interface RootProps<T extends string> {
  defaultValue: T;
  children: ReactNode;
}
export const Root = <T extends string>({ defaultValue, children }: RootProps<T>) => {
  const [activeTab, setActiveTab] = useState<T>(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className='flex flex-col gap-6'>
        {children}
      </div>
    </TabsContext.Provider>
  );
};
Root.displayName = "Tabs.Root";
