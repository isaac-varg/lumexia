import { inventoryActions } from '@/actions/inventory';
import { AuditRequest } from '@/actions/inventory/getAuditRequests';
import { useQuery } from '@tanstack/react-query';

export const useAuditRequest = () => {

    return useQuery<number>({
        queryKey: ['auditRequests'],
        queryFn: async () => {
            const audits = await inventoryActions.auditReqests.getCount();
            return audits
        },
        refetchInterval: 10000,
        refetchOnWindowFocus: true,
        staleTime: 9000,
    });
}
