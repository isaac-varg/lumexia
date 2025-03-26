'use client'
import PageTitle from '@/components/Text/PageTitle'
import { useMbprWizardSelection } from '@/store/mbprWizardSlice'
import React from 'react'

const Title = () => {
    
    const { producesItem } = useMbprWizardSelection()

    if (!producesItem) {
        return (
            <PageTitle>MBPR Wizard</PageTitle>
        )
    }


    return (
        <PageTitle>{producesItem.name} MBPR Wizard</PageTitle>
    )
}

export default Title 
