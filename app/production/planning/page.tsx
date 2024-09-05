import React from 'react'
import StatusBoard from './_components/statusBoard/StatusBoard'
import bprActions from '@/actions/production/bprActions';
import bprStatusActions from '@/actions/production/bprStatuses';
import PageTitle from '@/components/Text/PageTitle';
import AddBprButton from './_components/createNewBpr/AddBprButton';
import prisma from '@/lib/prisma';

const PlanningPage = async () => {
  const bprs = await prisma.batchProductionRecord.findMany({
    include: {
      status: true,
      mbpr: {
        include: {
          producesItem: true
        }
      }
    }
  })
  const statuses = await bprStatusActions.getAll()

  return (
    <div className='flex flex-col gap-y-4 w-full h-full max-w-screen overflow-x-hidden'>
      <div className='flex justify-between items-center '>
        <PageTitle>Planning</PageTitle>
        <AddBprButton />
      </div>

        <StatusBoard bprs={bprs} statuses={statuses} />
        <div />


    </div>
  )
}

export default PlanningPage
