'use client'

import React, { ReactNode } from 'react';

interface ListProps {
  children: ReactNode;
  className?: string;
}
export const List = ({ children, className = '' }: ListProps) => {
  return <div className={`flex items-center justify-start gap-6 ${className}`}>{children}</div>;
};
List.displayName = "Tabs.List";
