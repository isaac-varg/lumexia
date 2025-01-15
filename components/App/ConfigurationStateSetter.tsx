"use client"

import { PanelStates, usePanelSelection } from "@/store/panelSelectionSlice";
import { UserConfig } from "@/types/UserConfig";

type SetterProps = {
    panelSelections: UserConfig[]
}


const ConfigurationStateSetter = ({ panelSelections } : SetterProps) => {
    const panelSelectionState = usePanelSelection()

    panelSelections.forEach((config) => {

        const panelName = config.name as PanelStates
        panelSelectionState.setPanelState(panelName, config.value)

    }) 

    

  return null;
}

export default ConfigurationStateSetter
