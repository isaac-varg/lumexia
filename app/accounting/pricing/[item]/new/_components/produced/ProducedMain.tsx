import { productionActions } from '@/actions/production'
import PageBreadcrumbs from '@/components/App/PageBreadcrumbs'
import PageTitle from '@/components/Text/PageTitle'
import { Item } from '@/types/item'
import React from 'react'
import BasicsPanel from './_components/BasicsPanel'
import ActionsPanel from './_components/ActionsPanel'
import ConsumerContainers from './_components/ConsumerContainers'
import { staticRecords } from '@/configs/staticRecords'
import InitialStateSetter from './_components/InitialStateSetter'
import { accountingActions } from '@/actions/accounting'

const ProducedMain = async ({ item }: { item: Item }) => {

    const activeMbpr = await productionActions.mbprs.getActive(item.id);
    const filledConsumerContainers = await accountingActions.filledConsumerContainers.getAllByFillItem(item.id);



    return (
        <div className='flex flex-col gap-y-4'>
            <InitialStateSetter activeMbpr={activeMbpr} filledConsumerContainers={filledConsumerContainers} />
            <PageTitle>Pricing Determination - {item.name}</PageTitle>
            <PageBreadcrumbs />

            <div className='grid grid-cols-2 gap-y-4'>

                <BasicsPanel />
                <ActionsPanel />

                <ConsumerContainers fillItemId={activeMbpr.producesItemId} />



            </div>


        </div>
    )
}

export default ProducedMain
