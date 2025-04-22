"use client"

import React, { useEffect, useState } from 'react'
import { Wizard, useWizard } from 'react-use-wizard'
import BprSelectionStep from './BprSelectionStep'
import { IBprForSSF } from '../_functions/getBprs'
import SampleDesignation from './SampleDesignation'
import { Config } from '@prisma/client'

const MicroWizard = ({ bprs, microFormData }: { bprs: IBprForSSF[], microFormData: Config[] }) => {

    const [ selectedBpr, setSelectedBpr ] = useState<IBprForSSF | null>(null);

    return (
        <Wizard>
            <BprSelectionStep bprs={bprs} onSelection={(bpr: IBprForSSF) => setSelectedBpr(bpr)} />
            <SampleDesignation selectedBpr={selectedBpr} microFormData={microFormData}/>
        </Wizard>
    )
}

export default MicroWizard
