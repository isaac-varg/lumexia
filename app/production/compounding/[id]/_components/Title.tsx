import PageTitle from '@/components/Text/PageTitle'
import { BatchProductionRecord } from '@/types/batchProductionRecord'
import React from 'react'
import { TbSlash } from 'react-icons/tb'

const Title = ({ bpr }: { bpr: BatchProductionRecord }) => {
  return (
    <div className='flex justify-between p-y-2'>

      <PageTitle>      {bpr.mbpr.producesItem.name}</PageTitle>

      <PageTitle>
        <div className='flex gap-2'>

          <span>BPR #{bpr.referenceCode}</span>
          <TbSlash />
          <span>{bpr.lotOrigin ? `${bpr.lotOrigin.lot?.lotNumber}` : ''}</span>
        </div>
      </PageTitle>

    </div>


  )
}

export default Title
