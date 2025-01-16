import PageTitle from '@/components/Text/PageTitle';
import React from 'react'
import { getRequest } from './_functions/getRequest';
import PageBreadcrumbs from '@/components/App/PageBreadcrumbs';
import BasicDetailsPanel from './_components/BasicDetailsPanel';
import { getLinkedBatches } from './_functions/getLinkedBatches';
import LinkedBatchesPanel from './_components/LinkedBatchesPanel';
import { PrismaClient } from '@prisma/client';
import SelectBprDialog from './_components/SelectBprDialog';
import { getLinkableBprs } from './_functions/getLinkableBprs';

type RequestDetailsProps = {
    searchParams: {
        id: string;
    };
};


const RequestDetailsPage = async ({ searchParams }: RequestDetailsProps) => {

    const request = await getRequest(searchParams.id)
    const linkedBprs = await getLinkedBatches(searchParams.id)
    const linkableBprs = await getLinkableBprs(request.itemId);

    if (!request) {
        return null
    }

    return (
        <div className='flex flex-col gap-y-4'>

            <SelectBprDialog requestId={request.id} linkableBprs={linkableBprs} />

            <PageTitle>{`${request.title} <REQ# ${request.referenceCode}>`}</PageTitle>
            <PageBreadcrumbs />

            <div className='grid grid-cols-2 gap-4'>

                <BasicDetailsPanel
                    requestingUser={request.requestingUser.name ?? ""}
                    statusName={request.status.name ?? ""}
                    priorityName={request.priority.name}

                />

                <div className='card bg-base-300'>hey</div>

                <LinkedBatchesPanel bprs={linkedBprs} />

            </div>


        </div>
    )
}

export default RequestDetailsPage
