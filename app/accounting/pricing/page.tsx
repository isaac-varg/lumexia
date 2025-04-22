import PageBreadcrumbs from '@/components/App/PageBreadcrumbs'
import React from 'react'
import Card from '@/components/Card'
import { getItems } from './_functions/getItems'
import BeginPricingExamDialog from './_components/BeginPricingExamDialog'
import BeginPricingExaminationButton from './_components/BeginPricingExaminationButton'
import { accountingActions } from '@/actions/accounting'
import LatestExaminationsTable from './_components/LatestExaminationsTable'
import QueueList from './_components/QueueList'

const PricingPage = async () => {

    const items = await getItems();
    const examinations = await accountingActions.examinations.getAll(15)

    return (
        <div className='flex flex-col gap-y-6'>

            <BeginPricingExamDialog items={items} />

            <PageBreadcrumbs />

            <div className='flex gap-x-4'>
                <BeginPricingExaminationButton />
            </div>

            <div className='grid grid-cols-2 gap-6'>

                <Card.Root>
                    <Card.Title>Queue</Card.Title>
                    <QueueList />


                </Card.Root>

                <Card.Root>
                    <Card.Title>Latest</Card.Title>

                    <LatestExaminationsTable examinations={examinations} />
                </Card.Root>

            </div>


        </div >
    )
}

export default PricingPage
