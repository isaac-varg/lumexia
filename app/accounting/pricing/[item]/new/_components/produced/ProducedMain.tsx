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
import BOM from './_components/BOM'
import { PricingExaminationNoteType } from '@/actions/accounting/examinations/notes/getAllNoteTypes'
import NotesPanel from '../shared/NotesPanel'
import { v4 as uuidv4 } from 'uuid';
import { getTankLaborCost } from './_functions/getTankLaborCost'

const ProducedMain = async ({ item, noteTypes }: { item: Item, noteTypes: PricingExaminationNoteType[] }) => {


    const examinationId = uuidv4();
    const activeMbpr = await productionActions.mbprs.getActive(item.id);
    const batchSizes = await productionActions.mbprs.batchSizes.getAllByMbpr(activeMbpr.id)
    const filledConsumerContainers = await accountingActions.filledConsumerContainers.getAllByFillItem(item.id);
    const bom = await getBomWithPricing(activeMbpr.id)





    return (
        <div className='flex flex-col gap-y-4'>
            <InitialStateSetter activeMbpr={activeMbpr} bom={bom} filledConsumerContainers={filledConsumerContainers} batchSizes={batchSizes} tankLaborCost={parseFloat(tankLaborCost?.value || '0')} />
            <PageTitle>Pricing Determination - {item.name}</PageTitle>
            <PageBreadcrumbs />

            <div className='grid grid-cols-5 gap-4'>

                <BasicsPanel />
                <ProductionInfo />
                <ActionsPanel examinatedItemId={item.id} examinationId={examinationId} />
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <ConsumerContainers fillItemId={activeMbpr.producesItemId} />

                <BOM />


                <NotesPanel noteTypes={noteTypes} examinationId={examinationId} itemId={item.id} />

            </div>


        </div>
    )
}

export default ProducedMain
