import { purchasingActions } from '@/actions/purchasing';
import { PurchasingRequest } from '@/actions/purchasing/requests/getByStatus';
import { useQuery } from '@tanstack/react-query';

export const usesPurchasingRequestsPollingQuery = () => {

    return useQuery<PurchasingRequest[]>({
        queryKey: ['purchasingRequests'],
        queryFn: async () => {
            const requests = await purchasingActions.requests.getAllByStatus('requested');
            return requests
        },
        refetchInterval: 10000,
        refetchOnWindowFocus: true,
        staleTime: 9000,
    });
}
