"use client"

import { ExBprBom } from '@/types/bprBom'
import { groupByProperty } from '@/utils/data/groupByProperty'
import React from 'react'
import Card from '@/components/Card'
import NotStartedPanel from './NotStartedPanel'
import StagedPanel from './StagedPanel'

const StagingPanel = ({ bom }: { bom: ExBprBom[] }) => {

  const bomGrouped = groupByProperty(bom, "status.name")


  return (
    <div className='flex flex-col gap-y-4' >
      <NotStartedPanel bom={bom} />
      <StagedPanel bom={bom} />
    </div>
  )
}

export default StagingPanel
