import { productionActions } from '@/actions/production';
import PageBreadcrumbs from '@/components/App/PageBreadcrumbs';
import PageTitle from '@/components/Text/PageTitle';
import React from 'react'
import BasicsPanel from './_components/BasicsPanel';
import { appActions } from '@/actions/app';
import BOMPanel from './_components/BOMPanel';
import BatchSizesPanel from './_components/BatchSizesPanel';

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
      <PageTitle>{mbpr.producesItem.name} MBPR</PageTitle>


      <div className='grid grid-cols-2 gap-6'>

        <BasicsPanel mbpr={mbpr} statuses={recordStatuses} />
        <BatchSizesPanel sizes={mbpr.BatchSize} />

        <BOMPanel bom={mbpr.bom} />

      </div>


    </div>
  )
}

export default MbprDetailsPage
