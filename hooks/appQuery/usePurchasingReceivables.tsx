import { inventoryActions } from '@/actions/inventory';
import { Receivables } from '@/actions/inventory/receiving/getReceivables';
import { useQuery } from '@tanstack/react-query';

export const usePurchasingReceivables = () => {

    return useQuery<Receivables[]>({
        queryKey: ['purchasingReceivables'],
        queryFn: async () => {
            const pos = await inventoryActions.receiving.getReceivables();
            return pos 
        },
        refetchInterval: 10000,
        refetchOnWindowFocus: true,
        staleTime: 9000,
    });
}
