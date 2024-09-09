import React from 'react'
import { getBprs } from './_functions/getBprs'
import { getAllCompoundables } from './_functions/getAllCompoundables';
import CompoundablesPanel from './_components/compoundables/CompoundablesPanel';

const CompoundingPage = async () => {
  const thisWeeksMbprs = await getBprs();
  const compoundableaBprs = await getAllCompoundables()

  return (
    <div>
      <CompoundablesPanel compoundables={compoundableaBprs as any} />
    </div>
  )
}

export default CompoundingPage
