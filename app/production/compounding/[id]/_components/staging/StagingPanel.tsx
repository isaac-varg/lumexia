"use client"

import { ExBprBom } from '@/types/bprBom'
import React from 'react'
import NotStartedPanel from './NotStartedPanel'
import StagedPanel from './StagedPanel'

const StagingPanel = ({ bom }: { bom: ExBprBom[] }) => {


    const sortedBom = bom.sort((a, b) => {
        return parseInt(a.bom.identifier, 10) - parseInt(b.bom.identifier, 10);
    });

    return (
        <div className='flex flex-col gap-y-4' >
            <NotStartedPanel bom={sortedBom} />
            <StagedPanel bom={sortedBom} />
        </div>
    )
}

export default StagingPanel
