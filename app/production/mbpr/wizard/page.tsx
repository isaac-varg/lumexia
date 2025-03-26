import PageBreadcrumbs from '@/components/App/PageBreadcrumbs'
import React from 'react'
import StepTrack from './_components/StepTrack'
import Card from '@/components/Card'
import ItemStep from './_components/step1/ItemStep'
import { getProducibles } from './_functions/getProducibles'
import InitialStateSetter from './_components/InitialStateSetter'
import VersionStep from './_components/step2/VersionStep'
import Title from './_components/Title'
import StepNavigator from './_components/step3/ProductionStep'

type MbprWizardProps = {
    searchParams: {
        itemId?: string
    }
}

const MbprWizard = async ({ searchParams }: MbprWizardProps) => {

    const producibles = await getProducibles();
    const providedItemId = searchParams.itemId;

    

    return (
        <div className='flex flex-col gap-y-6'>
            <InitialStateSetter providedItemId={providedItemId} />
            <Title />
            <PageBreadcrumbs />

            <Card.Root >
                <div className='min-h-[800px] flex flex-col gap-y-8'>
                    <StepTrack />

                    <ItemStep producibles={producibles} />
                    <VersionStep />
                    <StepNavigator />

                </div>
            </Card.Root>



        </div>
    )
}

export default MbprWizard
