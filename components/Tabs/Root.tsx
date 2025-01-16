import { PanelStates, usePanelSelection } from "@/store/panelSelectionSlice";
import * as Tabs from "@radix-ui/react-tabs";
import React from "react";

const TabsRoot = ({ children, panelStateName }: { children: React.ReactNode, panelStateName: PanelStates }) => {

    const panelState = usePanelSelection()

    return (
        <Tabs.Root
            className="flex flex-col shadow-lg rounded-md shadow-limed-spruce-200"
            defaultValue={panelState[panelStateName]}
        >
            {children}
        </Tabs.Root>
    );
};

export default TabsRoot;
