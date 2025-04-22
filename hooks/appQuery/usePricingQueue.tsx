import { accountingActions } from '@/actions/accounting';
import { ReviewablePricingExams } from '@/actions/accounting/pricing/getReviewable';
import { useQuery } from '@tanstack/react-query';

export const usePricingQueue = () => {

    return useQuery<ReviewablePricingExams[]>({
        queryKey: ['reviewablePricingExams'],
        queryFn: async () => {
            const exams = await accountingActions.examinations.getReviewable();
            return exams 
        },
        refetchInterval: 10000,
        refetchOnWindowFocus: true,
        staleTime: 9000,
    });
}
