import React from 'react'
import { getBprs } from './_functions/getBprs'
import { getAllCompoundables } from './_functions/getAllCompoundables';
import CompoundablesPanel from './_components/compoundables/CompoundablesPanel';
import WeeklyPanel from './_components/compoundables/WeeklyPanel';

const CompoundingPage = async () => {
  const thisWeeksMbprs = await getBprs();
  const compoundableaBprs = await getAllCompoundables()


  return (
    <div className='flex flex-col gap-y-4'>
    <WeeklyPanel  bprs={thisWeeksMbprs as any}/>
      <CompoundablesPanel compoundables={compoundableaBprs as any} />
    </div>
  )
}

export default CompoundingPage
