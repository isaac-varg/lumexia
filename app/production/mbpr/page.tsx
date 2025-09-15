import PageTitle from '@/components/Text/PageTitle'
import React from 'react'
import CreateEditMBPR from './_components/CreateEditMBPR'
import { productionActions } from '@/actions/production'
import MbprTable from './_components/MbprTable'
import EditConfigurations from './_components/EditConfigurations'

const MbprMainPage = async () => {

  const mbprs = await productionActions.mbprs.getAll()

  return (
    <div className='flex flex-col gap-6'>
      <PageTitle>Master Batch Production Records</PageTitle>

      <div className='flex justify-between'>
        <CreateEditMBPR />
        <EditConfigurations />
      </div>

      <MbprTable mbprs={mbprs} />



    </div>
  )
}

export default MbprMainPage
