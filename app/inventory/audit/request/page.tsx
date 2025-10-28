import { inventoryActions } from '@/actions/inventory';
import PageTitle from '@/components/Text/PageTitle';
import React from 'react'
import AuditPanel from '../[lotId]/_components/AuditPanel';
import Card from '@/components/Card';
import Notes from './_components/Notes';
import { createOpenedNote } from './_functions/createOpenedNote';
import CompleteButton from './_components/CompleteButton';
import SectionTitle from '@/components/Text/SectionTitle';

type RequestPageProps = {
  searchParams: {
    id: string;
  };
};

const RequestPage = async ({ searchParams }: RequestPageProps) => {

  const { id } = searchParams
  const request = await inventoryActions.auditReqests.getOne(id);
  const itemLots = await inventoryActions.getItemLots(request.item.id);
  const noteTypes = await inventoryActions.auditReqests.noteTypes.getAll();
  await createOpenedNote(request.id);


  return (
    <div className='flex flex-col gap-y-6'>
      <div className='flex justify-between items-center'>
        <PageTitle>Audit Request for {request.item.name}</PageTitle>

        <CompleteButton requestId={request.id} itemId={request.item.id} />

      </div>

      <div className='flex flex-col gap-2'>
        <SectionTitle>Notes</SectionTitle>

        <Card.Root>
          <Notes notes={request.notes} noteTypes={noteTypes} requestId={request.id} />
        </Card.Root>

      </div>

      <div className='flex flex-col gap-2'>
        <SectionTitle>Inventory</SectionTitle>

        <Card.Root>

          <AuditPanel allLots={itemLots as any} />
        </Card.Root>

      </div>

    </div>
  )
}

export default RequestPage
