'use client'

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTabs } from './Context';

interface ContentProps<T extends string> {
  value: T;
  children: ReactNode;
}
export const Content = <T extends string>({ value, children }: ContentProps<T>) => {
  const { activeTab } = useTabs<T>();

  if (activeTab !== value) {
    return null;
  }

  return (
    <motion.div
      key={value}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      role="tabpanel"
    >
      {children}
    </motion.div>
  );
};
Content.displayName = "Tabs.Content";
