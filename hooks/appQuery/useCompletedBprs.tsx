import { handleCompletedBprs } from '@/actions/queries/completedBprs/handleCompletedBprs';
import { useQuery } from '@tanstack/react-query';

export const useCompletedBprs = () => {

    return useQuery({
        queryKey: ['completedBprs'],
        queryFn: async () => {
            const bprs = await handleCompletedBprs();
            return bprs;
        },
        refetchInterval: 8 * 60 * 60 * 1000,
        refetchOnWindowFocus: true,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
}



