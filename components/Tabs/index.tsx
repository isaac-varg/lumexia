import React from 'react';
import TabsRoot from './Root';
import TabList from './List';
import TabTrigger from './Trigger';
import TabContent from './Content';


const TabsPanel = ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
);

TabsPanel.Root = TabsRoot;
TabsPanel.List = TabList
TabsPanel.Trigger = TabTrigger
TabsPanel.Content = TabContent


export default TabsPanel;