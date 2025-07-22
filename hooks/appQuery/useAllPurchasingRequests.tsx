import { inventoryActions } from '@/actions/inventory';
import { purchasingActions } from '@/actions/purchasing';
import { getAllGeneralRequests } from '@/app/purchasing/requests/general/_actions/getAllGeneralRequests';
import { useQuery } from '@tanstack/react-query';

export const useAllPurchasingRequests = () => {

    return useQuery<number>({
        queryKey: ['allPurchasingRequests'],
        queryFn: async () => {
            const generalRequests = await getAllGeneralRequests(false);
            const normalRequests = await purchasingActions.requests.getAllByStatus('requested');
            const count = generalRequests.length + normalRequests.length
            return count
        },
        refetchInterval: 10000,
        refetchOnWindowFocus: true,
        staleTime: 9000,
    });
}
