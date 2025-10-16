import { RequestPriorities } from "@/app/purchasing/requests/[referenceCode]/_functions/getRequestPriorities";
import { RequestStatus, getRequestStatuses } from "@/app/purchasing/requests/[referenceCode]/_functions/getRequestStatuses";
import { getPriorities } from "@/app/purchasing/requests/_functions/getPriorities";
import { RequestForDashboard } from "@/app/purchasing/requests/_functions/getRequests"
import { GeneralRequestMinimal } from "@/app/purchasing/requests/general/_actions/getAllGeneralRequests";
import { create } from "zustand"

type State = {
  requests: RequestForDashboard[];
  generalRequests: GeneralRequestMinimal[];
  options: {
    statuses: RequestStatus[];
    priorities: RequestPriorities[];
  }
}

type Actions = {
  actions: {
    setRequests: (request: RequestForDashboard[]) => void;
    setGeneralRequests: (generalRequests: GeneralRequestMinimal[]) => void;
    setOptions: () => void;
  }
}

export const usePurchasingRequestSelection = create<State & Actions>((set) => ({
  requests: [],
  generalRequests: [],
  options: {
    statuses: [],
    priorities: [],
  },

  actions: {
    setRequests: (requests) => set(() => ({ requests })),
    setGeneralRequests: (generalRequests) => set(() => ({ generalRequests })),

    setOptions: async () => {
      const statuses = await getRequestStatuses();
      const priorities = await getPriorities();

      set(() => ({
        options: {
          statuses,
          priorities,
        }
      }))

    }
  },



}))

export const usePurchasingRequestActions = () => usePurchasingRequestSelection((state) => state.actions)
