import { productionActions } from '@/actions/production'
import PageBreadcrumbs from '@/components/App/PageBreadcrumbs'
import PageTitle from '@/components/Text/PageTitle'
import { Item } from '@/types/item'
import React from 'react'
import BasicsPanel from './_components/BasicsPanel'
import ActionsPanel from './_components/ActionsPanel'
import ConsumerContainers from './_components/ConsumerContainers'
import InitialStateSetter from './_components/InitialStateSetter'
import { accountingActions } from '@/actions/accounting'
import ProductionInfo from './_components/ProductionInfo'
import { getBomWithPricing } from './_functions/getBomWithPricing'

const ProducedMain = async ({ item }: { item: Item }) => {

    const activeMbpr = await productionActions.mbprs.getActive(item.id);
    const batchSizes = await productionActions.mbprs.batchSizes.getAllByMbpr(activeMbpr.id)
    const filledConsumerContainers = await accountingActions.filledConsumerContainers.getAllByFillItem(item.id);
    const bom = await getBomWithPricing(activeMbpr.id)



    return (
        <div className='flex flex-col gap-y-4'>
            <InitialStateSetter activeMbpr={activeMbpr} bom={bom} filledConsumerContainers={filledConsumerContainers} batchSizes={batchSizes} />
            <PageTitle>Pricing Determination - {item.name}</PageTitle>
            <PageBreadcrumbs />

            <div className='grid grid-cols-3 gap-4'>

                <BasicsPanel />
                <ProductionInfo />
                <ActionsPanel />
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <ConsumerContainers fillItemId={activeMbpr.producesItemId} />



            </div>


        </div>
    )
}

export default ProducedMain
