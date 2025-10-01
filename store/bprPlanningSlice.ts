import { BprStatus } from "@/actions/production/bprs/statuses/getAll"
import { PlanningBpr } from "@/actions/production/getPlanningBprs"
import { PlanningTab } from "@/app/production/planning/_components/shared/TabSelector"
import { bprStatuses } from "@/configs/staticRecords/bprStatuses"
import { groupByProperty } from "@/utils/data/groupByProperty"
import { create } from "zustand"

const { draft } = bprStatuses;

type State = {
  currentTab: PlanningTab
  currentStatusId: string | null
  bprs: Record<string, PlanningBpr[]>
  statusCounts: Map<string, number>
  statuses: BprStatus[]
}

type Actions = {
  actions: {
    setCurrentTab: (tab: PlanningTab) => void;
    setBprs: (bprs: PlanningBpr[]) => void;
    setStatuses: (statuses: BprStatus[]) => void;
    setCurrentStatusId: (statusId: string) => void;
  }
}

export const useBprPlanningSelection = create<State & Actions>((set) => ({
  currentTab: 'status' as PlanningTab,
  currentStatusId: draft,
  statusCounts: new Map(),
  bprs: {},
  statuses: [],

  actions: {
    setCurrentTab: (tab) => set(() => ({ currentTab: tab })),
    setBprs: (bprs) => {
      const grouped = groupByProperty(bprs, "bprStatusId")

      const counts = new Map(
        Object.entries(grouped).map(([key, value]) => [key, value.length])
      );

      set(() => ({ bprs: grouped, statusCounts: counts }))
    },
    setStatuses: (statuses) => set(() => ({ statuses })),
    setCurrentStatusId: (statusId) => set(() => ({ currentStatusId: statusId })),
  }
}))

export const useBprPlanningActions = () => useBprPlanningSelection((state) => state.actions)
