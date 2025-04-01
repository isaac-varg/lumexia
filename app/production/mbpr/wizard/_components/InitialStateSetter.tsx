'use client'
import { useMbprWizardActions } from '@/store/mbprWizardSlice'
import { StepAddendumType } from '@prisma/client'
import React, { useEffect } from 'react'

const InitialStateSetter = ({ providedItemId, addendumTypes }: { providedItemId?: string, addendumTypes: StepAddendumType[] }) => {

    const { setProducesItem, setAddendumTypes } = useMbprWizardActions()
    useEffect(() => {
        setProducesItem(providedItemId || '')
        setAddendumTypes(addendumTypes);

    }, [])

    return false

}

export default InitialStateSetter
