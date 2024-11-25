"use client"

import React, { useEffect, useState } from 'react'
import { Wizard, useWizard } from 'react-use-wizard'
import BprSelectionStep from './BprSelectionStep'
import { IBprForSSF } from '../_functions/getBprs'
import SampleDesignation from './SampleDesignation'

const MicroWizard = ({ bprs }: { bprs: IBprForSSF[] }) => {

    const [ selectedBpr, setSelectedBpr ] = useState<IBprForSSF | null>(null);

    return (
        <Wizard>
            <BprSelectionStep bprs={bprs} onSelection={(bpr: IBprForSSF) => setSelectedBpr(bpr)} />
            <SampleDesignation selectedBpr={selectedBpr}/>
        </Wizard>
    )
}

export default MicroWizard
