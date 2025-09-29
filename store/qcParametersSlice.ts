import { qualityActions } from "@/actions/quality"
import { QcDataType } from "@/actions/quality/qc/dataTypes/getAll"
import { ExaminationType } from "@/actions/quality/qc/examinationTypes/getAll"
import { QcParameterGroup } from "@/actions/quality/qc/groups/getAll"
import { ParameterInputDefinition } from "@/actions/quality/qc/inputDefinitions/getAll"
import { QcParameter } from "@/actions/quality/qc/parameters/getAll"
import { QcTemplate } from "@/actions/quality/qc/templates/getAll"
import { ParameterGroup } from "@/app/quality/qc/parameters/[name]/_actions/getParameterGroups"
import { ParameterTemplate } from "@/app/quality/qc/parameters/[name]/_actions/getParameterTemplates"
import { QcParameterTab } from "@/app/quality/qc/parameters/_components/shared/TabSelector"
import { create } from "zustand"


type State = {
  currentTab: QcParameterTab
  dataTypes: QcDataType[]
  examinationTypes: ExaminationType[]
  groups: QcParameterGroup[]
  parameterInputDefinitions: ParameterInputDefinition[]
  parameterGroups: ParameterGroup[]
  parameterTemplates: ParameterTemplate[]
  parameters: QcParameter[]
  selectedParameter: QcParameter | null
  templates: QcTemplate[]
  isLoading: boolean
}

type Actions = {
  actions: {
    getDataTypes: () => void;
    setCurrentTab: (currentTab: QcParameterTab) => void;
    setExaminationTypes: (examinationTypes: ExaminationType[]) => void;
    setGroups: (groups: QcParameterGroup[]) => void;
    setParameterInputDefinitions: (inputDefinitions: ParameterInputDefinition[]) => void;
    setParameterGroups: (groups: ParameterGroup[]) => void;
    setParameterTemplates: (templates: ParameterTemplate[]) => void;
    setParameters: (parameters: QcParameter[]) => void;
    setSelectedParameter: (parameter: QcParameter | null) => void;
    setTemplates: (templates: QcTemplate[]) => void;
  }
}

export const useQcParameterSelection = create<State & Actions>((set, get) => ({
  currentTab: 'parameters' as QcParameterTab,
  dataTypes: [],
  examinationTypes: [],
  groups: [],
  isLoading: false,
  parameterInputDefinitions: [],
  parameterGroups: [],
  parameterTemplates: [],
  parameters: [],
  selectedParameter: null,
  templates: [],

  actions: {
    getDataTypes: async () => {
      try {
        set(() => ({ isLoading: true }))
        const dataTypes = await qualityActions.qc.dataTypes.getAll();
        set(() => ({ dataTypes }));
      } catch (error) {
        throw new Error('Error fetching data types')
      } finally {
        set(() => ({ isLoading: false }));
      }
    },
    setCurrentTab: (currentTab) => set(() => ({ currentTab })),
    setExaminationTypes: (examinationTypes) => set(() => ({ examinationTypes })),
    setGroups: (groups) => set(() => ({ groups })),
    setParameters: (parameters) => set(() => ({ parameters, })),
    setParameterInputDefinitions: (inputDefinitions) => set(() => ({ parameterInputDefinitions: inputDefinitions })),
    setParameterGroups: (groups) => set(() => ({ parameterGroups: groups })),
    setParameterTemplates: (templates) => set(() => ({ parameterTemplates: templates })),
    setSelectedParameter: (parameter) => set(() => ({ selectedParameter: parameter })),
    setTemplates: (templates) => set(() => ({ templates })),
  },



}))

export const useQcParameterActions = () => useQcParameterSelection((state) => state.actions)
