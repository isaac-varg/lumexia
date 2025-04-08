import React, { useEffect } from 'react'
import { FilledConsumerContainerFormParameters } from './AddConsumerContainerDialog';
import { Prisma } from '@prisma/client';
import { accountingActions } from '@/actions/accounting';
import useDialog from '@/hooks/useDialog';
import { FilledConsumerContainer } from '@/actions/accounting/consumerContainers/getAllByFillItem';
import { usePricingProducedActions } from '@/store/pricingProducedSlice';

type Props = {
    currentStep: number,
    consumerContainer: string;
    fillItem: string;
    parameters: FilledConsumerContainerFormParameters | null;
    reset: () => void;
    produced: boolean;
}
const CompleteStep = ({ currentStep, consumerContainer, fillItem, parameters, reset, produced }: Props) => {

    const { resetDialogContext } = useDialog()
    const { addFilledConsumerContainer } = usePricingProducedActions()



    const handleSubmission = async () => {

        if (!parameters) { return }

        const { fillQuantity, declaredQuantity, uomId, difficultiesCost } = parameters

        const data: Prisma.ItemConsumerContainerUncheckedCreateInput = {
            itemId: fillItem,
            consumerContainerId: consumerContainer,
            fillQuantity,
            declaredQuantity,
            uomId,
            difficultiesCost,
        }

        const filledConsumerContainer = await accountingActions.filledConsumerContainers.createOne(data);
        if (produced) {
            handleProducedSubmission(filledConsumerContainer)
        }
        resetDialogContext()
        reset();
    }


    const handleProducedSubmission = (filledConsumerContainer: FilledConsumerContainer) => {

        addFilledConsumerContainer(filledConsumerContainer)

    }

    useEffect(() => {
        if (consumerContainer && fillItem && parameters) {
            handleSubmission()
        }
    }, [consumerContainer, fillItem, parameters, currentStep])

    if (currentStep !== 2) { return false }


    return (
        <div>
            <div className="skeleton h-32 w-32"></div>
        </div>
    )
}

export default CompleteStep
