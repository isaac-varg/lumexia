import { productionActions } from '@/actions/production'
import PageBreadcrumbs from '@/components/App/PageBreadcrumbs'
import PageTitle from '@/components/Text/PageTitle'
import { Item } from '@/types/item'
import React from 'react'
import BasicsPanel from './_components/BasicsPanel'
import ActionsPanel from './_components/ActionsPanel'
import ProductionInfo from './_components/ProductionInfo'
import BOM from './_components/BOM'
import { PricingExaminationNoteType } from '@/actions/accounting/examinations/notes/getAllNoteTypes'
import NotesPanel from '../shared/NotesPanel'
import { v4 as uuidv4 } from 'uuid';
import StateSetter from './_components/StateSetter'
import PricingErrorAlert from './_components/PricingErrorAlert'
import FinishedProducts from './_components/FinishedProducts'

const ProducedMain = async ({ item, noteTypes }: { item: Item, noteTypes: PricingExaminationNoteType[] }) => {


    const examinationId = uuidv4();
    const activeMbpr = await productionActions.mbprs.getActive(item.id);
    const batchSizes = await productionActions.mbprs.batchSizes.getAllByMbpr(activeMbpr.id)


    return (
        <div className='flex flex-col gap-y-4'>
            <PricingErrorAlert />
            <StateSetter activeMbpr={activeMbpr} batchSizes={batchSizes} />
            <PageTitle>Pricing Determination - {item.name}</PageTitle>
            <PageBreadcrumbs />

            <div className='grid grid-cols-5 gap-4'>

                <BasicsPanel />
                <ProductionInfo />
                <ActionsPanel examinatedItemId={item.id} examinationId={examinationId} />
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <FinishedProducts  />

                {/*<BOM /> */} 


                <NotesPanel noteTypes={noteTypes} examinationId={examinationId} itemId={item.id} />

            </div>

        </div>
    )
}

export default ProducedMain
