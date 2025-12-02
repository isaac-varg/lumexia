'use client'

import React, { ReactNode } from 'react';
import { useTabs } from './Context';

const classes = {
  text: {
    capitalize: 'capitalize',
  },
  width: {
    default: 'min-w-40',
  },
  size: {
    sm: 'btn-sm',
    xl: 'btn-xl',
    large: 'btn-lg',
  },
  color: {
    secondary: 'btn-secondary',
  }
}

interface TriggerProps<T extends string> {
  value: T;
  children: ReactNode;
  text?: keyof typeof classes.text;
  width?: keyof typeof classes.width;
  size?: keyof typeof classes.size;
  color?: keyof typeof classes.color;
}
export const Trigger = <T extends string>({
  value,
  children,
  text = 'capitalize',
  width = 'default',
  size = 'xl',
  color = 'secondary',
}: TriggerProps<T>) => {
  const { activeTab, setActiveTab } = useTabs<T>();
  const isSelected = activeTab === value;

  return (
    <button
      className={`${classes.text[text]} ${classes.width[width]} ${classes.size[size]} btn ${classes.color[color]} ${isSelected ? '' : 'btn-dash'}`}
      onClick={() => setActiveTab(value)}
      role="tab"
      aria-selected={isSelected}
    >
      {children}
    </button>
  );
};
Trigger.displayName = "Tabs.Trigger";
