import { QcParameter } from "@/actions/quality/qc/parameters/getAll"
import { QcParameterTab } from "@/app/quality/qc/parameters/_components/shared/TabSelector"
import { create } from "zustand"


type State = {
  currentTab: QcParameterTab
  parameters: QcParameter[]
  selectedParameter: QcParameter | null,
}

type Actions = {
  actions: {
    setCurrentTab: (currentTab: QcParameterTab) => void;
    setParameters: (parameters: QcParameter[]) => void;
    setSelectedParameter: (parameter: QcParameter | null) => void;
  }
}

export const useQcParameterSelection = create<State & Actions>((set, get) => ({
  currentTab: 'paramters' as QcParameterTab,
  parameters: [],
  selectedParameter: null,

  actions: {
    setCurrentTab: (currentTab) => set(() => ({ currentTab })),
    setParameters: (parameters) => set(() => ({ parameters, })),
    setSelectedParameter: (parameter) => set(() => ({ selectedParameter: parameter })),
  },



}))

export const useQcParameterActions = () => useQcParameterSelection((state) => state.actions)
