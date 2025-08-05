"use client"

import { PanelStates, usePanelActions, usePanelSelection } from "@/store/panelSelectionSlice";
import { UserConfig } from "@/types/UserConfig";

type SetterProps = {
    panelSelections: UserConfig[]
}


const ConfigurationStateSetter = ({ panelSelections }: SetterProps) => {
    
    const { setPanelState }  = usePanelActions()

    panelSelections.forEach((config) => {

        const panelName = config.name as PanelStates
        setPanelState(panelName, config.value)

    })



    return null;
}

export default ConfigurationStateSetter
