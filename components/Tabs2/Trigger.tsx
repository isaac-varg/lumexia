'use client'

import React, { ReactNode } from 'react';
import { useTabs } from './Context';

interface TriggerProps<T extends string> {
  value: T;
  children: ReactNode;
}
export const Trigger = <T extends string>({ value, children }: TriggerProps<T>) => {
  const { activeTab, setActiveTab } = useTabs<T>();
  const isSelected = activeTab === value;

  return (
    <button
      className={`capitalize min-w-40 btn btn-secondary ${isSelected ? '' : 'btn-dash'}`}
      onClick={() => setActiveTab(value)}
      role="tab"
      aria-selected={isSelected}
    >
      {children}
    </button>
  );
};
Trigger.displayName = "Tabs.Trigger";
