'use client'
import { useMbprWizardActions } from '@/store/mbprWizardSlice'
import { StepActionableType, StepAddendumType } from '@prisma/client'
import React, { useEffect } from 'react'

const InitialStateSetter = ({ providedItemId, addendumTypes, actionableTypes }: { providedItemId?: string, addendumTypes: StepAddendumType[], actionableTypes: StepActionableType[] }) => {

    const { setActionableTypes, setProducesItem, setAddendumTypes } = useMbprWizardActions()
    useEffect(() => {
        setProducesItem(providedItemId || '')
        setAddendumTypes(addendumTypes);
        setActionableTypes(actionableTypes);

    }, [])

    return false

}

export default InitialStateSetter
