import { productionActions } from "@/actions/production"
import { MbprActivity } from "@/actions/production/mbpr/activity/getActivity"
import { Mbpr } from "@/actions/production/mbpr/getOneMbpr"
import { MbprNote } from "@/actions/production/mbpr/notes/getAllByMbpr"
import { MbprNoteType } from "@/actions/production/mbpr/notes/notesTypes/getAll"
import { RecordStatus } from "@/actions/app/recordStatuses/getAllRecordStatuses"
import { MbprTab } from "@/app/production/mbpr/[referenceCode]/_components/shared/TabSelector"
import { create } from "zustand"

type Options = {
  noteTypes: MbprNoteType[],
}

type State = {
  activity: MbprActivity[]
  mbpr: Mbpr | null
  currentTab: MbprTab
  notes: MbprNote[]
  statuses: RecordStatus[]
  options: Options
}

type Actions = {
  actions: {
    setActivity: (activity: MbprActivity[]) => void
    setMbpr: (mbpr: Mbpr | null) => void
    setCurrentTab: (tab: MbprTab) => void
    setNotes: (notes: MbprNote[]) => void
    setStatuses: (statuses: RecordStatus[]) => void
    getOptions: () => void
  }
}

export const useMbprDetailsSelection = create<State & Actions>((set) => ({
  activity: [],
  mbpr: null,
  currentTab: 'overview' as MbprTab,
  notes: [],
  statuses: [],
  options: {
    noteTypes: [],
  },

  actions: {
    setActivity: (activity) => set(() => ({ activity })),
    setMbpr: (mbpr) => set(() => ({ mbpr })),
    setCurrentTab: (tab) => set(() => ({ currentTab: tab })),
    setNotes: (notes) => set(() => ({ notes })),
    setStatuses: (statuses) => set(() => ({ statuses })),
    getOptions: async () => {
      const noteTypes = await productionActions.mbprs.notes.types.getAll()
      set(() => ({
        options: {
          noteTypes,
        }
      }))
    },
  }
}))

export const useMbprDetailsActions = () => useMbprDetailsSelection((state) => state.actions)
