"use client"

import { ExBprBom } from '@/types/bprBom'
import React from 'react'
import NotStartedPanel from './NotStartedPanel'
import StagedPanel from './StagedPanel'

const StagingPanel = ({ bom }: { bom: ExBprBom[] }) => {



  return (
    <div className='flex flex-col gap-y-4' >
      <NotStartedPanel bom={bom} />
      <StagedPanel bom={bom} />
    </div>
  )
}

export default StagingPanel
