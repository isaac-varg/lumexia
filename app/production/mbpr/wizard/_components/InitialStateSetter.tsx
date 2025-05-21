'use client'
import { CompoundingVessel } from '@/actions/production/compoundingVessels/getAllCompoundinVessels'
import { useMbprWizardActions } from '@/store/mbprWizardSlice'
import { StepActionableType, StepAddendumType } from '@prisma/client'
import React, { useEffect } from 'react'

const InitialStateSetter = ({ compoundingVessels, providedItemId, addendumTypes, actionableTypes }: { providedItemId?: string, addendumTypes: StepAddendumType[], actionableTypes: StepActionableType[], compoundingVessels: CompoundingVessel[]}) => {

    const { setCompoundingVessels, setActionableTypes, setProducesItem, setAddendumTypes } = useMbprWizardActions()
    useEffect(() => {
        setProducesItem(providedItemId || '')
        setAddendumTypes(addendumTypes);
        setActionableTypes(actionableTypes);
        setCompoundingVessels(compoundingVessels)

    }, [])

    return false

}

export default InitialStateSetter
