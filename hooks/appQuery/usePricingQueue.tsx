import { accountingActions } from '@/actions/accounting';
import { PricingQueueEntry } from '@/actions/accounting/pricing/getQueue';
import { useQuery } from '@tanstack/react-query';

export const usePricingQueue = () => {

    return useQuery<PricingQueueEntry[]>({
        queryKey: ['pricingQueue'],
        queryFn: async () => {
            const queue = await accountingActions.pricing.getQueue();
            return queue 
        },
        refetchInterval: 10000,
        refetchOnWindowFocus: true,
        staleTime: 9000,
    });
}
