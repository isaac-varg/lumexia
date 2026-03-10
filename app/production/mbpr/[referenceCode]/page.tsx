import { productionActions } from '@/actions/production';
import PageBreadcrumbs from '@/components/App/PageBreadcrumbs';
import PageTitle from '@/components/Text/PageTitle';
import React from 'react'
import BasicsPanel from './_components/BasicsPanel';
import { appActions } from '@/actions/app';
import BOMPanel from './_components/BOMPanel';
import BatchSizesPanel from './_components/BatchSizesPanel';
import WorkInstructionsPanel from './_components/WorkInstructionsPanel';
import Link from 'next/link';

type MbprDetailsProps = {
  searchParams: {
    id: string;
  };
};


const MbprDetailsPage = async ({ searchParams }: MbprDetailsProps) => {

  const mbpr = await productionActions.mbprs.getOne(searchParams.id)
  const recordStatuses = await appActions.recordStatuses.getAll()

  return (
    <div>
      <div className='flex justify-between items-center mb-8'>
        <PageTitle>{mbpr.producesItem.name} MBPR</PageTitle>
        <Link href={`/production/mbpr/wizard?itemId=${mbpr.producesItemId}`} className='btn btn-accent'>
          Edit MBPR
        </Link>
      </div>

      <div className='grid grid-cols-2 gap-6'>

        <BasicsPanel mbpr={mbpr} statuses={recordStatuses} />
        <BatchSizesPanel sizes={mbpr.BatchSize} />

        <BOMPanel bom={mbpr.bom} />
        <WorkInstructionsPanel steps={mbpr.BatchStep} />

      </div>


    </div>
  )
}

export default MbprDetailsPage
