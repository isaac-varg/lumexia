'use client'
import { useMbprWizardActions } from '@/store/mbprWizardSlice'
import React, { useEffect } from 'react'

const InitialStateSetter = ({ providedItemId }: { providedItemId?: string }) => {

    const { setProducesItem } = useMbprWizardActions()
    useEffect(() => {
        setProducesItem(providedItemId || '')
    }, [])

    return false

}

export default InitialStateSetter
