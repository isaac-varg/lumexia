import { qualityActions } from "@/actions/quality"
import { QcDataType } from "@/actions/quality/qc/dataTypes/getAll"
import { ParameterInputDefinition } from "@/actions/quality/qc/inputDefinitions/getAll"
import { QcParameter } from "@/actions/quality/qc/parameters/getAll"
import InputDefinitions from "@/app/quality/qc/parameters/[name]/_components/inputDefinitions/InputDefinitions"
import { QcParameterTab } from "@/app/quality/qc/parameters/_components/shared/TabSelector"
import { create } from "zustand"


type State = {
  currentTab: QcParameterTab
  dataTypes: QcDataType[]
  parameterInputDefinitions: ParameterInputDefinition[]
  parameters: QcParameter[]
  selectedParameter: QcParameter | null,

}

type Actions = {
  actions: {
    getDataTypes: () => void;
    setCurrentTab: (currentTab: QcParameterTab) => void;
    setParameterInputDefinitions: (inputDefinitions: ParameterInputDefinition[]) => void;
    setParameters: (parameters: QcParameter[]) => void;
    setSelectedParameter: (parameter: QcParameter | null) => void;
  }
}

export const useQcParameterSelection = create<State & Actions>((set, get) => ({
  currentTab: 'paramters' as QcParameterTab,
  dataTypes: [],
  parameterInputDefinitions: [],
  parameters: [],
  selectedParameter: null,

  actions: {
    getDataTypes: async () => {
      const dataTypes = await qualityActions.qc.dataTypes.getAll();
      set(() => ({ dataTypes }));
    },
    setCurrentTab: (currentTab) => set(() => ({ currentTab })),
    setParameters: (parameters) => set(() => ({ parameters, })),
    setParameterInputDefinitions: (inputDefinitions) => set(() => ({ parameterInputDefinitions: inputDefinitions })),
    setSelectedParameter: (parameter) => set(() => ({ selectedParameter: parameter })),
  },



}))

export const useQcParameterActions = () => useQcParameterSelection((state) => state.actions)
