import { accountingActions } from '@/actions/accounting'
import PageBreadcrumbs from '@/components/App/PageBreadcrumbs'
import PageTitle from '@/components/Text/PageTitle'
import React from 'react'
import BasicsPanel from './_components/BasicsPanel'
import ActionsPanel from './_components/ActionsPanel'
import ApprovalStatus from './_components/ApprovalStatus'
import FinishedProductsPanel from './_components/FinishedProductsPanel'
import NotesPanel from './_components/NotesPanel'

interface PricingDetailsProps {
    searchParams: {
        id: string
    }
}

const PricingDetailsPage = async ({ searchParams }: PricingDetailsProps) => {

    const examId = searchParams.id
    const examination = await accountingActions.examinations.getOne(examId);
    const noteTypes = await accountingActions.examinations.notes.getAllNoteTypes();


    return (
        <div className="flex flex-col gap-y-4">

            <PageTitle>{`Pricing Examination ${examination.examinedItem.name}`}</PageTitle>
            <PageBreadcrumbs />


            <div className='grid grid-cols-2 gap-6'>
                <BasicsPanel exam={examination} />
                {(!examination.approved && !examination.rejected) && <ActionsPanel examId={examId} />}
                {(examination.approved || (!examination.approved && examination.rejected)) && <ApprovalStatus exam={examination} />}


                <FinishedProductsPanel finishedProducts={examination.FinishedProductArchive} />
                <NotesPanel pricingExaminationId={examId} notes={examination.PricingExaminationNote} noteTypes={noteTypes} />

            </div>





        </div>


    )
}

export default PricingDetailsPage 
