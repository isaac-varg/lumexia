import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import ContextMenu from "../ContextMenu";
import { PanelStates, usePanelActions  } from "@/store/panelSelectionSlice";
import { updateUserConfig } from "@/actions/users/updateUserConfig";
import { staticRecords } from "@/configs/staticRecords";

const TabTrigger = ({
    identifier,
    label,
    panelStateName,
}: {
    identifier: string;
    label: string;
    panelStateName: PanelStates;
}) => {

    const { setPanelState } = usePanelActions()
    const handleDefaultSelection = () => {

        setPanelState(panelStateName, identifier)

        updateUserConfig(panelStateName, identifier, staticRecords.app.userConfigGroups.panelSelections )

    }


    return (
        <ContextMenu.Root>

            <Tabs.Trigger
                className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-md leading-none text-limed-spruce-900 font-poppins font-bold select-none first:rounded-tl-md last:rounded-tr-md hover:text-limed-spruce-300  data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:bg-limed-spruce-800 data-[state=active]:text-white outline-none cursor-default"
                value={identifier}
            >

                <ContextMenu.Trigger>

                    {label}

                </ContextMenu.Trigger>
            </Tabs.Trigger>
            <ContextMenu.Content>
                <ContextMenu.Item onClick={() => handleDefaultSelection()}>Set as Default Tab</ContextMenu.Item>
            </ContextMenu.Content>
        </ContextMenu.Root>
    );
};

export default TabTrigger;
