import { inventoryActions } from '@/actions/inventory';
import PageTitle from '@/components/Text/PageTitle';
import React from 'react'
import AuditPanel from '../[lotId]/_components/AuditPanel';
import Card from '@/components/Card';
import Notes from './_components/Notes';
import { createOpenedNote } from './_functions/createOpenedNote';
import CompleteButton from './_components/CompleteButton';

type RequestPageProps = {
    searchParams: {
        id: string;
    };
};

const RequestPage = async ({ searchParams }: RequestPageProps) => {

    const { id } = searchParams
    const request = await inventoryActions.auditReqests.getOne(id);
    const itemLots = await inventoryActions.getItemLots(request.item.id);
    await createOpenedNote(request.id);
    

    return (
        <div className='flex flex-col gap-y-2'>
            <PageTitle>Audit Request for {request.item.name}</PageTitle>

            <div className='grid grid-cols-2 gap-x-6'>
                <Card.Root>
                    <Card.Title>Notes</Card.Title>

                    <Notes notes={request.notes} />



                </Card.Root>
                <Card.Root>
                    <Card.Title>Actions</Card.Title>

                    <div className='grid grid-cols-1 gap-4'>
                        <CompleteButton requestId={request.id} itemId={request.item.id} />
                    </div>
                </Card.Root>
            </div>

            <Card.Root>
                <Card.Title>Inventory</Card.Title>

                <AuditPanel allLots={itemLots as any} />
            </Card.Root>



        </div>
    )
}

export default RequestPage
