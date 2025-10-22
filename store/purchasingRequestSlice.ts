import { purchasingActions } from "@/actions/purchasing";
import supplierActions from "@/actions/purchasing/supplierActions";
import { RequestPriorities } from "@/app/purchasing/requests/[referenceCode]/_functions/getRequestPriorities";
import { RequestStatus, getRequestStatuses } from "@/app/purchasing/requests/[referenceCode]/_functions/getRequestStatuses";
import { getPriorities } from "@/app/purchasing/requests/_functions/getPriorities";
import { RequestForDashboard } from "@/app/purchasing/requests/_functions/getRequests"
import { GeneralRequestMinimal } from "@/app/purchasing/requests/general/_actions/getAllGeneralRequests";
import { groupByProperty } from "@/utils/data/groupByProperty";
import { create } from "zustand"

type State = {
  requests: RequestForDashboard[];
  generalRequests: GeneralRequestMinimal[];
  selectedStatus: RequestStatus | null;
  statusCounts: Map<string, number>;
  selectedSupplierId: string | null;
  suppliersGrouped: Map<string, RequestForDashboard[]>
  supplierCounts: Map<string, number>;
  options: {
    statuses: RequestStatus[];
    priorities: RequestPriorities[];
    suppliers: Map<string, string>;
  }
}

type Actions = {
  actions: {
    setRequests: (request: RequestForDashboard[]) => void;
    setGeneralRequests: (generalRequests: GeneralRequestMinimal[]) => void;
    setOptions: () => void;
    setSelectedStatus: (status: RequestStatus | null) => void;
    setSelectedSupplierId: (supplierId: string | null) => void;
  }
}

export const usePurchasingRequestSelection = create<State & Actions>((set) => ({
  requests: [],
  generalRequests: [],
  selectedStatus: null,
  statusCounts: new Map(),
  selectedSupplierId: null,
  suppliersGrouped: new Map(),
  supplierCounts: new Map(),
  options: {
    statuses: [],
    priorities: [],
    suppliers: new Map(),
  },

  actions: {
    setRequests: (requests) => {
      // for status
      const statusGrouped = groupByProperty(requests, "statusId")
      const statusCounts = new Map(
        Object.entries(statusGrouped).map(([key, value]) => [key, value.length])
      );

      // for suppliers
      const suppliersGrouped = new Map<string, RequestForDashboard[]>();
      requests.forEach(request => {
        request.suppliers.forEach(supplier => {
          if (supplier) {
            const existingRequests = suppliersGrouped.get(supplier.id) || [];
            if (!existingRequests.find(r => r.id === request.id)) {
              suppliersGrouped.set(supplier.id, [...existingRequests, request]);
            }
          }
        });
      });

      const supplierCounts = new Map<string, number>();
      suppliersGrouped.forEach((requests, supplierId) => {
        supplierCounts.set(supplierId, requests.length);
      });


      set(() => ({ requests, statusCounts, suppliersGrouped, supplierCounts }))

    },
    setGeneralRequests: (generalRequests) => set(() => ({ generalRequests })),
    setSelectedStatus: (status) => set(() => ({ selectedStatus: status, })),
    setSelectedSupplierId: (supplierId) => set(() => ({ selectedSupplierId: supplierId })),

    setOptions: async () => {
      const statuses = await getRequestStatuses();
      const priorities = await getPriorities();
      const suppliers = await purchasingActions.suppliers.getAll();

      const suppliersMap = new Map(suppliers.map((s) => [s.id, s.name]))

      set(() => ({
        options: {
          statuses,
          priorities,
          suppliers: suppliersMap,
        }
      }))

    }
  },



}))

export const usePurchasingRequestActions = () => usePurchasingRequestSelection((state) => state.actions)
